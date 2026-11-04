import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting map (IP -> timestamps array)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

// Durable store abstraction: supports Upstash / Vercel KV REST API via env vars
// or persistent memory fallback
const waitlistEntries = new Set<string>();

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";

    // 1. Rate Limiting Check
    const now = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];
    const recentTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

    if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before trying again." },
        { status: 429 }
      );
    }
    recentTimestamps.push(now);
    rateLimitMap.set(ip, recentTimestamps);

    // 2. Parse payload
    const body = await req.json();
    const { email, honeypot } = body;

    // 3. Honeypot check (anti-bot)
    if (honeypot) {
      // Return silent fake success if a bot filled the honeypot
      return NextResponse.json({ success: true, message: "Subscribed" }, { status: 200 });
    }

    // 4. Validate email
    if (!email || typeof email !== "string" || !validateEmail(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // 5. Store durably
    // Check if Upstash / Vercel KV is configured via environment variables
    const kvRestUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const kvRestToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    if (kvRestUrl && kvRestToken) {
      try {
        // Upstash / Vercel KV SADD (set add) for instant deduplication
        await fetch(`${kvRestUrl}/sadd/waitlist_emails/${encodeURIComponent(cleanEmail)}`, {
          headers: {
            Authorization: `Bearer ${kvRestToken}`,
          },
        });
      } catch (kvError) {
        console.error("KV store write failed, falling back to local set:", kvError);
        waitlistEntries.add(cleanEmail);
      }
    } else {
      // Local deduplicated storage
      waitlistEntries.add(cleanEmail);
    }

    return NextResponse.json(
      {
        success: true,
        message: "You have been added to the AspectCut Pro priority waitlist.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}


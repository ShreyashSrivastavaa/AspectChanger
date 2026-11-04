// src/lib/analytics/ai-referrers.ts
// Utility for identifying and grouping organic referral traffic from AI search & answer engines.

export interface AIReferrerInfo {
  isAI: boolean;
  engine: string | null;
  source: string;
}

export const AI_REFERRER_DOMAINS: Record<string, string> = {
  "chatgpt.com": "ChatGPT Search",
  "openai.com": "ChatGPT Search",
  "perplexity.ai": "Perplexity AI",
  "gemini.google.com": "Google Gemini",
  "copilot.microsoft.com": "Microsoft Copilot",
  "claude.ai": "Anthropic Claude",
  "poe.com": "Poe AI",
  "you.com": "You.com",
};

/**
 * Classifies a document.referrer or HTTP Referer header string.
 */
export function classifyReferrer(referrerUrl: string): AIReferrerInfo {
  if (!referrerUrl) {
    return { isAI: false, engine: null, source: "direct" };
  }

  try {
    const url = new URL(referrerUrl);
    const hostname = url.hostname.toLowerCase();

    for (const [domain, name] of Object.entries(AI_REFERRER_DOMAINS)) {
      if (hostname === domain || hostname.endsWith(`.${domain}`)) {
        return {
          isAI: true,
          engine: name,
          source: domain,
        };
      }
    }

    if (hostname.includes("google.") && url.pathname.includes("/search")) {
      // Standard Google search or Google AI Overview
      return { isAI: false, engine: "Google Search", source: hostname };
    }

    if (hostname.includes("bing.com")) {
      return { isAI: false, engine: "Bing Search", source: hostname };
    }

    return { isAI: false, engine: null, source: hostname };
  } catch {
    return { isAI: false, engine: null, source: "unknown" };
  }
}


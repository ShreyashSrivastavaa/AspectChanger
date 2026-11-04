"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/config";
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Check, 
  ArrowUpRight,
  Shield,
  Cpu
} from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LocaleSuggestionToast from "@/components/LocaleSuggestionToast";

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("aspectcut-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("aspectcut-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("aspectcut-theme", "light");
    }
  };

  // Keyboard accessibility: ESC closes menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (menuOpen) {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }
        if (showWaitlist) {
          setShowWaitlist(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, showWaitlist]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      drawerRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSubmitted(true);
      setEmail("");
    } catch (err: any) {
      setError(err?.message || "Could not join waitlist.");
    } finally {
      setSubmitting(false);
    }
  };

  const toolsList = [
    { href: "/tools/16-9-to-9-16", label: "16:9 to 9:16 (Landscape to Vertical)" },
    { href: "/tools/9-16-to-16-9", label: "9:16 to 16:9 (Vertical to Landscape)" },
    { href: "/tools/16-9-to-1-1", label: "16:9 to 1:1 (Landscape to Square)" },
    { href: "/tools/16-9-to-4-5", label: "16:9 to 4:5 (Landscape to Portrait)" },
    { href: "/tools/1-1-to-9-16", label: "1:1 to 9:16 (Square to Vertical)" },
    { href: "/tools/4-3-to-16-9", label: "4:3 to 16:9 (Classic to Widescreen)" },
    { href: "/tools/21-9-to-16-9", label: "21:9 to 16:9 (Ultrawide to 16:9)" },
  ];

  const platformsList = [
    { href: "/for/youtube-shorts", label: "YouTube Shorts (9:16)" },
    { href: "/for/tiktok", label: "TikTok Video (9:16)" },
    { href: "/for/instagram-reels", label: "Instagram Reels (9:16)" },
    { href: "/for/instagram-story", label: "Instagram Story (9:16)" },
    { href: "/for/instagram-feed", label: "Instagram Post (1:1 / 4:5)" },
    { href: "/for/linkedin-video", label: "LinkedIn Video (1:1 / 16:9)" },
    { href: "/for/facebook-video", label: "Facebook Video (4:5 / 1:1)" },
    { href: "/for/x-twitter-video", label: "X / Twitter Video (16:9 / 1:1)" },
    { href: "/for/whatsapp-status", label: "WhatsApp Status (9:16)" },
  ];

  const guidesList = [
    { href: "/guides/what-is-aspect-ratio", label: "What is Aspect Ratio?" },
    { href: "/guides/crop-vs-letterbox-vs-blur-background", label: "Crop vs Blur vs Bars" },
    { href: "/guides/how-to-change-video-aspect-ratio-without-losing-quality", label: "Keep Quality Lossless" },
    { href: "/guides/aspect-ratio-cheat-sheet", label: "2026 Aspect Ratio Cheat Sheet" },
    { href: "/guides/best-video-aspect-ratio-for-tiktok", label: "Best Ratio for TikTok" },
    { href: "/guides/best-video-aspect-ratio-for-instagram-reels", label: "Best Ratio for Reels" },
  ];

  return (
    <div className="min-h-screen flex flex-col studio-background transition-colors duration-300 relative" suppressHydrationWarning>
      
      {/* Floating Frosted Glass Header (Stays at the top of the page, does not follow scroll) */}
      <div className="w-full px-4 sm:px-6 absolute top-3 left-0 right-0 z-30 pointer-events-none" suppressHydrationWarning>
        <header className="max-w-4xl mx-auto px-5 py-2.5 rounded-full glass-header flex items-center justify-between pointer-events-auto">
          
          {/* Brand Mark (with mineral tag) */}
          <Link href="/" className="flex items-center gap-2 select-none group">
            <span className="font-semibold text-sm sm:text-base tracking-tight text-[var(--text-main)]">
              AspectCut
            </span>
            <span className="text-[11px] font-mono text-[var(--text-muted)] tracking-wider">
              / Wasm
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] group-hover:scale-125 transition-transform shadow-[0_0_8px_#c89c6e]" />
            <span className="hidden xl:inline-flex text-[10px] font-mono text-[#c89c6e] border border-[rgba(200,156,110,0.3)] bg-[rgba(200,156,110,0.08)] px-2 py-0.5 rounded-full">
              by ZenithDistrict
            </span>
          </Link>

          {/* Center Indicators */}
          <div className="hidden md:flex items-center gap-6 text-xs text-[var(--text-muted)] font-medium">
            <span className="hover:text-[var(--text-main)] transition-colors cursor-default">
              Client Engine
            </span>
            <span className="hover:text-[var(--text-main)] transition-colors cursor-default">
              Zero Upload
            </span>
            <span className="hover:text-[var(--text-main)] transition-colors cursor-default">
              Lossless Reframe
            </span>
          </div>

          {/* Right Controls (matching top header layout of reference) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Multilingual Selector */}
            <LanguageSwitcher variant="pill" />

            {/* Quick Dark Mode Switcher */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full glass-pill text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-[#e8c7a2]" /> : <Moon className="w-3.5 h-3.5 text-[#74675b]" />}
            </button>

            {/* Hamburger Trigger Button */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="navigation-drawer"
              className="p-2 rounded-full glass-pill text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            {/* Prominent White Glass Pill Button on the far right (like "max 5 ins" in reference) */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-pill font-mono text-[11px] text-[var(--text-main)] font-semibold select-none shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Max 500 MB</span>
            </div>
          </div>
        </header>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20 sm:pt-24" suppressHydrationWarning>
        {children}
      </main>

      {/* Slide-In Navigation Drawer */}
      {menuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-250"
          aria-hidden="true"
        />
      )}

      <div
        id="navigation-drawer"
        ref={drawerRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm sm:max-w-md bg-[var(--bg-page)]/85 backdrop-blur-2xl border-l border-[var(--color-glass-border)] shadow-2xl flex flex-col justify-between overflow-y-auto transition-transform duration-250 ease-out outline-none ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[var(--color-hairline)] flex items-center justify-between sticky top-0 bg-[var(--bg-page)]/90 backdrop-blur z-10">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base text-[var(--text-main)]">
              AspectCut Index
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e]" />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="px-3 py-1 glass-pill rounded-full text-xs text-[var(--text-main)] flex items-center gap-1.5"
              aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-[#e8c7a2]" /> : <Moon className="w-3.5 h-3.5 text-[#74675b]" />}
              <span className="font-mono text-[11px] uppercase tracking-wider">{darkMode ? "Light" : "Dark"}</span>
            </button>

            <button
              type="button"
              onClick={closeMenu}
              className="p-1.5 text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Navigation Links */}
        <div className="p-6 space-y-7 flex-1">
          {/* Tools Group */}
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-[var(--color-hairline)]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#c89c6e] font-semibold">
                01 / Ratio Converters
              </span>
              <Link
                href="/tools"
                onClick={closeMenu}
                className="font-mono text-[11px] text-[var(--text-muted)] hover:text-[#c89c6e] flex items-center gap-0.5"
              >
                All Tools <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <ul className="space-y-1.5 text-xs">
              {toolsList.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    onClick={closeMenu}
                    className="block py-1 text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
                  >
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platforms Group */}
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-[var(--color-hairline)]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#c89c6e] font-semibold">
                02 / Platform Standards
              </span>
              <Link
                href="/for"
                onClick={closeMenu}
                className="font-mono text-[11px] text-[var(--text-muted)] hover:text-[#c89c6e] flex items-center gap-0.5"
              >
                All Platforms <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <ul className="space-y-1.5 text-xs">
              {platformsList.map((plat) => (
                <li key={plat.href}>
                  <Link
                    href={plat.href}
                    onClick={closeMenu}
                    className="block py-1 text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
                  >
                    {plat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides Group */}
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-[var(--color-hairline)]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#c89c6e] font-semibold">
                03 / Technical Guides
              </span>
              <Link
                href="/guides"
                onClick={closeMenu}
                className="font-mono text-[11px] text-[var(--text-muted)] hover:text-[#c89c6e] flex items-center gap-0.5"
              >
                All Guides <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <ul className="space-y-1.5 text-xs">
              {guidesList.map((guide) => (
                <li key={guide.href}>
                  <Link
                    href={guide.href}
                    onClick={closeMenu}
                    className="block py-1 text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
                  >
                    {guide.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Group */}
          <div className="space-y-2">
            <div className="pb-1 border-b border-[var(--color-hairline)]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#c89c6e] font-semibold">
                04 / Utility & Privacy
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/about"
                onClick={closeMenu}
                className="py-1 text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
              >
                About Wasm
              </Link>
              <Link
                href="/privacy"
                onClick={closeMenu}
                className="py-1 text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
              >
                Privacy Sandbox
              </Link>
              <Link
                href="/faq"
                onClick={closeMenu}
                className="py-1 text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="py-1 text-[var(--text-main)] hover:text-[#c89c6e] transition-colors"
              >
                Support
              </Link>
            </div>
          </div>

          {/* Pro Waitlist */}
          <div className="p-4 rounded-2xl glass-panel space-y-2">
            <div className="font-semibold text-xs text-[var(--text-main)] flex items-center gap-1.5">
              <span>AspectCut Pro Waitlist</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#c89c6e]/20 text-[#c89c6e]">Batch GPU</span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
              Batch processing, 4K rendering, and AI auto-reframing for teams.
            </p>
            {submitted ? (
              <div className="p-2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5" /> You are on the waitlist!
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-3 py-1.5 rounded-full glass-pill text-xs text-[var(--text-main)] outline-none focus:border-[#c89c6e]"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-1.5 rounded-full btn-radiant-glow text-xs font-semibold"
                >
                  {submitting ? "Joining..." : "Request Early Access"}
                </button>
                {error && <p className="text-[10px] text-red-500">{error}</p>}
              </form>
            )}
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-[var(--color-hairline)] text-[11px] font-mono text-[var(--text-muted)] flex items-center justify-between">
          <span>Client-Side Wasm v0.12</span>
          <span>100% Private Sandbox</span>
        </div>
      </div>

      {/* Dismissible International Language Suggestion Banner */}
      <LocaleSuggestionToast />
    </div>
  );
}

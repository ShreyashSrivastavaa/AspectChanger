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
  Crop,
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

  // Section links stay on the current language's home page when already on one.
  const homeBase = /^\/([a-z]{2})?$/.test(pathname) ? "" : "/";
  const sectionLinks = [
    { href: `${homeBase}#tool`, label: "Resize a Video" },
    { href: `${homeBase}#sizes`, label: "All Platforms & Screen Sizes" },
    { href: `${homeBase}#features`, label: "Features" },
    { href: `${homeBase}#calculator`, label: "Aspect Ratio Calculator" },
    { href: `${homeBase}#faq`, label: "FAQ" },
  ];

  const headerLinks = [
    { href: `${homeBase}#tool`, label: "Resize" },
    { href: `${homeBase}#sizes`, label: "Sizes" },
    { href: `${homeBase}#features`, label: "Features" },
    { href: `${homeBase}#calculator`, label: "Calculator" },
    { href: `${homeBase}#faq`, label: "FAQ" },
  ];

  return (
    <div className="min-h-screen flex flex-col studio-background transition-colors duration-300 relative" suppressHydrationWarning>
      
      {/* Floating Frosted Glass Header (Stays at the top of the page, does not follow scroll) */}
      <div className="w-full px-3 sm:px-6 absolute top-3 left-0 right-0 z-30 pointer-events-none" suppressHydrationWarning>
        <header className="max-w-6xl mx-auto ps-3 pe-2 sm:ps-4 py-2 rounded-full glass-header flex items-center justify-between gap-3 pointer-events-auto">

          {/* Brand: mark, name and parent company */}
          <div className="flex items-center gap-2.5 min-w-0">
            <Link href="/" tabIndex={-1} aria-hidden="true" className="w-8 h-8 rounded-full bg-[#c89c6e]/15 border border-[#c89c6e]/30 flex items-center justify-center flex-shrink-0 transition-transform hover:scale-105">
              <Crop className="w-4 h-4 text-[var(--accent-text)]" />
            </Link>
            {/* Stacked on phones, side by side from sm up */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2.5 min-w-0">
              <Link href="/" className="font-semibold text-sm leading-tight sm:text-base tracking-tight text-[var(--text-main)] select-none">
                AspectCut
              </Link>
              <a
                href="https://zenithdistrict.com"
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap text-[9px] sm:text-[10px] leading-tight font-mono text-[var(--accent-text)] sm:border sm:border-[rgba(200,156,110,0.3)] sm:bg-[rgba(200,156,110,0.08)] sm:hover:bg-[rgba(200,156,110,0.16)] transition-colors sm:px-2 sm:py-0.5 rounded-full"
              >
                by ZenithDistrict
              </a>
            </div>
          </div>

          {/* Section Navigation */}
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-0.5 text-xs font-medium text-[var(--text-muted)]">
            {headerLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 rounded-full whitespace-nowrap hover:text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <div
              className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[11px] text-[var(--text-muted)] whitespace-nowrap select-none"
              title="Maximum file size. Videos stay on your device."
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Max 500 MB</span>
            </div>

            <LanguageSwitcher variant="pill" />

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full glass-pill text-[var(--text-main)] hover:text-[var(--accent-text)] transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#e8c7a2]" /> : <Moon className="w-4 h-4 text-[#74675b]" />}
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="navigation-drawer"
              className="p-2 rounded-full glass-pill text-[var(--text-main)] hover:text-[var(--accent-text)] transition-colors"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </header>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-[72px]" suppressHydrationWarning>
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
              className="p-1.5 text-[var(--text-main)] hover:text-[var(--accent-text)] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Navigation Links */}
        <div className="p-6 space-y-7 flex-1">
          {/* Home Sections */}
          <div className="space-y-2">
            <div className="pb-1 border-b border-[var(--color-hairline)]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent-text)] font-semibold">
                01 / On This Site
              </span>
            </div>
            <ul className="space-y-1.5 text-xs">
              {sectionLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="block py-1 text-[var(--text-main)] hover:text-[var(--accent-text)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Group */}
          <div className="space-y-2">
            <div className="pb-1 border-b border-[var(--color-hairline)]">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent-text)] font-semibold">
                02 / Utility & Privacy
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/about"
                onClick={closeMenu}
                className="py-1 text-[var(--text-main)] hover:text-[var(--accent-text)] transition-colors"
              >
                About Engine
              </Link>
              <Link
                href="/privacy"
                onClick={closeMenu}
                className="py-1 text-[var(--text-main)] hover:text-[var(--accent-text)] transition-colors"
              >
                Privacy Sandbox
              </Link>
              <Link
                href="/contact"
                onClick={closeMenu}
                className="py-1 text-[var(--text-main)] hover:text-[var(--accent-text)] transition-colors"
              >
                Support
              </Link>
              <Link
                href="/terms"
                onClick={closeMenu}
                className="py-1 text-[var(--text-main)] hover:text-[var(--accent-text)] transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>

          {/* Pro Waitlist */}
          <div className="p-4 rounded-2xl glass-panel space-y-2">
            <div className="font-semibold text-xs text-[var(--text-main)] flex items-center gap-1.5">
              <span>AspectCut Pro Waitlist</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#c89c6e]/20 text-[var(--accent-text)]">Batch GPU</span>
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
          <span>Client-Side WebCodecs</span>
          <span>100% Private Sandbox</span>
        </div>
      </div>

      {/* Dismissible International Language Suggestion Banner */}
      <LocaleSuggestionToast />
    </div>
  );
}

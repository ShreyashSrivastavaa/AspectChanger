import Link from "next/link";
import { BRAND } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--bg-main)] border-t border-[var(--border-subtle)] pt-12 pb-16 text-xs text-[var(--text-muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[var(--border-subtle)]">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-[var(--text-main)] font-mono uppercase">
              <span className="w-2 h-2 rounded-full bg-[#c89c6e] shadow-[0_0_8px_#c89c6e] inline-block" />
              {BRAND.name}
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              {BRAND.canonicalEntityStatement}
            </p>
            <div className="text-[11px] font-mono text-[var(--text-main)]">
              Support: <a href={`mailto:${BRAND.contactEmail}`} className="underline hover:text-[#c89c6e]">{BRAND.contactEmail}</a>
            </div>
          </div>

          {/* Popular Ratio Converters */}
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-main)] block mb-3">
              Top Converters
            </span>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li>
                <Link href="/tools/16-9-to-9-16" className="hover:text-[#c89c6e] transition-colors">
                  16:9 to 9:16 Vertical
                </Link>
              </li>
              <li>
                <Link href="/tools/9-16-to-16-9" className="hover:text-[#c89c6e] transition-colors">
                  9:16 to 16:9 Widescreen
                </Link>
              </li>
              <li>
                <Link href="/tools/16-9-to-1-1" className="hover:text-[#c89c6e] transition-colors">
                  16:9 to 1:1 Square
                </Link>
              </li>
              <li>
                <Link href="/tools/16-9-to-4-5" className="hover:text-[#c89c6e] transition-colors">
                  16:9 to 4:5 Portrait
                </Link>
              </li>
              <li>
                <Link href="/tools/4-3-to-16-9" className="hover:text-[#c89c6e] transition-colors">
                  4:3 to 16:9 Standard
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-[#c89c6e] hover:underline pt-1 inline-block">
                  View all 15 converters &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Platforms & Tools */}
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-main)] block mb-3">
              Platforms &amp; Tools
            </span>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li>
                <Link href="/for/youtube-shorts" className="hover:text-[#c89c6e] transition-colors">
                  YouTube Shorts Specs
                </Link>
              </li>
              <li>
                <Link href="/for/tiktok" className="hover:text-[#c89c6e] transition-colors">
                  TikTok Video Dimensions
                </Link>
              </li>
              <li>
                <Link href="/for/instagram-reels" className="hover:text-[#c89c6e] transition-colors">
                  Instagram Reels Safe Zones
                </Link>
              </li>
              <li>
                <Link href="/calculator/aspect-ratio" className="hover:text-[#c89c6e] transition-colors">
                  Aspect Ratio Calculator
                </Link>
              </li>
              <li>
                <Link href="/data/platform-specs" className="hover:text-[#c89c6e] transition-colors">
                  Open Specs Dataset (CSV/JSON)
                </Link>
              </li>
              <li>
                <Link href="/for" className="text-[#c89c6e] hover:underline pt-1 inline-block">
                  All 11 platform presets &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Guides & Reference */}
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-main)] block mb-3">
              Guides &amp; Architecture
            </span>
            <ul className="space-y-2.5 font-mono text-[11px]">
              <li>
                <Link href="/guides/what-is-aspect-ratio" className="hover:text-[#c89c6e] transition-colors">
                  What is Aspect Ratio?
                </Link>
              </li>
              <li>
                <Link href="/guides/aspect-ratio-cheat-sheet" className="hover:text-[#c89c6e] transition-colors">
                  2026 Aspect Ratio Cheat Sheet
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-[#c89c6e] transition-colors">
                  Engineering Methodology
                </Link>
              </li>
              <li>
                <Link href="/benchmarks" className="hover:text-[#c89c6e] transition-colors">
                  WASM Speed Benchmarks
                </Link>
              </li>
              <li>
                <Link href="/glossary" className="hover:text-[#c89c6e] transition-colors">
                  Video Engineering Glossary
                </Link>
              </li>
              <li>
                <Link href="/all-pages" className="text-[#c89c6e] hover:underline pt-1 inline-block">
                  Complete HTML Sitemap (112 pages) &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Micro Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[var(--text-muted)] gap-4">
          <div>
            &copy; {new Date().getFullYear()} {BRAND.name}. 100% In-Browser WebAssembly Processing.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/about" className="hover:text-[var(--text-main)] transition-colors">About</Link>
            <Link href="/faq" className="hover:text-[var(--text-main)] transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-[var(--text-main)] transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-[var(--text-main)] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--text-main)] transition-colors">Terms</Link>
            <Link href="/press" className="hover:text-[var(--text-main)] transition-colors">Press Kit</Link>
            <Link href="/changelog" className="hover:text-[var(--text-main)] transition-colors">Changelog</Link>
            <Link href="/llms.txt" className="text-[#c89c6e] hover:underline font-semibold">llms.txt</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

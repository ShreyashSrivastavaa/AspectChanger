import Link from "next/link";
import { BRAND } from "@/lib/config";

export default function Navbar() {
  return (
    <header className="w-full bg-[#000000] border-b border-[#1a1a1a] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Title / Logo */}
        <Link href="/" className="flex items-center gap-3 font-mono text-xs font-semibold tracking-widest text-[#ffffff] uppercase">
          <span className="w-2 h-2 bg-[#ff4400] inline-block" />
          <span>{BRAND.name}</span>
          <span className="text-[10px] text-[#c0bfbe] border border-[#222222] px-1.5 py-0.5 tracking-normal">
            CORE WASM
          </span>
        </Link>

        {/* Minimalist Utility Navigation */}
        <nav className="flex items-center gap-5 text-xs font-mono text-[#c0bfbe]">
          <Link
            href="/tools/16-9-to-9-16"
            className="hover:text-white transition-colors"
          >
            16:9 &rarr; 9:16
          </Link>
          <Link
            href="/for/youtube-shorts"
            className="hidden sm:inline-block hover:text-white transition-colors"
          >
            Shorts & Reels
          </Link>
          <Link
            href="/guides/aspect-ratio-cheat-sheet"
            className="hover:text-white transition-colors"
          >
            Cheat Sheet
          </Link>
          <Link
            href="/about"
            className="hidden md:inline-block hover:text-white transition-colors"
          >
            Architecture
          </Link>
          <span className="h-3 w-px bg-[#222222] hidden sm:inline-block" />
          <span className="text-[11px] text-[#ff4400] border border-[#ff4400]/30 px-2 py-0.5 hidden sm:inline-block">
            No Uploads
          </span>
        </nav>

      </div>
    </header>
  );
}

"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ALL_LOCALES, LOCALES_MAP, getLocaleConfig } from "@/i18n/locales";
import { buildLocalePath, stripLocalePrefix } from "@/lib/i18n/seo-metadata";
import { Globe, Check, ChevronDown } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "pill" | "footer";
}

export default function LanguageSwitcher({
  className = "",
  variant = "pill",
}: LanguageSwitcherProps) {
  const currentLocale = useLocale();
  const currentPage = stripLocalePrefix(usePathname());
  const currentConfig = getLocaleConfig(currentLocale);
  const t = useTranslations("languageSwitcher");

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-start ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${t("selectLanguage")}: ${currentConfig.name}`}
        className={
          variant === "pill"
            ? "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill text-xs font-medium text-[var(--text-main)] hover:text-[var(--accent-text)] transition-colors"
            : "inline-flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--accent-text)] transition-colors"
        }
      >
        <Globe className="w-3.5 h-3.5 text-[var(--accent-text)] flex-shrink-0" />
        <span className={variant === "pill" ? "font-sans hidden sm:inline" : "font-sans"}>{currentConfig.name}</span>
        <ChevronDown
          className={`w-3 h-3 text-[var(--text-muted)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={`absolute z-50 ${
            variant === "pill"
              ? "top-full mt-2 end-0"
              : "bottom-full mb-2 end-0 sm:end-auto sm:start-0 sm:bottom-auto sm:top-full sm:mt-2"
          } w-64 max-h-80 overflow-y-auto rounded-2xl p-1.5 glass-panel shadow-2xl border border-[var(--color-glass-border)] bg-[rgba(255,255,255,0.95)] dark:bg-[rgba(24,21,19,0.96)] backdrop-blur-xl`}
        >
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--color-hairline)] mb-1">
            {t("selectLanguage")}
          </div>

          <div className="space-y-0.5">
            {ALL_LOCALES.map((loc) => {
              const config = LOCALES_MAP[loc];
              const isSelected = loc === currentLocale;
              const targetUrl = buildLocalePath(loc, currentPage);

              return (
                <a
                  key={loc}
                  href={targetUrl}
                  role="menuitem"
                  lang={config.hreflang}
                  dir={config.direction}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                    isSelected
                      ? "bg-[#c89c6e]/15 text-[var(--accent-text)] font-semibold"
                      : "text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{config.name}</span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">
                      {config.englishName} ({config.hreflang})
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-[var(--accent-text)] flex-shrink-0" />}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


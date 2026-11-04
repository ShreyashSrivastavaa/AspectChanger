"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ALL_LOCALES, LOCALES_MAP, DEFAULT_LOCALE } from "@/i18n/locales";
import { buildLocalePath, stripLocalePrefix } from "@/lib/i18n/seo-metadata";
import { Globe, X } from "lucide-react";

export default function LocaleSuggestionToast() {
  const currentLocale = useLocale();
  const currentPage = stripLocalePrefix(usePathname());
  const t = useTranslations("languageSwitcher");
  const tToast = useTranslations("home.toast");
  const [suggestedLocale, setSuggestedLocale] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState<boolean>(true);

  useEffect(() => {
    // Only execute on browser client
    if (typeof window === "undefined" || !navigator?.languages) return;

    // Check if dismissed previously in this session
    const isDismissed = sessionStorage.getItem("aspectcut-locale-toast-dismissed");
    if (isDismissed) return;

    // Detect browser preferred languages
    const browserLangs = navigator.languages.map((l) => l.toLowerCase());

    for (const lang of browserLangs) {
      const primaryTag = lang.split("-")[0];

      // If user's browser language already matches current page, do nothing
      if (primaryTag === currentLocale || lang === currentLocale) {
        return;
      }

      // Check if we support this browser language
      const match = ALL_LOCALES.find((loc) => {
        const config = LOCALES_MAP[loc];
        return (
          loc === primaryTag ||
          config.hreflang.toLowerCase() === lang ||
          config.hreflang.toLowerCase() === primaryTag
        );
      });

      if (match && match !== currentLocale && match !== DEFAULT_LOCALE) {
        setSuggestedLocale(match);
        setDismissed(false);
        break;
      }
    }
  }, [currentLocale]);

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("aspectcut-locale-toast-dismissed", "true");
    }
  };

  if (dismissed || !suggestedLocale) return null;

  const config = LOCALES_MAP[suggestedLocale];
  const targetUrl = buildLocalePath(suggestedLocale, currentPage);

  return (
    <aside
      aria-label={tToast("aria")}
      className="fixed bottom-4 end-4 z-50 max-w-sm p-4 rounded-2xl glass-panel shadow-2xl border border-[var(--color-glass-border)] bg-[rgba(255,255,255,0.95)] dark:bg-[rgba(24,21,19,0.96)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-[#c89c6e]/15 text-[var(--accent-text)] flex-shrink-0 mt-0.5">
          <Globe className="w-4 h-4" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-xs font-semibold text-[var(--text-main)]">
            {t("suggestionText", { name: config.name })}
          </p>
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            {tToast("body", { name: config.name })}
          </p>
          <div className="flex items-center gap-2 pt-1.5">
            <a
              href={targetUrl}
              className="inline-flex items-center justify-center px-3 py-1 rounded-full btn-radiant-glow text-[11px] font-semibold text-[#382c22]"
            >
              {t("switchAction", { name: config.name })}
            </a>
            <button
              type="button"
              onClick={handleDismiss}
              className="px-2.5 py-1 text-[11px] text-[var(--text-muted)] hover:text-[var(--text-main)] font-mono transition-colors"
            >
              {t("dismiss")}
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label={tToast("close")}
          className="text-[var(--text-muted)] hover:text-[var(--text-main)] p-1 rounded-full transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}


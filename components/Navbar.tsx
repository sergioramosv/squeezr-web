"use client";

import { useI18n } from "@/lib/i18n";
import { Logo } from "./Logo";
import { FiGlobe } from "react-icons/fi";
import Link from "next/link";
import { useState } from "react";

function LanguageToggle() {
  const { locale, setLocale } = useI18n();

  return (
    <button
      onClick={() => setLocale(locale === "en" ? "es" : "en")}
      className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.04] transition-colors"
      title={locale === "en" ? "Cambiar a Español" : "Switch to English"}
    >
      <FiGlobe className="w-3.5 h-3.5" />
      <span className="uppercase font-bold">{locale === "en" ? "ES" : "EN"}</span>
    </button>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-base tracking-wide">
          <Logo size={24} className="text-neutral-900 dark:text-white" />
          <span className="text-neutral-900 dark:text-white uppercase tracking-[0.08em]">Squeezr</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link href="/docs" className="px-3 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-green-700 dark:hover:text-green-500 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.04] transition-colors">{t.nav.docs}</Link>
          <a href="https://github.com/sergioramosv/Squeezr" target="_blank" rel="noopener" className="px-3 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-green-700 dark:hover:text-green-500 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.04] transition-colors">{t.nav.github}</a>
          <a href="https://www.npmjs.com/package/squeezr-ai" target="_blank" rel="noopener" className="px-3 py-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-green-700 dark:hover:text-green-500 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.04] transition-colors">{t.nav.npm}</a>
          <div className="ml-2 pl-2 border-l border-neutral-800 flex items-center gap-1">
            <LanguageToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button onClick={() => setOpen(!open)} className="p-2 text-neutral-500 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.04]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-6 py-4 flex flex-col gap-2">
          <Link href="/docs" onClick={() => setOpen(false)} className="py-2 text-sm text-neutral-600 dark:text-neutral-400">{t.nav.docs}</Link>
          <a href="https://github.com/sergioramosv/Squeezr" className="py-2 text-sm text-neutral-600 dark:text-neutral-400">{t.nav.github}</a>
          <a href="https://www.npmjs.com/package/squeezr-ai" className="py-2 text-sm text-neutral-600 dark:text-neutral-400">{t.nav.npm}</a>
        </div>
      )}
    </nav>
  );
}

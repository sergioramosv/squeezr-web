"use client";

import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/60 dark:border-white/[0.06] bg-white/70 dark:bg-surface-900/70 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg">
          <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
              <path d="M6 10h28v4H6zM9 18h22v3H9zM12 25h16v3H12zM16 32h8v2H16z" fill="white" opacity="0.95"/>
            </svg>
          </div>
          <span className="text-slate-900 dark:text-white">Squeezr</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <Link href="/docs" className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors">Docs</Link>
          <a href="https://github.com/sergioramosv/Squeezr" target="_blank" rel="noopener" className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors">GitHub</a>
          <a href="https://www.npmjs.com/package/squeezr-ai" target="_blank" rel="noopener" className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors">npm</a>
          <div className="ml-2 pl-2 border-l border-slate-200 dark:border-white/[0.06]">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="p-2 text-slate-500 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.04]">
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
        <div className="md:hidden border-t border-slate-200/60 dark:border-white/[0.06] bg-white dark:bg-surface-900 px-6 py-4 flex flex-col gap-2">
          <Link href="/docs" onClick={() => setOpen(false)} className="py-2 text-sm text-slate-600 dark:text-slate-400">Docs</Link>
          <a href="https://github.com/sergioramosv/Squeezr" className="py-2 text-sm text-slate-600 dark:text-slate-400">GitHub</a>
          <a href="https://www.npmjs.com/package/squeezr-ai" className="py-2 text-sm text-slate-600 dark:text-slate-400">npm</a>
        </div>
      )}
    </nav>
  );
}

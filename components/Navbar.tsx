"use client";

import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#0d9488"/>
            <path d="M10 12h20v3H10zM12 18h16v2H12zM14 23h12v2H14zM16 28h8v2H16z" fill="white" opacity="0.95"/>
          </svg>
          Squeezr
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/docs" className="text-sm text-gray-600 dark:text-gray-400 hover:text-teal-500 transition-colors">Docs</Link>
          <a href="https://github.com/sergioramosv/Squeezr" target="_blank" rel="noopener" className="text-sm text-gray-600 dark:text-gray-400 hover:text-teal-500 transition-colors">GitHub</a>
          <a href="https://www.npmjs.com/package/squeezr-ai" target="_blank" rel="noopener" className="text-sm text-gray-600 dark:text-gray-400 hover:text-teal-500 transition-colors">npm</a>
          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} className="p-2 text-gray-500">
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
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0a0f] px-6 py-4 flex flex-col gap-3">
          <Link href="/docs" onClick={() => setOpen(false)} className="text-sm text-gray-600 dark:text-gray-400">Docs</Link>
          <a href="https://github.com/sergioramosv/Squeezr" className="text-sm text-gray-600 dark:text-gray-400">GitHub</a>
          <a href="https://www.npmjs.com/package/squeezr-ai" className="text-sm text-gray-600 dark:text-gray-400">npm</a>
        </div>
      )}
    </nav>
  );
}

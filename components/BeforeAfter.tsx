"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { useI18n } from "@/lib/i18n";

const examples = [
  {
    id: "test" as const,
    tag: "vitest · 188 tests",
    beforeChars: 2340,
    afterChars: 198,
    pct: 92,
    before: [
      { text: "✓ config (12) cache (8) expand (15)", color: "text-green-700 dark:text-green-600" },
      { text: "✓ compressor (24) deterministic (89)", color: "text-green-700 dark:text-green-600" },
      { text: "✗ server.test.ts (40 | 2 failed)", color: "text-red-600" },
      { text: "  FAIL streaming — expected 500 to be 200", color: "text-red-500/60" },
      { text: "  FAIL health — Cannot read undefined", color: "text-red-500/60" },
      { text: "1 failed | 5 passed · 2 failed | 186 passed", color: "text-neutral-500 dark:text-neutral-600" },
    ],
    after: [
      { text: "[squeezr:a4c2d1 -92%]", color: "text-green-700 dark:text-green-500" },
      { text: "6 suites, 188 tests (2 FAILED):", color: "text-neutral-700 dark:text-neutral-300" },
      { text: "server.test.ts: streaming(500!=200)", color: "text-neutral-700 dark:text-neutral-300" },
      { text: "health: Cannot read undefined", color: "text-neutral-700 dark:text-neutral-300" },
      { text: "Pass: config cache expand compressor det", color: "text-neutral-500 dark:text-neutral-600" },
    ],
  },
  {
    id: "file" as const,
    tag: "server.ts · 3200 lines",
    beforeChars: 3200,
    afterChars: 84,
    pct: 97,
    before: [
      { text: "   1  import { Hono } from 'hono'", color: "text-neutral-700 dark:text-neutral-300" },
      { text: "   2  import { stream } from 'hono/streaming'", color: "text-neutral-700 dark:text-neutral-300" },
      { text: "   3  import { config } from './config.js'", color: "text-neutral-700 dark:text-neutral-300" },
      { text: "  ...", color: "text-neutral-400 dark:text-neutral-700" },
      { text: "3200  export { app }", color: "text-neutral-700 dark:text-neutral-300" },
    ],
    after: [
      { text: "[squeezr:b7e3f4 -97%]", color: "text-green-700 dark:text-green-500" },
      { text: "server.ts: 3200 lines", color: "text-neutral-700 dark:text-neutral-300" },
      { text: "Exports: app (Hono)", color: "text-neutral-700 dark:text-neutral-300" },
      { text: "Routes: /v1/messages, /v1/chat/completions", color: "text-neutral-700 dark:text-neutral-300" },
    ],
  },
  {
    id: "diff" as const,
    tag: "feature branch · 47 files",
    beforeChars: 1800,
    afterChars: 320,
    pct: 82,
    before: [
      { text: "diff --git a/src/proxy.ts b/src/proxy.ts", color: "text-neutral-500 dark:text-neutral-400" },
      { text: "--- a/src/proxy.ts", color: "text-red-600" },
      { text: "+++ b/src/proxy.ts", color: "text-green-700 dark:text-green-600" },
      { text: "@@ -142,8 +142,12 @@ export function handle()", color: "text-green-700 dark:text-green-500" },
      { text: "-  const res = await fetch(url)", color: "text-red-500/70" },
      { text: "+  const res = await fetch(url, { cache: true })", color: "text-green-600/70" },
    ],
    after: [
      { text: "[squeezr:c9d4e2 -82%]", color: "text-green-700 dark:text-green-500" },
      { text: "47 files, +234 -189 lines", color: "text-neutral-700 dark:text-neutral-300" },
      { text: "proxy.ts: +cache option in fetch()", color: "text-neutral-700 dark:text-neutral-300" },
      { text: "config.ts: new cacheDir setting", color: "text-neutral-700 dark:text-neutral-300" },
    ],
  },
];

export function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [showAfter, setShowAfter] = useState(false);
  const { t } = useI18n();
  const ex = examples[active];

  return (
    <section className="px-6 py-24 md:py-32 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-700 dark:text-green-600 mb-3 block">{t.examples.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">{t.examples.title}</h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">{t.examples.desc}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex justify-center gap-2 mb-8">
            {examples.map((e, i) => (
              <button
                key={e.id}
                onClick={() => { setActive(i); setShowAfter(false); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  active === i
                    ? "bg-green-700/10 text-green-700 dark:text-green-500 border-green-700/30"
                    : "text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 border-transparent"
                }`}
              >
                {t.examples.tabs[e.id]}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
                  showAfter
                    ? "bg-green-600/10 text-green-700 dark:text-green-600 border border-green-600/20"
                    : "bg-red-600/10 text-red-600 border border-red-600/20"
                }`}>
                  {showAfter ? t.examples.after : t.examples.before}
                </span>
                <span className="text-xs text-neutral-400 dark:text-neutral-600">{ex.tag}</span>
              </div>
              <button
                onClick={() => setShowAfter(!showAfter)}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition-all"
              >
                <svg className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                {showAfter ? t.examples.showOriginal : t.examples.compressIt}
              </button>
            </div>

            <div className="terminal">
              <div className="terminal-bar">
                <div className="terminal-dot bg-[#ff5f57]" />
                <div className="terminal-dot bg-[#febc2e]" />
                <div className="terminal-dot bg-[#28c840]" />
                <span className="ml-3 text-[11px] text-neutral-500 font-mono">
                  {showAfter ? "compressed" : ex.tag}
                </span>
                {showAfter && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-auto text-[10px] font-bold text-green-700 dark:text-green-600 bg-green-600/10 px-2 py-0.5 rounded-md"
                  >
                    -{ex.pct}%
                  </motion.span>
                )}
              </div>
              <div className="terminal-body min-h-[180px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${ex.id}-${showAfter}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-xs leading-loose font-mono"
                  >
                    {(showAfter ? ex.after : ex.before).map((line, i) => (
                      <div key={i} className={line.color}>{line.text}</div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <motion.div className="flex items-center justify-center gap-6 mt-4 text-xs" layout>
              <span className="text-neutral-500">{ex.beforeChars.toLocaleString()} chars</span>
              <svg className="w-4 h-4 text-green-700 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span className="text-green-700 dark:text-green-600 font-bold">{ex.afterChars} chars</span>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

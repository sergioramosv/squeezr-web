"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GridBackground } from "@/components/GridBackground";
import { TypingTerminal } from "@/components/Terminal";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { useI18n } from "@/lib/i18n";

const terminalLines = [
  { prompt: "$", command: "npm install -g squeezr-ai", delay: 400 },
  { output: "added 1 package in 3.2s", delay: 100 },
  { prompt: "$", command: "squeezr setup", delay: 400 },
  { output: "✓ Environment configured", outputColor: "text-green-600", delay: 200 },
  { output: "✓ Proxy started on :8080", outputColor: "text-green-600", delay: 200 },
  { output: "✓ TLS certificates generated", outputColor: "text-green-600", delay: 200 },
  { prompt: "$", command: "claude", delay: 600 },
  { output: "✓ Squeezr active — compressing...", outputColor: "text-green-600", delay: 300 },
  { output: "", delay: 100 },
];

/* Inline compression animation data */
const compressionSteps = [
  { label: "vitest run", original: "2,340 chars", compressed: "198 chars", pct: 92 },
  { label: "cat server.ts", original: "3,200 lines", compressed: "84 chars", pct: 97 },
  { label: "git diff", original: "1,800 chars", compressed: "320 chars", pct: 82 },
];

function CompressionTicker() {
  return (
    <div className="space-y-2">
      {compressionSteps.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 3.5 + i * 0.6, duration: 0.4 }}
          className="flex items-center justify-between text-xs font-mono px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
        >
          <span className="text-neutral-500 dark:text-neutral-500">{s.label}</span>
          <div className="flex items-center gap-2">
            <span className="text-neutral-400 dark:text-neutral-600 line-through">{s.original}</span>
            <span className="text-green-700 dark:text-green-600 font-bold">{s.compressed}</span>
            <span className="text-[10px] font-bold text-white bg-green-700 dark:bg-green-600 px-1.5 py-0.5 rounded">
              -{s.pct}%
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-neutral-50 dark:bg-[#0a0a0a]">
      <GridBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 md:py-36 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800/50"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">{t.hero.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6"
            >
              <span className="text-neutral-900 dark:text-white">{t.hero.title1}</span>
              <br />
              <span className="text-blue-600 dark:text-blue-500">{t.hero.title2}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed max-w-lg"
            >
              {t.hero.desc}{" "}
              <span className="text-neutral-800 dark:text-neutral-200 font-medium">{t.hero.descHighlight}</span>{" "}
              {t.hero.descEnd}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <Link
                href="/docs"
                className="group px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all text-sm flex items-center gap-2 hover:-translate-y-0.5"
              >
                {t.hero.cta}
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </Link>
              <a
                href="https://github.com/sergioramosv/Squeezr"
                className="group px-7 py-3.5 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 font-semibold rounded-xl transition-all hover:-translate-y-0.5 text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            </motion.div>

            {/* Animated stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex gap-10"
            >
              <div>
                <AnimatedCounter target={30} suffix="+" className="text-3xl font-extrabold text-neutral-900 dark:text-white" />
                <div className="text-neutral-500 text-xs mt-1">{t.hero.stats.patterns}</div>
              </div>
              <div className="w-px bg-neutral-200 dark:bg-neutral-800" />
              <div>
                <AnimatedCounter target={7} className="text-3xl font-extrabold text-neutral-900 dark:text-white" />
                <div className="text-neutral-500 text-xs mt-1">{t.hero.stats.layers}</div>
              </div>
              <div className="w-px bg-neutral-200 dark:bg-neutral-800" />
              <div>
                <AnimatedCounter target={95} suffix="%" className="text-3xl font-extrabold text-green-700 dark:text-green-600" />
                <div className="text-neutral-500 text-xs mt-1">{t.hero.stats.compression}</div>
              </div>
            </motion.div>
          </div>

          {/* Right: Terminal + live compression ticker */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block space-y-4"
          >
            <TypingTerminal title="~ — zsh" lines={terminalLines} />
            <CompressionTicker />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

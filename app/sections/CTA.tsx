"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TypingTerminal } from "@/components/Terminal";
import { useI18n } from "@/lib/i18n";

const ctaLines = [
  { prompt: "$", command: "npm i -g squeezr-ai", delay: 300 },
  { prompt: "$", command: "squeezr setup", delay: 300 },
  { prompt: "$", command: "claude", delay: 400 },
  { output: "✓ Compressing automatically", outputColor: "text-green-600", delay: 0 },
];

export function CTASection() {
  const { t } = useI18n();
  const badges = [
    { text: t.cta.badges.mit, color: "text-neutral-700 dark:text-neutral-300", bg: "bg-neutral-100 dark:bg-neutral-800", border: "border-neutral-200 dark:border-neutral-700" },
    { text: t.cta.badges.zero, color: "text-green-700 dark:text-green-500", bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-800/30" },
    { text: t.cta.badges.setup, color: "text-neutral-700 dark:text-neutral-300", bg: "bg-neutral-100 dark:bg-neutral-800", border: "border-neutral-200 dark:border-neutral-700" },
  ];

  return (
    <section className="relative px-6 py-24 md:py-32 overflow-hidden bg-neutral-50 dark:bg-[#0f0f0f]">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 dark:text-white mb-4">{t.cta.title}</h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-10 text-lg">{t.cta.desc}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="max-w-md mx-auto mb-10">
            <TypingTerminal title="terminal" lines={ctaLines} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/docs/installation" className="px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-all text-sm hover:-translate-y-0.5">
              {t.cta.readDocs}
            </Link>
            <a href="https://github.com/sergioramosv/Squeezr" className="px-8 py-4 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 font-semibold rounded-xl transition-all text-sm">
              {t.cta.viewGithub}
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="flex justify-center gap-3 flex-wrap">
            {badges.map((b) => (
              <motion.span key={b.text} className={`px-3 py-1.5 rounded-full text-xs font-medium ${b.color} ${b.bg} border ${b.border}`}
                whileHover={{ scale: 1.05, y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
                {b.text}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";
import { ScrollReveal } from "./ScrollReveal";
import { useI18n } from "@/lib/i18n";

const compressionKeys = ["test", "file", "diff", "system"] as const;
const compressionMeta = [
  { before: 2340, after: 198, pct: 92, color: "#2563eb" },
  { before: 3200, after: 84, pct: 97, color: "#7c3aed" },
  { before: 1800, after: 320, pct: 82, color: "#ea580c" },
  { before: 13000, after: 600, pct: 95, color: "#16a34a" },
];

function CompressBar({ label, sublabel, before, after, pct, color, index }: {
  label: string; sublabel: string; before: number; after: number; pct: number; color: string; index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-sm font-semibold text-neutral-900 dark:text-white">{label}</span>
          <span className="text-xs text-neutral-400 dark:text-neutral-600 ml-2">{sublabel}</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-neutral-400 dark:text-neutral-500">{before.toLocaleString()} chars</span>
          <svg className="w-3 h-3 text-neutral-300 dark:text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          <span className="text-green-700 dark:text-green-600 font-bold">{after} chars</span>
        </div>
      </div>

      <div className="relative h-8 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-lg"
          style={{ backgroundColor: `${color}12` }}
          initial={{ width: "100%" }}
          animate={isInView ? { width: "100%" } : {}}
        />
        <motion.div
          className="absolute inset-y-0 left-0 rounded-lg"
          style={{ backgroundColor: color }}
          initial={{ width: "100%" }}
          animate={isInView ? { width: `${100 - pct}%` } : { width: "100%" }}
          transition={{ duration: 1.2, delay: index * 0.12 + 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className="absolute inset-0 flex items-center justify-end pr-3">
          <motion.span
            className="text-xs font-bold text-white drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: index * 0.12 + 1.2 }}
          >
            -{pct}%
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

function DonutChart({ label }: { label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const avgPct = 91.5;
  const circumference = 2 * Math.PI * 80;
  const dashoffset = circumference - (circumference * avgPct) / 100;

  return (
    <div ref={ref} className="relative w-56 h-56 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="16" className="text-neutral-200 dark:text-neutral-800" />
        <motion.circle
          cx="100" cy="100" r="80"
          fill="none"
          stroke="#2563eb"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: dashoffset } : {}}
          transition={{ duration: 2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <AnimatedCounter target={avgPct} suffix="%" decimals={1} className="text-4xl font-extrabold text-neutral-900 dark:text-white" duration={2.5} />
        <span className="text-xs text-neutral-500 mt-1">{label}</span>
      </div>
    </div>
  );
}

export function CompressionVisualizer() {
  const { t } = useI18n();
  const items = compressionKeys.map((k, i) => ({
    ...compressionMeta[i],
    label: t.compression.items[k].label,
    sublabel: t.compression.items[k].sub,
  }));

  return (
    <section className="px-6 py-24 md:py-32 relative overflow-hidden bg-neutral-50 dark:bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-500 mb-3 block">{t.compression.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">{t.compression.title}</h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">{t.compression.desc}</p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2}>
              <DonutChart label={t.compression.avgCompressed} />
              <div className="flex justify-center gap-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-900 dark:text-white">7</div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{t.compression.layers}</div>
                </div>
                <div className="w-px bg-neutral-200 dark:bg-neutral-800" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-neutral-900 dark:text-white">30+</div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{t.compression.patterns}</div>
                </div>
                <div className="w-px bg-neutral-200 dark:bg-neutral-800" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700 dark:text-green-600">$$$</div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-wider">{t.compression.saved}</div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-3 space-y-5">
            {items.map((item, i) => (
              <CompressBar key={item.label} {...item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

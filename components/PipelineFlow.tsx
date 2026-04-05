"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { useI18n } from "@/lib/i18n";
import { FiFileText, FiCopy, FiFilter, FiTool, FiAlignLeft, FiCpu, FiDatabase } from "react-icons/fi";
import { ReactNode } from "react";

const stepKeys = ["system", "dedup", "noise", "patterns", "lineDedup", "ai", "cache"] as const;
const stepMeta: { pct: number; icon: ReactNode; color: string }[] = [
  { pct: 95, icon: <FiFileText className="w-5 h-5" />, color: "#2563eb" },
  { pct: 80, icon: <FiCopy className="w-5 h-5" />, color: "#7c3aed" },
  { pct: 30, icon: <FiFilter className="w-5 h-5" />, color: "#ea580c" },
  { pct: 60, icon: <FiTool className="w-5 h-5" />, color: "#d97706" },
  { pct: 25, icon: <FiAlignLeft className="w-5 h-5" />, color: "#16a34a" },
  { pct: 85, icon: <FiCpu className="w-5 h-5" />, color: "#dc2626" },
  { pct: 90, icon: <FiDatabase className="w-5 h-5" />, color: "#0d9488" },
];

function PipelineNode({ title, desc, pct, icon, color, index, total }: {
  title: string; desc: string; pct: number; icon: ReactNode; color: string; index: number; total: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const circumference = 2 * Math.PI * 22;
  const dashoffset = circumference - (circumference * pct) / 100;

  return (
    <motion.div
      ref={ref}
      className="relative flex items-center gap-5 group"
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {index < total - 1 && (
        <motion.div
          className="absolute left-[27px] top-[58px] w-0.5 h-[calc(100%)] z-0 bg-neutral-200 dark:bg-neutral-800"
          style={{ transformOrigin: "top" }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
        />
      )}

      <div className="relative w-14 h-14 shrink-0 z-10">
        <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
          <circle cx="28" cy="28" r="22" fill="currentColor" stroke="currentColor" strokeWidth="3" className="text-neutral-100 dark:text-neutral-900 stroke-neutral-200 dark:stroke-neutral-800" />
          <motion.circle
            cx="28" cy="28" r="22"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset: dashoffset } : {}}
            transition={{ duration: 1, delay: index * 0.1 + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center" style={{ color }}>
          {icon}
        </div>
      </div>

      <div className="flex-1 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
              <span className="text-neutral-400 dark:text-neutral-600 text-xs font-mono mr-2">{String(index + 1).padStart(2, "0")}</span>
              {title}
            </h4>
            <p className="text-xs text-neutral-500 mt-0.5">{desc}</p>
          </div>
          <motion.div
            className="text-xs font-bold px-2.5 py-1 rounded-lg"
            style={{ backgroundColor: `${color}15`, color }}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.5, type: "spring" }}
          >
            {pct}%
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function PipelineFlow() {
  const { t } = useI18n();
  const steps = stepKeys.map((k, i) => ({
    ...stepMeta[i],
    title: t.pipeline.steps[k].title,
    desc: t.pipeline.steps[k].desc,
  }));

  return (
    <section className="px-6 py-24 md:py-32 relative bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3 block">{t.pipeline.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">{t.pipeline.title}</h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">{t.pipeline.desc}</p>
          </div>
        </ScrollReveal>
        <div className="relative">
          {steps.map((step, i) => (
            <PipelineNode key={step.title} {...step} index={i} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Terminal, TerminalLine } from "@/components/Terminal";
import { useI18n } from "@/lib/i18n";

const stepKeys = ["install", "proxy", "savings"] as const;
const stepTerminals = [
  { title: "terminal", lines: [{ prompt: "$", command: "npm i -g squeezr-ai" }, { prompt: "$", command: "squeezr setup" }, { output: "✓ Done" }] },
  { title: "proxy", lines: [{ output: "→ POST /v1/messages" }, { output: "  12,847 tokens input" }, { output: "  Compressing..." }] },
  { title: "stats", lines: [{ output: "✓ 42 requests processed" }, { output: "✓ 34,291 tokens saved" }, { output: "✓ 78% average compression" }] },
];

function StepCard({ step, terminal, index, total }: {
  step: { title: string; desc: string }; terminal: typeof stepTerminals[0]; index: number; total: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <div className="hidden md:flex flex-col items-center shrink-0">
        <motion.div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold text-white bg-blue-600"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.15 + 0.2, type: "spring" }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>
        {index < total - 1 && (
          <motion.div
            className="w-0.5 flex-1 mt-2 bg-neutral-200 dark:bg-neutral-800"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
            style={{ transformOrigin: "top" }}
          />
        )}
      </div>

      <div className="flex-1 pb-12">
        <div className="md:hidden mb-3">
          <span className="inline-flex w-8 h-8 rounded-lg bg-blue-600 items-center justify-center text-xs font-bold text-white">{String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">{step.title}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 max-w-md">{step.desc}</p>
        <div className="max-w-sm">
          <Terminal title={terminal.title}>
            {terminal.lines.map((l, i) => (
              <TerminalLine key={i} {...l} />
            ))}
          </Terminal>
        </div>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const { t } = useI18n();
  const steps = stepKeys.map((k) => t.howItWorks.steps[k]);

  return (
    <section className="px-6 py-24 md:py-32 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-600 mb-3 block">{t.howItWorks.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">{t.howItWorks.title}</h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">{t.howItWorks.desc}</p>
          </div>
        </ScrollReveal>
        <div>
          {steps.map((step, i) => (
            <StepCard key={i} step={step} terminal={stepTerminals[i]} index={i} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, ReactNode } from "react";
import { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { ScrollReveal } from "./ScrollReveal";
import { useI18n } from "@/lib/i18n";
import { FiZap, FiCpu, FiCopy, FiDatabase, FiSearch, FiSettings } from "react-icons/fi";

const featureKeys = ["patterns", "ai", "dedup", "cache", "expand", "zero"] as const;
const featureMeta: { big: boolean; demo: "pattern" | "ai" | null; iconColor: string; icon: ReactNode }[] = [
  { big: true, demo: "pattern", iconColor: "#16a34a", icon: <FiZap className="w-5 h-5" /> },
  { big: true, demo: "ai", iconColor: "#7c3aed", icon: <FiCpu className="w-5 h-5" /> },
  { big: false, demo: null, iconColor: "#ea580c", icon: <FiCopy className="w-5 h-5" /> },
  { big: false, demo: null, iconColor: "#16a34a", icon: <FiDatabase className="w-5 h-5" /> },
  { big: false, demo: null, iconColor: "#d97706", icon: <FiSearch className="w-5 h-5" /> },
  { big: false, demo: null, iconColor: "#dc2626", icon: <FiSettings className="w-5 h-5" /> },
];

function PatternDemo() {
  const lines = [
    { before: "PASS src/config.test.ts (12 tests)", after: "config: 12 ✓" },
    { before: "PASS src/cache.test.ts (8 tests)", after: "cache: 8 ✓" },
    { before: "FAIL src/server.test.ts (2 failed)", after: "server: 2 ✗" },
  ];
  const [compressed, setCompressed] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setCompressed(true), 1500);
    return () => clearTimeout(t);
  }, [isInView]);

  return (
    <div ref={ref} className="mt-4 font-mono text-[11px] space-y-1">
      {lines.map((l, i) => (
        <motion.div key={i} className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-900" layout>
          <motion.span
            key={compressed ? "after" : "before"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className={compressed ? "text-green-700 dark:text-green-500" : "text-neutral-500 dark:text-neutral-400"}
          >
            {compressed ? l.after : l.before}
          </motion.span>
        </motion.div>
      ))}
      {compressed && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-green-700 dark:text-green-600 text-[10px] mt-2 font-bold">
          -67% compressed
        </motion.div>
      )}
    </div>
  );
}

function AIDemo() {
  const models = [
    { name: "Haiku", color: "#ea580c", ms: "120ms" },
    { name: "GPT-mini", color: "#16a34a", ms: "95ms" },
    { name: "Flash", color: "#16a34a", ms: "80ms" },
  ];
  const [active, setActive] = useState(-1);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let i = 0;
    const interval = setInterval(() => {
      setActive(i % 3);
      i++;
      if (i > 5) clearInterval(interval);
    }, 800);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={ref} className="mt-4 flex gap-3">
      {models.map((m, i) => (
        <motion.div
          key={m.name}
          className="flex-1 text-center px-3 py-2.5 rounded-xl border transition-all duration-300"
          style={{
            borderColor: active === i ? m.color : undefined,
            backgroundColor: active === i ? `${m.color}10` : "transparent",
          }}
          animate={active === i ? { scale: 1.05 } : { scale: 1 }}
        >
          <div className="text-xs font-bold text-neutral-900 dark:text-white">{m.name}</div>
          <div className="text-[10px] mt-1" style={{ color: active === i ? m.color : "#737373" }}>{m.ms}</div>
          {active === i && (
            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className="h-0.5 rounded-full mt-2 mx-auto" style={{ backgroundColor: m.color }} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

function FeatureIcon({ color, icon }: { color: string; icon: ReactNode }) {
  return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}12`, color }}>
      {icon}
    </div>
  );
}

export function BentoGrid() {
  const { t } = useI18n();
  const features = featureKeys.map((k, i) => ({
    ...featureMeta[i],
    title: t.features[k].title,
    desc: t.features[k].desc,
    tag: t.features[k].tag,
  }));

  return (
    <section className="px-6 py-24 md:py-32 bg-neutral-50 dark:bg-[#0f0f0f]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-700 dark:text-green-500 mb-3 block">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              {t.features.patterns.title.includes("30") ? "Everything you need" : "Todo lo que necesitas"}
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
          {features.map((f, i) => (
            <StaggerItem key={f.title} className={f.big ? "lg:col-span-2 lg:row-span-2" : ""}>
              <div className="h-full relative group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 overflow-hidden transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <FeatureIcon color={featureMeta[i].iconColor} icon={featureMeta[i].icon} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors">{f.tag}</span>
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-green-700 dark:group-hover:text-green-500 transition-colors">{f.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
                  {f.demo === "pattern" && <PatternDemo />}
                  {f.demo === "ai" && <AIDemo />}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

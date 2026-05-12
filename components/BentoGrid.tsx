"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, ReactNode } from "react";
import { StaggerContainer, StaggerItem, ScrollReveal } from "./ScrollReveal";
import { useI18n } from "@/lib/i18n";
import { FiZap, FiCpu, FiCopy, FiDatabase, FiSearch, FiSettings } from "react-icons/fi";

const featureKeys = ["patterns", "ai", "dedup", "cache", "expand", "zero"] as const;
const featureMeta: { big: boolean; demo: "pattern" | "ai" | null; icon: ReactNode }[] = [
  { big: true,  demo: "pattern", icon: <FiZap      className="w-5 h-5" /> },
  { big: true,  demo: "ai",      icon: <FiCpu      className="w-5 h-5" /> },
  { big: false, demo: null,      icon: <FiCopy     className="w-5 h-5" /> },
  { big: false, demo: null,      icon: <FiDatabase className="w-5 h-5" /> },
  { big: false, demo: null,      icon: <FiSearch   className="w-5 h-5" /> },
  { big: false, demo: null,      icon: <FiSettings className="w-5 h-5" /> },
];

function PatternDemo() {
  const lines = [
    { before: "PASS src/config.test.ts (12 tests)", after: "config: 12 ✓" },
    { before: "PASS src/cache.test.ts (8 tests)",   after: "cache: 8 ✓"  },
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
    <div ref={ref} className="mt-4 font-mono text-[11px] space-y-1.5">
      {lines.map((l, i) => (
        <motion.div key={i} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.05]" layout>
          <motion.span
            key={compressed ? "after" : "before"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className={compressed ? "text-green-400" : "text-white/30"}
          >
            {compressed ? l.after : l.before}
          </motion.span>
        </motion.div>
      ))}
      {compressed && (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
          className="text-green-500 text-[10px] mt-2 font-bold font-mono">
          −67% compressed
        </motion.div>
      )}
    </div>
  );
}

function AIDemo() {
  const models = [
    { name: "Haiku",   ms: "120ms" },
    { name: "GPT-mini",ms: "95ms"  },
    { name: "Flash",   ms: "80ms"  },
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
    <div ref={ref} className="mt-4 flex gap-2">
      {models.map((m, i) => (
        <motion.div
          key={m.name}
          className="flex-1 text-center px-3 py-2.5 rounded-xl border transition-all duration-300"
          style={{
            borderColor: active === i ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.06)",
            backgroundColor: active === i ? "rgba(34,197,94,0.08)" : "transparent",
          }}
          animate={active === i ? { scale: 1.04 } : { scale: 1 }}
        >
          <div className="text-xs font-bold text-white">{m.name}</div>
          <div className="text-[10px] mt-1" style={{ color: active === i ? "#4ade80" : "rgba(255,255,255,0.3)" }}>{m.ms}</div>
          {active === i && (
            <motion.div initial={{ width: 0 }} animate={{ width: "100%" }}
              className="h-0.5 rounded-full mt-2 mx-auto bg-green-400" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

export function BentoGrid() {
  const { t } = useI18n();
  const features = featureKeys.map((k, i) => ({
    ...featureMeta[i],
    title: t.features[k].title,
    desc:  t.features[k].desc,
    tag:   t.features[k].tag,
  }));

  return (
    <section className="px-6 py-24 md:py-32 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-green-400 mb-3 block">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need</h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-auto">
          {features.map((f, i) => (
            <StaggerItem key={f.title} className={f.big ? "lg:col-span-2 lg:row-span-2" : ""}>
              <motion.div
                whileHover={{ borderColor: "rgba(34,197,94,0.25)", backgroundColor: "rgba(255,255,255,0.04)" }}
                className="h-full relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 overflow-hidden transition-all duration-300 cursor-default"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-900/25 text-green-400">
                      {featureMeta[i].icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">{f.tag}</span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{f.desc}</p>
                  {f.demo === "pattern" && <PatternDemo />}
                  {f.demo === "ai"      && <AIDemo />}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TypingTerminal } from "@/components/Terminal";
import { useI18n } from "@/lib/i18n";

const ctaLines = [
  { prompt: "$", command: "npm i -g squeezr-ai", delay: 300 },
  { prompt: "$", command: "squeezr setup",       delay: 300 },
  { prompt: "$", command: "claude",              delay: 400 },
  { output: "✓ Compressing automatically", outputColor: "text-green-400", delay: 0 },
];

export function CTASection() {
  const { t } = useI18n();

  return (
    <section className="relative px-6 py-24 md:py-32 overflow-hidden bg-[#050505] border-t border-white/[0.04]">
      {/* Subtle green glow center */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(34,197,94,0.07) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">{t.cta.title}</h2>
          <p className="text-white/40 mb-10 text-lg">{t.cta.desc}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="max-w-md mx-auto mb-10">
            <TypingTerminal title="terminal" lines={ctaLines} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/docs/installation"
              className="px-8 py-4 bg-white text-black font-bold rounded-xl transition-all text-sm hover:-translate-y-0.5 hover:bg-neutral-100">
              {t.cta.readDocs}
            </Link>
            <a href="https://github.com/sergioramosv/Squeezr"
              className="px-8 py-4 border border-white/15 text-white/80 font-semibold rounded-xl transition-all text-sm hover:border-white/30 hover:text-white hover:-translate-y-0.5">
              {t.cta.viewGithub}
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="flex justify-center gap-3 flex-wrap">
            {[t.cta.badges.mit, t.cta.badges.zero, t.cta.badges.setup].map((text) => (
              <motion.span
                key={text}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-white/50 bg-white/[0.04] border border-white/[0.08]"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {text}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

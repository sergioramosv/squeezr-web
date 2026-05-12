"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Token pool ─────────────────────────────────────────── */
const TOKEN_POOL = [
  "const messages", "system_prompt", "token_count", "compress()",
  "84% saved", "context_window", "async/await", "14,203 tokens",
  "→ 2,108", "claude-3", "stream()", "cache.get()", "proxy :8080",
  "max_tokens", "truncate", "gpt-4o", "ollama", "aider",
  "ANTHROPIC_KEY", "BASE_URL", "chunk()", "dedupe()", "91% saved",
  "role: user", "content:", "stop_seq", "top_p: 0.9", "temp: 0.7",
  "embed()", "gemini", "codex", "return msgs", "llm.call()",
  "72% saved", "window=128k", "merge()", "import {compress}",
  "export default", "Buffer.from", "ReadableStream", "fetch(api)",
];

function rnd(a: number, b: number) { return a + Math.random() * (b - a); }

function makeToken(i: number) {
  const angle = (i / 42) * Math.PI * 2 + rnd(-0.2, 0.2);
  const dist  = rnd(180, 460);
  return {
    id:      i,
    text:    TOKEN_POOL[i % TOKEN_POOL.length],
    x:       Math.cos(angle) * dist,
    y:       Math.sin(angle) * dist * 0.62,
    size:    rnd(10, 15),
    delay:   rnd(0, 0.6),
    opacity: rnd(0.18, 0.45),
    rotate:  rnd(-18, 18),
  };
}

/* ─── Flash particles (circular burst, no cross) ─────────── */
const BURST_COUNT = 32;

function makeBurstParticle(i: number) {
  const angle = (i / BURST_COUNT) * Math.PI * 2 + rnd(-0.1, 0.1);
  const dist  = rnd(160, 360);
  return {
    id:    i,
    tx:    Math.cos(angle) * dist,
    ty:    Math.sin(angle) * dist,
    size:  i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : 2,
    dur:   rnd(0.45, 0.75),
    color: i % 5 === 0 ? "rgba(34,197,94,0.9)" : "rgba(255,255,255,0.85)",
  };
}

const BURST_PARTICLES = Array.from({ length: BURST_COUNT }, (_, i) => makeBurstParticle(i));

function FlashEffect() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

      {/* Core — bright dot that blooms */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 8, height: 8,
          background: "radial-gradient(circle, #fff 30%, rgba(34,197,94,0.8) 70%, transparent 100%)",
        }}
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 50, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.1, 0, 0.2, 1] }}
      />

      {/* Ring 1 — tight, fast */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 12, height: 12, border: "2px solid rgba(255,255,255,0.95)" }}
        initial={{ scale: 0.5, opacity: 1 }}
        animate={{ scale: 60, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.05, 0, 0.15, 1], delay: 0.02 }}
      />

      {/* Ring 2 — medium */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 12, height: 12, border: "1.5px solid rgba(34,197,94,0.6)" }}
        initial={{ scale: 0.5, opacity: 0.9 }}
        animate={{ scale: 110, opacity: 0 }}
        transition={{ duration: 0.75, ease: [0.05, 0, 0.2, 1], delay: 0.07 }}
      />

      {/* Ring 3 — wide, slow */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 12, height: 12, border: "1px solid rgba(255,255,255,0.25)" }}
        initial={{ scale: 0.5, opacity: 0.6 }}
        animate={{ scale: 180, opacity: 0 }}
        transition={{ duration: 1.1, ease: [0.05, 0, 0.25, 1], delay: 0.12 }}
      />

      {/* Circular particle burst — no cross, no rays */}
      {BURST_PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ width: p.size, height: p.size, background: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.tx, y: p.ty, opacity: 0, scale: 0 }}
          transition={{ duration: p.dur, ease: [0.2, 0, 0.5, 1], delay: 0.04 }}
        />
      ))}

    </div>
  );
}

/* ─── Phases ─────────────────────────────────────────────── */
type Phase = "idle" | "scatter" | "compress" | "flash" | "reveal" | "done";
const LETTERS = ["S","Q","U","E","E","Z","R"];

/* ─── Component ──────────────────────────────────────────── */
export function HeroSection() {
  const [phase, setPhase] = useState<Phase>("idle");
  const tokens = useMemo(() => Array.from({ length: 42 }, (_, i) => makeToken(i)), []);

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase("scatter"),  120),
      setTimeout(() => setPhase("compress"), 1900),
      setTimeout(() => setPhase("flash"),    2750),
      setTimeout(() => setPhase("reveal"),   3000),
      setTimeout(() => setPhase("done"),     4800),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  function tokenAnimate(tk: ReturnType<typeof makeToken>) {
    if (phase === "idle")
      return { x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 };

    if (phase === "scatter")
      return {
        x: tk.x, y: tk.y,
        opacity: tk.opacity,
        scale: 1,
        rotate: tk.rotate,
        transition: { duration: 1.0, delay: tk.delay, ease: [0.15, 0, 0.35, 1] },
      };

    return {
      x: 0, y: 0,
      opacity: 0,
      scale: 0,
      rotate: 0,
      transition: { duration: 0.55, ease: [0.75, 0, 1, 1] },
    };
  }

  return (
    <section className="relative w-full h-screen -mt-16 bg-black overflow-hidden flex flex-col items-center justify-center">

      {/* ── Token field — monochrome green ── */}
      {tokens.map(tk => (
        <motion.div
          key={tk.id}
          className="absolute font-mono font-semibold pointer-events-none select-none whitespace-nowrap"
          style={{ fontSize: tk.size, color: "rgba(34,197,94,1)" }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={tokenAnimate(tk)}
        >
          {tk.text}
        </motion.div>
      ))}

      {/* ── Flash ── */}
      <AnimatePresence>
        {phase === "flash" && <FlashEffect key="flash" />}
      </AnimatePresence>

      {/* ── SQUEEZR ── */}
      {(phase === "reveal" || phase === "done") && (
        <div className="flex items-baseline select-none" style={{ gap: "0.01em" }}>
          {LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              className="font-black text-white"
              style={{
                fontSize:      "clamp(3.5rem, 13vw, 11rem)",
                lineHeight:    1,
                letterSpacing: "-0.035em",
                textShadow:    "0 0 60px rgba(34,197,94,0.35), 0 0 140px rgba(34,197,94,0.12)",
              }}
              initial={{ opacity: 0, y: 55, scale: 0.4, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0,  scale: 1,   filter: "blur(0px)" }}
              transition={{
                delay:     i * 0.055,
                type:      "spring",
                stiffness: 380,
                damping:   22,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      )}

      {/* ── Tagline ── */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.p
            key="tagline"
            className="font-mono text-neutral-500 tracking-[0.35em] uppercase text-xs mt-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            compress · save · ship faster
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── CTAs ── */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.div
            key="cta"
            className="flex gap-3 mt-10"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <a
              href="/docs"
              className="px-6 py-3 bg-white text-black font-bold text-sm rounded-xl hover:bg-neutral-100 transition-colors"
            >
              Get started
            </a>
            <a
              href="https://github.com/sergioramosv/Squeezr"
              target="_blank"
              rel="noopener"
              className="px-6 py-3 border border-neutral-700 text-neutral-300 font-bold text-sm rounded-xl hover:border-neutral-500 hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll indicator ── */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.div
            key="scroll"
            className="absolute bottom-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-neutral-600 to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Tokens ─────────────────────────────────────────────── */
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
    opacity: rnd(0.2, 0.5),
    rotate:  rnd(-18, 18),
  };
}

/* ─── Star flash ─────────────────────────────────────────── */
// 4-pointed smooth star path (lens-flare style, not a cross)
const STAR_PATH = "M 50 0 C 50 28 72 50 100 50 C 72 50 50 72 50 100 C 50 72 28 50 0 50 C 28 50 50 28 50 0 Z";

function FlashEffect() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

      {/* Glow behind the star */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 20, height: 20,
          background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(34,197,94,0.5) 40%, transparent 75%)",
          filter: "blur(8px)",
        }}
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 30, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.1, 0, 0.3, 1] }}
      />

      {/* The star ✦ */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute"
        style={{ width: 120, height: 120, overflow: "visible" }}
        initial={{ scale: 0, opacity: 1, rotate: 0 }}
        animate={{ scale: 4.5, opacity: 0, rotate: 15 }}
        transition={{ duration: 0.55, ease: [0.05, 0, 0.2, 1] }}
      >
        <defs>
          <filter id="star-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Outer star — bright white */}
        <path d={STAR_PATH} fill="white" filter="url(#star-glow)" />
        {/* Inner core — tighter, brighter */}
        <path
          d="M 50 20 C 50 38 62 50 80 50 C 62 50 50 62 50 80 C 50 62 38 50 20 50 C 38 50 50 38 50 20 Z"
          fill="white"
        />
      </motion.svg>

      {/* Second smaller star, rotated 45° (makes it 8-pointed when combined) */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute"
        style={{ width: 120, height: 120, overflow: "visible" }}
        initial={{ scale: 0, opacity: 0.6, rotate: 45 }}
        animate={{ scale: 3, opacity: 0, rotate: 60 }}
        transition={{ duration: 0.6, ease: [0.05, 0, 0.25, 1], delay: 0.04 }}
      >
        <path d={STAR_PATH} fill="rgba(34,197,94,0.8)" />
      </motion.svg>

      {/* Shockwave ring 1 */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 14, height: 14, border: "1.5px solid rgba(255,255,255,0.9)" }}
        initial={{ scale: 0.5, opacity: 1 }}
        animate={{ scale: 70, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.05, 0, 0.15, 1], delay: 0.05 }}
      />

      {/* Shockwave ring 2 */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 14, height: 14, border: "1px solid rgba(34,197,94,0.5)" }}
        initial={{ scale: 0.5, opacity: 0.8 }}
        animate={{ scale: 130, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.05, 0, 0.2, 1], delay: 0.1 }}
      />

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
      setTimeout(() => setPhase("reveal"),   3050),
      setTimeout(() => setPhase("done"),     5200),   // more time before tagline
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  function tokenAnimate(tk: ReturnType<typeof makeToken>) {
    if (phase === "idle")
      return { x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 };
    if (phase === "scatter")
      return {
        x: tk.x, y: tk.y,
        opacity: tk.opacity, scale: 1, rotate: tk.rotate,
        transition: { duration: 1.0, delay: tk.delay, ease: [0.15, 0, 0.35, 1] },
      };
    return {
      x: 0, y: 0, opacity: 0, scale: 0, rotate: 0,
      transition: { duration: 0.55, ease: [0.75, 0, 1, 1] },
    };
  }

  return (
    <section className="relative w-full h-screen -mt-16 bg-black overflow-hidden flex flex-col items-center justify-center">

      {/* Tokens */}
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

      {/* Flash */}
      <AnimatePresence>
        {phase === "flash" && <FlashEffect key="flash" />}
      </AnimatePresence>

      {/* SQUEEZR */}
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
                delay: i * 0.055,
                type: "spring", stiffness: 380, damping: 22,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
      )}

      {/* Tagline — aparece suavemente, sin brusquedad */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.p
            key="tagline"
            className="font-mono text-neutral-500 tracking-[0.35em] uppercase text-xs mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
          >
            compress · save · ship faster
          </motion.p>
        )}
      </AnimatePresence>

      {/* CTAs — entran desde abajo muy suavemente */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.div
            key="cta"
            className="flex gap-3 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1.0, ease: [0.25, 0, 0.25, 1] }}
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

      {/* Scroll indicator */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.div
            key="scroll"
            className="absolute bottom-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
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

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Token data ─────────────────────────────────────────── */
const TOKENS = [
  "const", "messages", "=>", "{}", "system_prompt", "tokens",
  "compress", "async", "await", "context", "14k→2k", "✓",
  "proxy", "stream", "cache", "84%", "claude", ":8080",
  "chunk", "dedupe", "window", "buffer", "import", "export",
  "llm", "gpt-4o", "gemini", "ollama", "ANTHROPIC_KEY", "→",
  "truncate", "merge", "91%", "72%", "0x4f2a", "&&",
  "token_count", "usage", "minify", "<<EOF", "return", "??",
  "localhost", "BASE_URL", "aider", "codex", "[...msgs]", "{}",
  "role:", "content:", "max_tokens", "stop_seq", "top_p", "temp",
];

const COLORS = [
  "#22c55e", "#3b82f6", "#a855f7", "#f97316",
  "#06b6d4", "#facc15", "#ec4899", "#6366f1",
  "#34d399", "#60a5fa", "#c084fc", "#fb923c",
];

function rnd(a: number, b: number) { return a + Math.random() * (b - a); }

function makeToken(i: number) {
  // Spread tokens in a wide circle around center
  const angle = (i / 54) * Math.PI * 2 + rnd(-0.15, 0.15);
  const dist   = rnd(200, 480);
  return {
    id:       i,
    text:     TOKENS[i % TOKENS.length],
    color:    COLORS[i % COLORS.length],
    sx:       Math.cos(angle) * dist,              // scatter x
    sy:       Math.sin(angle) * dist * 0.65,       // scatter y (flatter ellipse)
    size:     rnd(10, 17),
    delay:    rnd(0, 0.55),
    rotate:   rnd(-25, 25),
    opacity:  rnd(0.55, 0.9),
  };
}

/* ─── Letter data ────────────────────────────────────────── */
const LETTERS = ["S", "Q", "U", "E", "E", "Z", "R"];

/* ─── Phase type ─────────────────────────────────────────── */
type Phase = "idle" | "scatter" | "compress" | "flash" | "reveal" | "done";

/* ─── Component ──────────────────────────────────────────── */
export function HeroSection() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [tokens]          = useState(() => Array.from({ length: 54 }, (_, i) => makeToken(i)));

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase("scatter"),  120),
      setTimeout(() => setPhase("compress"), 1900),
      setTimeout(() => setPhase("flash"),    2750),
      setTimeout(() => setPhase("reveal"),   3050),
      setTimeout(() => setPhase("done"),     4800),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  /* Token animation per phase */
  function tokenAnimate(tk: ReturnType<typeof makeToken>) {
    if (phase === "idle")
      return { x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 };

    if (phase === "scatter")
      return {
        x: tk.sx, y: tk.sy,
        opacity: tk.opacity,
        scale: 1,
        rotate: tk.rotate,
        transition: { duration: 1.0, delay: tk.delay, ease: [0.15, 0, 0.35, 1] },
      };

    // compress → flash → reveal → done
    return {
      x: 0, y: 0,
      opacity: 0,
      scale: 0,
      rotate: 0,
      transition: { duration: 0.55, ease: [0.7, 0, 1, 1] },
    };
  }

  return (
    <section className="relative w-full h-screen -mt-16 bg-black overflow-hidden flex flex-col items-center justify-center">

      {/* ── Tokens ── */}
      {tokens.map(tk => (
        <motion.div
          key={tk.id}
          className="absolute font-mono font-bold pointer-events-none select-none whitespace-nowrap"
          style={{ color: tk.color, fontSize: tk.size }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={tokenAnimate(tk)}
        >
          {tk.text}
        </motion.div>
      ))}

      {/* ── Flash orb ── */}
      <AnimatePresence>
        {phase === "flash" && (
          <motion.div
            key="flash"
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 160, height: 160,
              background:
                "radial-gradient(circle, #fff 0%, #22c55e 35%, rgba(34,197,94,0.2) 65%, transparent 80%)",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 7,  opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0, 0.5, 1] }}
          />
        )}
      </AnimatePresence>

      {/* ── SQUEEZR ── */}
      {(phase === "reveal" || phase === "done") && (
        <div className="flex items-baseline select-none" style={{ gap: "0.01em" }}>
          {LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              className="font-black text-white"
              style={{
                fontSize: "clamp(3.5rem, 13vw, 11rem)",
                lineHeight: 1,
                letterSpacing: "-0.035em",
                textShadow: "0 0 80px rgba(34,197,94,0.25), 0 0 160px rgba(34,197,94,0.1)",
              }}
              initial={{ opacity: 0, y: 70, scale: 0.35 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              transition={{
                delay: i * 0.055,
                type: "spring",
                stiffness: 380,
                damping: 22,
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

      {/* ── CTA buttons ── */}
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
            className="absolute bottom-8 flex flex-col items-center gap-2"
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

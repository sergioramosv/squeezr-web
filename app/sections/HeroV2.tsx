"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Noise characters ───────────────────────────────────── */
const NOISE_CHARS = ["0","1","0","1","0","1","/","\\","|","─","·","░","▪","▫","•","×","○","□"];

function rnd(a: number, b: number) { return a + Math.random() * (b - a); }

function makeNoiseChar(i: number) {
  // Distribute across screen using polar + jitter
  const cols = 28, rows = 18;
  const col  = i % cols;
  const row  = Math.floor(i / cols);
  const cellW = 1700 / cols;
  const cellH = 960  / rows;
  return {
    id:     i,
    char:   NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)],
    x:      -850 + col * cellW + rnd(-cellW * 0.4, cellW * 0.4),
    y:      -480 + row * cellH + rnd(-cellH * 0.4, cellH * 0.4),
    size:   rnd(9, 14),
    delay:  rnd(0, 0.7),
    opacity: rnd(0.06, 0.22),
    driftX: rnd(-4, 4),
    driftY: rnd(-4, 4),
  };
}

const NOISE_COUNT = 28 * 18; // 504 chars

/* ─── Flash effect ───────────────────────────────────────── */
const RAY_ANGLES = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5];

function FlashEffect() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">

      {/* ── Core pulse ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 6, height: 6,
          background: "#fff",
          boxShadow: "0 0 0 0 rgba(255,255,255,1), 0 0 40px 10px rgba(34,197,94,0.8)",
        }}
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 60, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.1, 0, 0.2, 1] }}
      />

      {/* ── Shockwave ring 1 — tight, fast ── */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 10, height: 10, border: "1.5px solid rgba(255,255,255,0.9)" }}
        initial={{ scale: 1, opacity: 1 }}
        animate={{ scale: 80, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.05, 0, 0.2, 1], delay: 0.03 }}
      />

      {/* ── Shockwave ring 2 — wider, slower ── */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 10, height: 10, border: "1px solid rgba(34,197,94,0.5)" }}
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{ scale: 130, opacity: 0 }}
        transition={{ duration: 0.85, ease: [0.05, 0, 0.25, 1], delay: 0.08 }}
      />

      {/* ── Shockwave ring 3 — faint, very slow ── */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 10, height: 10, border: "0.5px solid rgba(255,255,255,0.2)" }}
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: 200, opacity: 0 }}
        transition={{ duration: 1.3, ease: [0.05, 0, 0.3, 1], delay: 0.14 }}
      />

      {/* ── Light rays ── */}
      {RAY_ANGLES.map((angle, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width:  i % 2 === 0 ? 1 : 0.5,
            bottom: "50%",
            left:   "calc(50% - 0.5px)",
            transformOrigin: "bottom center",
            rotate: angle,
            background: i % 4 === 0
              ? "linear-gradient(to top, rgba(255,255,255,0.7), transparent)"
              : "linear-gradient(to top, rgba(34,197,94,0.5), transparent)",
          }}
          initial={{ height: 0, opacity: 1 }}
          animate={{ height: i % 2 === 0 ? 420 : 260, opacity: 0 }}
          transition={{
            duration: i % 2 === 0 ? 0.5 : 0.4,
            ease: [0.1, 0, 0.3, 1],
            delay: 0.02 + i * 0.005,
          }}
        />
      ))}

      {/* ── Horizontal lens flare ── */}
      <motion.div
        className="absolute"
        style={{
          height: 1,
          width:  "100vw",
          background: "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.6) 35%, rgba(34,197,94,0.8) 50%, rgba(255,255,255,0.6) 65%, transparent 100%)",
        }}
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: [0, 1, 0], scaleX: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.04 }}
      />

      {/* ── Vertical lens flare ── */}
      <motion.div
        className="absolute"
        style={{
          width: 1,
          height: "100vh",
          background: "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.3) 40%, rgba(34,197,94,0.5) 50%, rgba(255,255,255,0.3) 60%, transparent 100%)",
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: [0, 0.8, 0], scaleY: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.04 }}
      />

    </div>
  );
}

/* ─── Phases ─────────────────────────────────────────────── */
type Phase = "idle" | "noise" | "compress" | "flash" | "reveal" | "done";

const LETTERS = ["S","Q","U","E","E","Z","R"];

/* ─── Component ──────────────────────────────────────────── */
export function HeroSection() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [chars]           = useState(() => Array.from({ length: NOISE_COUNT }, (_, i) => makeNoiseChar(i)));

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase("noise"),    100),
      setTimeout(() => setPhase("compress"), 2100),
      setTimeout(() => setPhase("flash"),    2950),
      setTimeout(() => setPhase("reveal"),   3200),
      setTimeout(() => setPhase("done"),     5000),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  function charAnimate(c: ReturnType<typeof makeNoiseChar>) {
    if (phase === "idle")
      return { x: 0, y: 0, opacity: 0, scale: 0 };

    if (phase === "noise")
      return {
        x: c.x, y: c.y,
        opacity: c.opacity,
        scale: 1,
        transition: { duration: 1.1, delay: c.delay, ease: [0.15, 0, 0.4, 1] },
      };

    // compress + flash + reveal + done
    return {
      x: 0, y: 0,
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.6,
        ease: [0.8, 0, 1, 1],
        delay: Math.random() * 0.12,   // slight stagger so they don't all arrive at once
      },
    };
  }

  return (
    <section className="relative w-full h-screen -mt-16 bg-black overflow-hidden flex flex-col items-center justify-center">

      {/* ── Noise field ── */}
      {chars.map(c => (
        <motion.div
          key={c.id}
          className="absolute font-mono pointer-events-none select-none"
          style={{ fontSize: c.size, color: "#fff" }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={charAnimate(c)}
        >
          {c.char}
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
              className="font-black"
              style={{
                fontSize:      "clamp(3.5rem, 13vw, 11rem)",
                lineHeight:    1,
                letterSpacing: "-0.035em",
                color:         "#fff",
                textShadow:    "0 0 60px rgba(34,197,94,0.3), 0 0 120px rgba(34,197,94,0.1)",
              }}
              initial={{ opacity: 0, y: 60, scale: 0.3, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0,  scale: 1,   filter: "blur(0px)" }}
              transition={{
                delay:     i * 0.06,
                type:      "spring",
                stiffness: 400,
                damping:   24,
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

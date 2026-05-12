"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Total compression duration
const PRESS_MS = 1700;

type Phase = "idle" | "big" | "compress" | "impact" | "done";

/* ── Single clean shockwave ring at impact ── */
function ImpactRing() {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width: 80, height: 80, border: "1px solid rgba(255,255,255,0.6)" }}
      initial={{ scale: 0.5, opacity: 0.8 }}
      animate={{ scale: 14, opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.05, 0, 0.2, 1] }}
    />
  );
}

export function HeroSection() {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const t = [
      setTimeout(() => setPhase("big"),      200),
      setTimeout(() => setPhase("compress"), 850),
      setTimeout(() => setPhase("impact"),   850 + PRESS_MS),
      setTimeout(() => setPhase("done"),     850 + PRESS_MS + 400),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  const isCompressing = phase === "compress" || phase === "impact" || phase === "done";

  return (
    <section className="relative w-full h-screen -mt-16 bg-black overflow-hidden flex flex-col items-center justify-center">

      {/* ── Shockwave ring — fires at impact ── */}
      <AnimatePresence>
        {phase === "impact" && <ImpactRing key="ring" />}
      </AnimatePresence>

      {/* ── SQUEEZR ── */}
      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key="text"
            className="flex items-baseline select-none"
            style={{ gap: "0.01em" }}

            // appear big instantly
            initial={{ scale: 4.5, opacity: 0 }}

            animate={
              phase === "big"
                ? { scale: 4.5, opacity: 1, filter: "blur(0px)", x: 0 }
                : isCompressing
                  ? {
                      // motion blur during, overcompress, bounce + shake at end
                      scale:  [4.5, 4.5, 0.88, 1],
                      filter: ["blur(0px)", "blur(0px)", "blur(5px)", "blur(0px)"],
                      x:      [0, 0, 0, -6, 6, -3, 3, 0],
                      opacity: 1,
                    }
                  : { scale: 4.5, opacity: 1, filter: "blur(0px)", x: 0 }
            }

            transition={
              phase === "big"
                ? { duration: 0.2, ease: "easeOut" }
                : {
                    duration: PRESS_MS / 1000,
                    times:    [0, 0.08, 0.82, 1],     // hold big → compress → bounce
                    ease:     "easeInOut",
                    x: {
                      duration: PRESS_MS / 1000,
                      times: [0, 0.08, 0.82, 0.86, 0.90, 0.93, 0.97, 1],
                      ease: "easeOut",
                    },
                  }
            }
          >
            {"SQUEEZR".split("").map((letter, i) => (
              <span
                key={i}
                className="font-black text-white"
                style={{
                  fontSize:      "clamp(2.8rem, 8vw, 7rem)",
                  lineHeight:    1,
                  letterSpacing: "-0.03em",
                }}
              >
                {letter}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Tagline ── */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.p
            key="tagline"
            className="font-mono text-neutral-500 tracking-[0.35em] uppercase text-xs mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.1, ease: "easeOut" }}
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
            className="flex gap-3 mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: [0.25, 0, 0.25, 1] }}
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
            transition={{ delay: 1.5, duration: 0.8 }}
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

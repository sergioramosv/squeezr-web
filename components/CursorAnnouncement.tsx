"use client";

import { motion } from "framer-motion";
import { FiMonitor, FiArrowRight, FiZap } from "react-icons/fi";
import Link from "next/link";

export function CursorAnnouncement() {
  return (
    <section className="relative px-6 py-16 md:py-20 bg-[#050505] border-t border-white/[0.04] overflow-hidden">

      {/* Faint green glow top-center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(34,197,94,0.12) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-4xl mx-auto">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-green-500/10 border border-green-500/25 text-green-400">
            <FiZap className="w-3 h-3" />
            Novedad
          </span>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative rounded-3xl border border-green-700/25 bg-green-950/10 p-8 md:p-12 text-center overflow-hidden"
        >
          {/* Subtle beam inside the card */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,197,94,0.06) 0%, transparent 70%)" }} />

          <div className="relative z-10">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-900/25 border border-green-700/30 text-green-400 mb-6">
              <FiMonitor className="w-8 h-8" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Cursor IDE — ya disponible
            </h2>
            <p className="text-white/45 text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Squeezr ahora comprime el contexto de Cursor IDE automáticamente vía proxy MITM.
              Sin configuración extra — instala, activa y empieza a ahorrar tokens al instante.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {[
                { label: "Compresión media", value: "84%" },
                { label: "Setup", value: "< 2 min" },
                { label: "Config extra", value: "Cero" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-green-400">{s.value}</div>
                  <div className="text-xs text-white/30 mt-0.5 font-mono uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/docs/cursor"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-sm rounded-xl hover:bg-neutral-100 transition-colors"
              >
                Ver documentación
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/sergioramosv/Squeezr"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white/70 font-semibold text-sm rounded-xl hover:border-white/30 hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

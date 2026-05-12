"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export function CursorAnnouncement() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative border-t border-b border-green-900/30 bg-green-950/20 backdrop-blur-sm overflow-hidden"
    >
      {/* Subtle left glow */}
      <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(34,197,94,0.06), transparent)" }} />

      <div className="max-w-6xl mx-auto px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">

        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-green-500/15 border border-green-500/30 text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Nuevo
          </span>

          {/* Text */}
          <span className="text-sm text-white/80 font-medium">
            <span className="text-white font-semibold">Cursor IDE</span>
            {" "}ya disponible — compresión automática vía proxy MITM
          </span>
        </div>

        {/* CTA */}
        <Link
          href="/docs/cursor"
          className="flex items-center gap-1.5 text-sm text-green-400 font-semibold hover:text-green-300 transition-colors shrink-0 group"
        >
          Ver documentación
          <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

"use client";

import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { FiTerminal, FiCode, FiZap, FiBox, FiLayers, FiMonitor } from "react-icons/fi";
import { SiOpenai } from "react-icons/si";
import { ReactNode } from "react";

interface Tool { name: string; desc: string; icon: ReactNode; soon?: boolean; }

const tools: Tool[] = [
  { name: "Claude Code", desc: "Anthropic Messages API", icon: <FiTerminal className="w-5 h-5" /> },
  { name: "OpenAI Codex", desc: "Chat Completions API", icon: <SiOpenai className="w-5 h-5" /> },
  { name: "Aider", desc: "OpenAI-compatible", icon: <FiCode className="w-5 h-5" /> },
  { name: "Gemini CLI", desc: "Google AI API", icon: <FiZap className="w-5 h-5" /> },
  { name: "Ollama", desc: "Local inference", icon: <FiBox className="w-5 h-5" /> },
  { name: "LM Studio", desc: "Local inference", icon: <FiLayers className="w-5 h-5" /> },
  { name: "Continue", desc: "VS Code & JetBrains", icon: <FiCode className="w-5 h-5" /> },
  { name: "Cursor IDE", desc: "Coming soon", icon: <FiMonitor className="w-5 h-5" />, soon: true },
];

export function LogoCloud() {
  const { locale } = useI18n();

  return (
    <section className="px-6 py-20 md:py-24 bg-[#050505] border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-green-400 mb-3 block">
              {locale === "es" ? "Compatibilidad" : "Compatibility"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {locale === "es" ? "Funciona con tus herramientas" : "Works with your tools"}
            </h2>
            <p className="text-white/40 text-sm max-w-md mx-auto">
              {locale === "es"
                ? "Detecta el formato de API automáticamente. Sin configuración por herramienta."
                : "Auto-detects API format from request headers. Zero per-tool config."}
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {tools.map((tool) => (
            <StaggerItem key={tool.name}>
              <motion.div
                whileHover={tool.soon ? {} : { y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={`relative flex flex-col items-center text-center px-4 py-5 rounded-2xl border transition-all duration-300 ${
                  tool.soon
                    ? "border-dashed border-white/[0.06] bg-white/[0.01]"
                    : "border-white/[0.06] bg-white/[0.02] hover:border-green-700/40 hover:bg-white/[0.04]"
                }`}
                style={tool.soon ? {} : { boxShadow: "0 0 0 0 rgba(34,197,94,0)" }}
                whileHover={tool.soon ? {} : {
                  y: -4,
                  boxShadow: "0 8px 30px rgba(34,197,94,0.06)",
                }}
              >
                {tool.soon && (
                  <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider text-green-600 bg-green-900/20 px-1.5 py-0.5 rounded">
                    Soon
                  </span>
                )}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 bg-green-900/20 text-green-400 ${tool.soon ? "opacity-30" : ""}`}>
                  {tool.icon}
                </div>
                <div className={`text-sm font-semibold mb-0.5 ${tool.soon ? "text-white/20" : "text-white"}`}>
                  {tool.name}
                </div>
                <div className={`text-[11px] ${tool.soon ? "text-green-700" : "text-white/35"}`}>
                  {tool.soon ? (locale === "es" ? "Próximamente" : "Coming soon") : tool.desc}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

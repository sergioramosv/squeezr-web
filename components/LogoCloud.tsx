"use client";

import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { FiTerminal, FiCode, FiZap, FiBox, FiLayers, FiMonitor } from "react-icons/fi";
import { SiOpenai } from "react-icons/si";
import { ReactNode } from "react";

interface Tool {
  name: string;
  desc: string;
  icon: ReactNode;
  color: string;
  soon?: boolean;
}

const tools: Tool[] = [
  { name: "Claude Code", desc: "Anthropic Messages API", icon: <FiTerminal className="w-5 h-5" />, color: "#ea580c" },
  { name: "OpenAI Codex", desc: "Chat Completions API", icon: <SiOpenai className="w-5 h-5" />, color: "#16a34a" },
  { name: "Aider", desc: "OpenAI-compatible", icon: <FiCode className="w-5 h-5" />, color: "#2563eb" },
  { name: "Gemini CLI", desc: "Google AI API", icon: <FiZap className="w-5 h-5" />, color: "#7c3aed" },
  { name: "Ollama", desc: "Local inference", icon: <FiBox className="w-5 h-5" />, color: "#525252" },
  { name: "LM Studio", desc: "Local inference", icon: <FiLayers className="w-5 h-5" />, color: "#0d9488" },
  { name: "Continue", desc: "VS Code & JetBrains", icon: <FiCode className="w-5 h-5" />, color: "#dc2626" },
  { name: "Cursor IDE", desc: "Coming soon", icon: <FiMonitor className="w-5 h-5" />, color: "#2563eb", soon: true },
];

export function LogoCloud() {
  const { locale } = useI18n();

  return (
    <section className="px-6 py-20 md:py-24 bg-neutral-50 dark:bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-3 block">
              {locale === "es" ? "Compatibilidad" : "Compatibility"}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-3">
              {locale === "es" ? "Funciona con tus herramientas" : "Works with your tools"}
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-md mx-auto">
              {locale === "es"
                ? "Detecta el formato de API automaticamente. Sin configuracion por herramienta."
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
                className={`relative flex flex-col items-center text-center px-4 py-5 rounded-2xl border transition-colors ${
                  tool.soon
                    ? "border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-100/50 dark:bg-neutral-900/30"
                    : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                {tool.soon && (
                  <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider text-orange-600 bg-orange-600/10 px-1.5 py-0.5 rounded">
                    Soon
                  </span>
                )}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${tool.soon ? "opacity-40" : ""}`}
                  style={{ backgroundColor: `${tool.color}12`, color: tool.color }}
                >
                  {tool.icon}
                </div>
                <div className={`text-sm font-semibold mb-0.5 ${tool.soon ? "text-neutral-400 dark:text-neutral-500" : "text-neutral-900 dark:text-white"}`}>
                  {tool.name}
                </div>
                <div className={`text-[11px] ${tool.soon ? "text-orange-600" : "text-neutral-400 dark:text-neutral-500"}`}>
                  {tool.soon
                    ? (locale === "es" ? "Proximamente" : "Coming soon")
                    : tool.desc}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

"use client";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

function useSections() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return [
    {
      title: isEs ? "Primeros pasos" : "Getting Started",
      icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>),
      items: [
        { title: isEs ? "Instalacion" : "Installation", href: "/docs/installation", desc: isEs ? "Instala Squeezr globalmente via npm. Requiere Node.js 18+, soporta Windows/macOS/Linux/WSL." : "Install Squeezr globally via npm. Node.js 18+ required, Windows/macOS/Linux/WSL supported." },
        { title: isEs ? "Guia rapida" : "Quick Start", href: "/docs/quick-start", desc: isEs ? "Dos comandos para empezar: npm install + squeezr setup." : "Two commands to get up and running: npm install + squeezr setup." },
        { title: isEs ? "Configuracion inicial" : "Setup", href: "/docs/setup", desc: isEs ? "Que hace squeezr setup: variables de entorno, wrapper de shell, auto-inicio, confianza de CA." : "What squeezr setup does: env vars, shell wrapper, auto-start, CA trust." },
      ],
    },
    {
      title: isEs ? "Guias por herramienta" : "Tool Guides",
      icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.84-3.37A1.002 1.002 0 015 11V5a1 1 0 011.58-.81l5.84 3.37a1 1 0 010 1.63l-5.84 3.37a1 1 0 01-1.58-.81z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 19h4m-2-2v4" /></svg>),
      items: [
        { title: "Claude Code", href: "/docs/claude-code", desc: isEs ? "Cache de system prompt, dedup de herramientas, presion adaptativa. Funciona automaticamente tras el setup." : "System prompt caching, tool dedup, adaptive pressure. Works automatically after setup." },
        { title: "Codex", href: "/docs/codex", desc: isEs ? "Proxy MITM en puerto 8081, intercepcion TLS. Establece HTTPS_PROXY solo por sesion." : "MITM proxy on port 8081, TLS interception. Set HTTPS_PROXY per-session only." },
        { title: "Aider", href: "/docs/aider", desc: isEs ? "Soporte para modelos Anthropic y OpenAI, compresion de repo map, dedup entre turnos." : "Anthropic and OpenAI model support, repo map compression, cross-turn dedup." },
        { title: "Gemini CLI", href: "/docs/gemini-cli", desc: isEs ? "Funciona automaticamente tras el setup via GEMINI_API_BASE_URL." : "Works automatically after setup via GEMINI_API_BASE_URL." },
        { title: "Ollama & LM Studio", href: "/docs/ollama", desc: isEs ? "Modelos locales como objetivo y backend de compresion. Gratis de extremo a extremo." : "Local models as both target and compression backend. Free end-to-end." },
        { title: "Cursor IDE", href: "/docs/cursor", desc: isEs ? "BYOK + Override Base URL. Modos chat y agente comprimidos. Usa squeezr tunnel si localhost falla." : "BYOK + Override Base URL. Chat and agent modes compressed. Use squeezr tunnel if localhost fails." },
        { title: "Continue Extension", href: "/docs/continue", desc: isEs ? "VS Code y JetBrains. Sin necesidad de tunnel — http://localhost:8080/v1 funciona directamente." : "VS Code and JetBrains. No tunnel needed — http://localhost:8080/v1 works directly." },
        { title: isEs ? "Configuracion" : "Configuration", href: "/docs/configuration", desc: isEs ? "Referencia de squeezr.toml, variables de entorno, sobreescrituras por proyecto con .squeezr.toml." : "squeezr.toml reference, env vars, per-project .squeezr.toml overrides." },
        { title: "Dashboard", href: "/docs/dashboard", desc: isEs ? "Dashboard web integrado: Overview, Projects, History, Limits y Settings en tiempo real." : "Built-in web dashboard: Overview, Projects, History, Limits, and Settings in real time." },
      ],
    },
    {
      title: isEs ? "Como funciona" : "How it Works",
      icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
      items: [
        { title: isEs ? "Pipeline de compresion" : "Compression Pipeline", href: "/docs/compression-pipeline", desc: isEs ? "Pipeline de 3 capas: cache de system prompt, preprocesamiento deterministico, mas de 30 patrones." : "3-layer pipeline: system prompt cache, deterministic preprocessing, 30+ tool patterns." },
        { title: isEs ? "Patrones" : "Patterns", href: "/docs/patterns", desc: isEs ? "Mas de 30 patrones para git, tests, builds, infra, gestores de paquetes y mas." : "30+ patterns for git, tests, builds, infra, package managers, and more." },
        { title: isEs ? "Cache" : "Caching", href: "/docs/caching", desc: isEs ? "Cache LRU en proceso, calentamiento KV, almacen de expansion de sesion." : "In-process LRU cache, KV warming, session expand store." },
      ],
    },
    {
      title: isEs ? "Referencia" : "Reference",
      icon: (<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>),
      items: [
        { title: isEs ? "Comandos CLI" : "CLI Commands", href: "/docs/cli-commands", desc: "setup, start, stop, status, update, logs, config, ports, gain, bypass, tunnel, discover, mcp, uninstall, version." },
        { title: isEs ? "Archivo de configuracion" : "Config File", href: "/docs/config-file", desc: isEs ? "Referencia completa de squeezr.toml con todas las secciones y valores por defecto." : "Complete squeezr.toml reference with all sections and defaults." },
        { title: "API Endpoints", href: "/docs/api-endpoints", desc: isEs ? "Endpoints de salud, estadisticas, expansion, dashboard, limites, proyecto, eventos SSE y tabla de enrutamiento." : "Health, stats, expand, dashboard, limits, project, SSE events, and proxy routing table." },
        { title: "Expand Tool", href: "/docs/expand-tool", desc: isEs ? "Como funciona squeezr_expand() y su mecanismo de recuperacion sin perdidas." : "How squeezr_expand() works and its lossless retrieval mechanism." },
        { title: isEs ? "Servidor MCP" : "MCP Server", href: "/docs/mcp-server", desc: isEs ? "10 herramientas MCP: status, stats, set_mode, config, habits, bypass, stop, check_updates, update, set_project." : "10 MCP tools: status, stats, set_mode, config, habits, bypass, stop, check_updates, update, set_project." },
      ],
    },
  ];
}

export default function DocsIndex() {
  const { locale } = useI18n();
  const isEs = locale === "es";
  const sections = useSections();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-14">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{isEs ? "Documentacion" : "Documentation"}</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl">
          {isEs
            ? "Todo lo que necesitas para instalar, configurar y entender Squeezr."
            : "Everything you need to install, configure, and understand Squeezr."}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                {section.icon}
              </div>
              <h2 className="text-lg font-bold">{section.title}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group glass rounded-2xl p-5 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-600/5 transition-all duration-200"
                >
                  <h3 className="font-semibold text-sm mb-1.5 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{item.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  <div className="mt-3 text-xs text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    {isEs ? "Leer mas" : "Read more"}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Troubleshooting link */}
      <div className="mt-16 glass rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h3 className="font-semibold mb-1">{isEs ? "Tienes problemas?" : "Having issues?"}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isEs
              ? "Consulta la guia de solucion de problemas para problemas comunes y soluciones."
              : "Check the troubleshooting guide for common problems and solutions."}
          </p>
        </div>
        <Link href="/docs/troubleshooting" className="shrink-0 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-medium rounded-xl transition-colors">
          {isEs ? "Solucion de problemas" : "Troubleshooting"}
        </Link>
      </div>
    </div>
  );
}

import Link from "next/link";

interface DocPageProps {
  title: string;
  children: React.ReactNode;
}

const sidebar = [
  {
    label: "Getting Started",
    items: [
      { title: "Installation", href: "/docs/installation" },
      { title: "Setup", href: "/docs/setup" },
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    label: "Guides",
    items: [
      { title: "Claude Code", href: "/docs/claude-code" },
      { title: "Codex", href: "/docs/codex" },
      { title: "Aider", href: "/docs/aider" },
      { title: "Gemini CLI", href: "/docs/gemini-cli" },
      { title: "Ollama", href: "/docs/ollama" },
      { title: "Configuration", href: "/docs/configuration" },
    ],
  },
  {
    label: "How it Works",
    items: [
      { title: "Pipeline", href: "/docs/compression-pipeline" },
      { title: "Patterns", href: "/docs/patterns" },
      { title: "Caching", href: "/docs/caching" },
    ],
  },
  {
    label: "Reference",
    items: [
      { title: "CLI Commands", href: "/docs/cli-commands" },
      { title: "Config File", href: "/docs/config-file" },
      { title: "API Endpoints", href: "/docs/api-endpoints" },
      { title: "Expand Tool", href: "/docs/expand-tool" },
    ],
  },
];

export function DocPage({ title, children }: DocPageProps) {
  return (
    <div className="flex max-w-6xl mx-auto min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="hidden lg:block w-56 shrink-0 py-10 pr-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-slate-200/60 dark:border-white/[0.06]">
        <nav className="space-y-7">
          {sidebar.map((section) => (
            <div key={section.label}>
              <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-2.5 px-3">
                {section.label}
              </div>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block text-[13px] text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 py-1.5 px-3 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-500/5 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pt-4 border-t border-slate-200/60 dark:border-white/[0.06]">
            <Link
              href="/docs/troubleshooting"
              className="block text-[13px] text-slate-500 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 py-1.5 px-3 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-500/5 transition-colors"
            >
              Troubleshooting
            </Link>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <article className="flex-1 min-w-0 px-6 lg:px-10 py-10">
        <Link href="/docs" className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-brand-500 transition-colors mb-6">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          All docs
        </Link>
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        <div className="prose prose-slate dark:prose-invert prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-3 prose-h3:text-lg prose-h3:mt-7 prose-h3:mb-2 prose-code:text-brand-600 dark:prose-code:text-brand-400 prose-code:bg-brand-50 dark:prose-code:bg-brand-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none prose-pre:bg-surface-50 dark:prose-pre:bg-surface-800 prose-pre:border prose-pre:border-slate-200/60 dark:prose-pre:border-white/[0.06] prose-pre:rounded-xl prose-table:text-sm prose-th:text-left prose-th:font-semibold max-w-none">
          {children}
        </div>
      </article>
    </div>
  );
}

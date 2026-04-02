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
    <div className="flex max-w-6xl mx-auto">
      {/* Sidebar */}
      <aside className="hidden lg:block w-56 shrink-0 border-r border-gray-200 dark:border-gray-800 py-8 pr-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <nav className="space-y-6">
          {sidebar.map((section) => (
            <div key={section.label}>
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                {section.label}
              </div>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block text-sm text-gray-600 dark:text-gray-400 hover:text-accent-500 dark:hover:text-accent-400 py-0.5 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <article className="flex-1 min-w-0 px-6 lg:px-10 py-8">
        <h1 className="text-3xl font-bold mb-8">{title}</h1>
        <div className="prose prose-gray dark:prose-invert prose-headings:font-semibold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2 prose-code:text-accent-500 prose-code:bg-gray-100 dark:prose-code:bg-gray-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-800 prose-table:text-sm max-w-none">
          {children}
        </div>
      </article>
    </div>
  );
}

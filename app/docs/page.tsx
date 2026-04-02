import Link from "next/link";

const sections = [
  {
    title: "Getting Started",
    items: [
      { title: "Installation", href: "/docs/installation", desc: "Install Squeezr via npm" },
      { title: "Setup", href: "/docs/setup", desc: "Configure your AI tool" },
      { title: "Quick Start", href: "/docs/quick-start", desc: "Up and running in 30 seconds" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Claude Code", href: "/docs/claude-code", desc: "Using Squeezr with Claude Code" },
      { title: "OpenAI Codex", href: "/docs/codex", desc: "Using Squeezr with Codex CLI" },
      { title: "Aider", href: "/docs/aider", desc: "Using Squeezr with Aider" },
      { title: "Gemini CLI", href: "/docs/gemini-cli", desc: "Using Squeezr with Gemini" },
      { title: "Ollama & LM Studio", href: "/docs/ollama", desc: "Using Squeezr with local models" },
      { title: "Configuration", href: "/docs/configuration", desc: "All TOML config options" },
    ],
  },
  {
    title: "How it Works",
    items: [
      { title: "Compression Pipeline", href: "/docs/compression-pipeline", desc: "The 7-layer pipeline explained" },
      { title: "Patterns", href: "/docs/patterns", desc: "30+ deterministic patterns" },
      { title: "Caching", href: "/docs/caching", desc: "Multi-layer caching system" },
    ],
  },
  {
    title: "Reference",
    items: [
      { title: "CLI Commands", href: "/docs/cli-commands", desc: "All squeezr commands" },
      { title: "Config File", href: "/docs/config-file", desc: "squeezr.toml reference" },
      { title: "API Endpoints", href: "/docs/api-endpoints", desc: "Internal proxy endpoints" },
      { title: "Expand Tool", href: "/docs/expand-tool", desc: "How squeezr_expand works" },
    ],
  },
];

export default function DocsIndex() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Documentation</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10">
        Everything you need to know about Squeezr.
      </p>
      <div className="space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold mb-4 text-accent-500">{section.title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="card py-4 hover:border-accent-500/50"
                >
                  <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const en = {
  nav: {
    docs: "Docs",
    github: "GitHub",
    npm: "npm",
  },
  hero: {
    badge: "v1.21.0 · 240 tests · MIT",
    title1: "Compress your",
    title2: "AI context window",
    desc: "Local proxy that compresses tool outputs, deduplicates file reads, and strips noise.",
    descHighlight: "Save thousands of tokens",
    descEnd: "per session with zero workflow changes.",
    cta: "Get Started",
    stats: {
      patterns: "patterns",
      layers: "compression layers",
      compression: "max compression",
    },
  },
  logoCloud: {
    title: "Works with 8+ AI coding tools",
  },
  compression: {
    label: "Compression Gains",
    title: "See the difference",
    desc: "Real compression results from actual coding sessions. Every byte counts.",
    layers: "Layers",
    patterns: "Patterns",
    saved: "Saved",
    avgCompressed: "avg. compressed",
    items: {
      test: { label: "Test Output", sub: "vitest · 188 tests" },
      file: { label: "File Read", sub: "server.ts · 3200 lines" },
      diff: { label: "Git Diff", sub: "feature branch · 47 files" },
      system: { label: "System Prompt", sub: "Claude Code · 13KB" },
    },
  },
  pipeline: {
    label: "Architecture",
    title: "7-Layer Pipeline",
    desc: "Each request passes through seven independent stages. Each layer catches what the previous one missed.",
    steps: {
      system: { title: "System Prompt", desc: "~13KB → 600 tokens" },
      dedup: { title: "Read Dedup", desc: "Collapse duplicate reads" },
      noise: { title: "Noise Strip", desc: "ANSI, progress bars, spinners" },
      patterns: { title: "Tool Patterns", desc: "30+ specific compressors" },
      lineDedup: { title: "Line Dedup", desc: "Repeated lines & stacks" },
      ai: { title: "AI Compress", desc: "Haiku / GPT-mini / Flash" },
      cache: { title: "Session Cache", desc: "KV cache warming" },
    },
  },
  features: {
    patterns: {
      title: "30+ Patterns",
      desc: "Git diffs, test runners, build tools, Docker, Terraform, package managers — each has a dedicated compressor that knows exactly what to keep.",
      tag: "Deterministic",
    },
    ai: {
      title: "AI Fallback",
      desc: "When no pattern matches, Haiku, GPT-4o-mini, or Gemini Flash compress to under 150 tokens. The best model wins.",
      tag: "Smart",
    },
    dedup: {
      title: "File Dedup",
      desc: "Read the same file 5 times? Only the latest stays full. Earlier reads become lightweight references.",
      tag: "Dedup",
    },
    cache: {
      title: "Session Cache",
      desc: "Identical compressed strings reuse API provider KV cache — up to 90% cost reduction on cache hits.",
      tag: "Cache",
    },
    expand: {
      title: "Expand Tool",
      desc: "The AI can call squeezr_expand() to retrieve any original content. Nothing is permanently lost.",
      tag: "Lossless",
    },
    zero: {
      title: "Zero Config",
      desc: "One install, one command, works immediately. Optional TOML config for fine-grained control.",
      tag: "Simple",
    },
  },
  examples: {
    label: "Real Examples",
    title: "See the compression",
    desc: "Before and after from real coding sessions. Click to toggle.",
    tabs: { test: "Test Output", file: "File Read", diff: "Git Diff" },
    before: "Before",
    after: "After",
    showOriginal: "Show original",
    compressIt: "Compress it",
  },
  howItWorks: {
    label: "How it works",
    title: "Three steps. Thirty seconds.",
    desc: "From install to savings in under a minute. No configuration required.",
    steps: {
      install: { title: "Install & Setup", desc: "One npm install, one setup command. Auto-detects your OS, configures env vars, and starts the daemon." },
      proxy: { title: "Proxy Intercepts", desc: "Your AI tool sends requests through localhost. Squeezr intercepts transparently — no code changes needed." },
      savings: { title: "Savings Begin", desc: "Compressed requests go to the API. Your AI gets all essential info with a fraction of the tokens." },
    },
  },
  calculator: {
    label: "Calculator",
    title: "Estimate your savings",
    desc: "See how much you could save based on your usage.",
    requestsPerSession: "Requests per session",
    avgTokens: "Avg tokens per request",
    provider: "AI Provider",
    tokensSavedSession: "Tokens saved / session",
    tokensSavedMonth: "Tokens saved / month",
    costSavedMonth: "Cost saved / month",
    sessionsNote: "~3 sessions/day × 22 days",
    basedOn: "Based on {provider} input pricing",
  },
  cta: {
    title: "Ready to compress?",
    desc: "Three commands. Thirty seconds. That's it.",
    readDocs: "Read the docs",
    viewGithub: "View on GitHub",
    badges: { mit: "MIT Licensed", zero: "Zero Config", setup: "< 30s Setup" },
  },
  footer: {
    tagline: "AI context window compression. Save thousands of tokens per session.",
    product: "Product",
    documentation: "Documentation",
    installation: "Installation",
    configuration: "Configuration",
    integrations: "Integrations",
    community: "Community",
    copyright: "MIT License · Built for the AI-native developer",
  },
};

export default en;

// Recursive string type — allows any string values to be used
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};
export type Messages = DeepStringify<typeof en>;

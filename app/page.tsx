import Link from "next/link";

const features = [
  { icon: "\u26A1", title: "Deterministic Compression", desc: "30+ tool-specific patterns strip ANSI codes, progress bars, timestamps, and noise \u2014 before any AI is involved." },
  { icon: "\uD83E\uDDE0", title: "AI Fallback", desc: "When patterns aren\u2019t enough, Haiku/GPT-4o-mini/Gemini Flash compresses older blocks to under 150 tokens." },
  { icon: "\uD83D\uDD04", title: "Cross-turn Dedup", desc: "Reading the same file 5 times? Only the latest is kept at full fidelity. Earlier reads become expand refs." },
  { icon: "\uD83D\uDCBE", title: "Multi-layer Caching", desc: "Session cache, compression cache, and KV cache warming \u2014 the same block never gets compressed twice." },
  { icon: "\uD83D\uDD0D", title: "Expand Tool", desc: "The AI can always retrieve the full original via squeezr_expand() \u2014 nothing is permanently lost." },
  { icon: "\u2699\uFE0F", title: "Zero Config", desc: "Works out of the box. One env var, one command. Optional TOML config for power users." },
];

const tools = [
  { name: "Claude Code", icon: "\uD83E\uDD16" },
  { name: "OpenAI Codex", icon: "\uD83D\uDCBB" },
  { name: "Aider", icon: "\uD83D\uDD27" },
  { name: "Gemini CLI", icon: "\u2728" },
  { name: "Ollama", icon: "\uD83E\uDD99" },
  { name: "LM Studio", icon: "\uD83C\uDFED" },
];

const pipeline = [
  { title: "System Prompt Compression", desc: "~13KB \u2192 ~600 tokens" },
  { title: "Cross-turn Read Dedup", desc: "Collapse duplicate file reads" },
  { title: "ANSI / Noise Stripping", desc: "Remove escape codes & progress bars" },
  { title: "Tool-specific Patterns", desc: "30+ patterns for git, tests, builds, infra" },
  { title: "Line Deduplication", desc: "Collapse repeated lines & stack traces" },
  { title: "AI Compression", desc: "Older blocks \u2192 <150 tokens via Haiku/GPT-mini" },
  { title: "Session Caching", desc: "Byte-for-byte identical for KV cache hits" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="text-center px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium rounded-full border border-accent-500/30 text-accent-400 bg-accent-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
            v1.11.1 \u2014 190 tests passing
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Compress your AI context.{" "}
            <span className="gradient-text">Save tokens. Ship faster.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Squeezr is a local proxy that compresses tool outputs, deduplicates file reads,
            and strips noise from your AI coding sessions \u2014 automatically, with zero workflow changes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-accent-500/25 hover:-translate-y-0.5"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
            <a
              href="https://github.com/sergioramosv/Squeezr"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:border-accent-500/50 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
            <div className="w-full flex justify-center mt-2">
              <code className="text-sm text-gray-500 dark:text-gray-500 font-mono bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800">
                npm install -g squeezr-ai
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Why Squeezr?</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-lg mx-auto">
            Your context window fills up fast. Squeezr keeps it clean so your AI stays smart.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="card group">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold mb-2 group-hover:text-accent-500 transition-colors">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Tools */}
      <section className="px-6 py-16 md:py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Works with your tools</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12">
            One proxy, every major AI coding CLI.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map((t) => (
              <div key={t.name} className="card text-center py-5 hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">{t.icon}</div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">7-Layer Compression Pipeline</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12">
            Each request passes through seven stages of compression.
          </p>
          <div className="flex flex-col gap-3">
            {pipeline.map((step, i) => (
              <div key={step.title} className="flex items-center gap-4 card py-4">
                <div className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{step.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Examples */}
      <section className="px-6 py-16 md:py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3">Real Compression Examples</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-12">
            See what Squeezr does to actual tool outputs.
          </p>

          {/* Example 1: vitest */}
          <div className="mb-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">Before \u2014 vitest output (2,340 chars)</div>
            <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-xs overflow-x-auto text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{` \u2713 src/__tests__/config.test.ts (12 tests) 45ms
 \u2713 src/__tests__/cache.test.ts (8 tests) 23ms
 \u2713 src/__tests__/expand.test.ts (15 tests) 67ms
 \u2713 src/__tests__/compressor.test.ts (24 tests) 234ms
 \u2713 src/__tests__/deterministic.test.ts (89 tests) 156ms
 \u2715 src/__tests__/server.test.ts (40 tests | 2 failed) 89ms
   FAIL POST /v1/messages > handles streaming
     AssertionError: expected 500 to be 200
   FAIL GET /squeezr/health > returns version
     Error: Cannot read properties of undefined

 Test Files  1 failed | 5 passed (6)
      Tests  2 failed | 186 passed (188)`}</pre>
            <div className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-2">After \u2014 compressed (198 chars, -92%)</div>
            <pre className="bg-gray-100 dark:bg-gray-900 border border-accent-500/30 rounded-lg p-4 font-mono text-xs overflow-x-auto text-accent-400 leading-relaxed">{`[squeezr:a4c2d1 -92%] 6 suites, 188 tests (2 FAILED):
FAIL server.test.ts:
  - streaming: expected 500 to be 200
  - health/version: Cannot read undefined props
Pass: config(12) cache(8) expand(15) compressor(24) deterministic(89)`}</pre>
          </div>

          {/* Example 2: file read */}
          <div className="mb-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">Before \u2014 file read (3,200 lines)</div>
            <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-xs overflow-x-auto text-gray-600 dark:text-gray-400 mb-4">{`1    import { Hono } from 'hono'
2    import { stream } from 'hono/streaming'
3    import { config } from './config.js'
...
3200 export { app }`}</pre>
            <div className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-2">After \u2014 structure extraction (-97%)</div>
            <pre className="bg-gray-100 dark:bg-gray-900 border border-accent-500/30 rounded-lg p-4 font-mono text-xs overflow-x-auto text-accent-400">{`[squeezr:b7e3f4 -97%] server.ts: 3200 lines. Exports: app (Hono).
Routes: /v1/messages, /v1/chat/completions, /v1beta/models/*`}</pre>
          </div>

          {/* Example 3: git diff */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">Before \u2014 git diff (847 chars)</div>
            <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-xs overflow-x-auto text-gray-600 dark:text-gray-400 mb-4">{`diff --git a/src/server.ts b/src/server.ts
--- a/src/server.ts
+++ b/src/server.ts
@@ -45,12 +45,8 @@ function forwardHeaders(headers)
-  const result = {}
-  for (const [key, value] of headers.entries()) {
-    if (!SKIP_REQ_HEADERS.includes(key)) {
-      result[key] = value
-    }
-  }
-  return result
+  return Object.fromEntries(
+    [...headers.entries()].filter(([k]) =>
+      !SKIP_REQ_HEADERS.includes(k))
+  )`}</pre>
            <div className="text-xs font-semibold uppercase tracking-wider text-green-400 mb-2">After \u2014 compressed (-78%)</div>
            <pre className="bg-gray-100 dark:bg-gray-900 border border-accent-500/30 rounded-lg p-4 font-mono text-xs overflow-x-auto text-accent-400">{`[squeezr:f3a1b2 -78%] src/server.ts: forwardHeaders() refactored
from imperative loop to Object.fromEntries + filter.`}</pre>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Get started in 30 seconds</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10">Three commands. That&apos;s it.</p>
          <div className="text-left space-y-4">
            <div>
              <div className="text-xs font-semibold text-accent-500 mb-1.5">Step 1 \u2014 Install</div>
              <code className="block bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 font-mono text-sm">npm install -g squeezr-ai</code>
            </div>
            <div>
              <div className="text-xs font-semibold text-accent-500 mb-1.5">Step 2 \u2014 Setup</div>
              <code className="block bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 font-mono text-sm">squeezr setup</code>
            </div>
            <div>
              <div className="text-xs font-semibold text-accent-500 mb-1.5">Step 3 \u2014 Use your AI tool normally</div>
              <code className="block bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 font-mono text-sm">claude  <span className="text-gray-400"># Squeezr compresses automatically</span></code>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 px-6 text-center text-sm text-gray-500 dark:text-gray-500">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://github.com/sergioramosv/Squeezr" className="hover:text-accent-500 transition-colors">GitHub</a>
          <a href="https://www.npmjs.com/package/squeezr-ai" className="hover:text-accent-500 transition-colors">npm</a>
          <Link href="/docs" className="hover:text-accent-500 transition-colors">Docs</Link>
        </div>
        <p>MIT License \u00B7 Built by <a href="https://github.com/sergioramosv" className="text-accent-500 hover:underline">Sergio Ramos</a></p>
      </footer>
    </>
  );
}

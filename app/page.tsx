import Link from "next/link";
import { Terminal, TerminalLine } from "@/components/Terminal";
import { WaveDivider, WaveDividerAlt, GradientLine } from "@/components/SectionDivider";

/* ── Data ─────────────────────────────────────────────────────────────── */

const features = [
  {
    num: "01",
    title: "Deterministic Compression",
    desc: "30+ tool-specific patterns strip ANSI codes, progress bars, timestamps, and noise from git diffs, test runners, build tools, and more.",
    color: "from-teal-500 to-teal-600",
    border: "border-teal-500/20 hover:border-teal-500/50",
  },
  {
    num: "02",
    title: "AI Fallback",
    desc: "When patterns aren\u2019t enough, Haiku, GPT-4o-mini, or Gemini Flash compresses older blocks to under 150 tokens.",
    color: "from-indigo-500 to-indigo-600",
    border: "border-indigo-500/20 hover:border-indigo-500/50",
  },
  {
    num: "03",
    title: "Cross-turn Dedup",
    desc: "Reading the same file 5 times? Only the most recent is kept at full fidelity. Earlier reads become compact references.",
    color: "from-cyan-500 to-cyan-600",
    border: "border-cyan-500/20 hover:border-cyan-500/50",
  },
  {
    num: "04",
    title: "Multi-layer Caching",
    desc: "Session cache, compression cache, and KV cache warming ensure the same block is never compressed twice.",
    color: "from-amber-500 to-amber-600",
    border: "border-amber-500/20 hover:border-amber-500/50",
  },
  {
    num: "05",
    title: "Expand Tool",
    desc: "The AI can always retrieve full original content via squeezr_expand(). Nothing is permanently lost.",
    color: "from-teal-500 to-indigo-500",
    border: "border-teal-500/20 hover:border-indigo-500/50",
  },
  {
    num: "06",
    title: "Zero Configuration",
    desc: "Works out of the box with one env var and one command. Optional TOML config for power users who want control.",
    color: "from-slate-400 to-slate-500",
    border: "border-slate-500/20 hover:border-slate-400/50",
  },
];

const tools = [
  { name: "Claude Code", sub: "Anthropic" },
  { name: "OpenAI Codex", sub: "OpenAI" },
  { name: "Aider", sub: "OpenAI" },
  { name: "Gemini CLI", sub: "Google" },
  { name: "Ollama", sub: "Local" },
  { name: "LM Studio", sub: "Local" },
];

const pipeline = [
  { title: "System Prompt", desc: "~13KB \u2192 ~600 tokens", color: "bg-teal-500" },
  { title: "Read Dedup", desc: "Collapse duplicate file reads", color: "bg-teal-600" },
  { title: "Noise Strip", desc: "ANSI codes, progress bars", color: "bg-cyan-600" },
  { title: "Tool Patterns", desc: "30+ specific compressors", color: "bg-indigo-500" },
  { title: "Line Dedup", desc: "Repeated lines & stacks", color: "bg-indigo-600" },
  { title: "AI Compress", desc: "Haiku / GPT-mini / Flash", color: "bg-amber-600" },
  { title: "Session Cache", desc: "KV cache warming", color: "bg-amber-700" },
];

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative mesh-bg dot-grid min-h-[90vh] flex flex-col items-center justify-center px-6 py-20">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-medium rounded-full border border-teal-500/30 text-teal-400 bg-teal-500/5 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-glow-pulse" />
            v1.11.1 &middot; 190 tests passing
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 animate-slide-up">
            Compress your
            <br />
            <span className="gradient-text">AI context window</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Local proxy that transparently compresses tool outputs, deduplicates file reads,
            and strips noise. Save thousands of tokens per session with zero workflow changes.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-slate-500 dark:text-slate-500 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-teal-500" />30+ patterns</span>
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-indigo-500" />7-layer pipeline</span>
            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-amber-500" />6 AI tools</span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-teal-500/20 hover:-translate-y-0.5"
            >
              Get Started
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
            <a
              href="https://github.com/sergioramosv/Squeezr"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:border-teal-500/50 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          </div>

          {/* Terminal */}
          <div className="max-w-lg mx-auto animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Terminal title="~">
              <TerminalLine prompt="$" command="npm install -g squeezr-ai" />
              <TerminalLine prompt="$" command="squeezr setup" />
              <TerminalLine output="\u2713 Environment configured" />
              <TerminalLine output="\u2713 Proxy started on :8080" />
              <TerminalLine output="\u2713 Ready to compress" />
              <div className="mt-2">
                <span className="text-teal-400">$</span>{" "}
                <span className="text-slate-100">claude</span>
                <span className="inline-block w-2 h-4 ml-1 bg-teal-400 animate-cursor-blink" />
              </div>
            </Terminal>
          </div>
        </div>

        {/* Floating blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/3 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      </section>

      <WaveDivider />

      {/* ─── FEATURES ────────────────────────────────────────────────── */}
      <section className="section-alt px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-500 mb-3 block">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Squeezr?</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
              Your context window fills up fast. Squeezr keeps it clean so your AI stays sharp.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
            {features.map((f) => (
              <div
                key={f.num}
                className={`relative bg-white dark:bg-[#12131a] border ${f.border} rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group overflow-hidden`}
              >
                <div className={`inline-block text-[10px] font-bold tracking-wider bg-gradient-to-r ${f.color} bg-clip-text text-transparent mb-4`}>
                  {f.num}
                </div>
                <h3 className="font-semibold text-base mb-2 group-hover:text-teal-500 transition-colors">{f.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDividerAlt />

      {/* ─── TOOLS ───────────────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3 block">Compatibility</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Works with your tools</h2>
            <p className="text-slate-500 dark:text-slate-400">One proxy, every major AI coding CLI.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 stagger">
            {tools.map((t) => (
              <div key={t.name} className="bg-white dark:bg-[#12131a] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-center hover:border-teal-500/40 transition-all hover:shadow-md hover:shadow-teal-500/5 hover:-translate-y-1">
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br from-teal-500/10 to-indigo-500/10 flex items-center justify-center">
                  <span className="text-lg font-bold gradient-text">{t.name[0]}</span>
                </div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GradientLine />

      {/* ─── PIPELINE ────────────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3 block">Architecture</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">7-Layer Pipeline</h2>
            <p className="text-slate-500 dark:text-slate-400">Each request passes through seven stages of compression.</p>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-[19px] top-8 bottom-8 w-px bg-gradient-to-b from-teal-500/50 via-indigo-500/50 to-amber-500/50 hidden sm:block" />
            <div className="flex flex-col gap-4 stagger">
              {pipeline.map((step, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className={`relative z-10 w-10 h-10 rounded-xl ${step.color} flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 bg-white dark:bg-[#12131a] border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-3.5 group-hover:border-teal-500/30 transition-colors">
                    <h4 className="font-semibold text-sm">{step.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* ─── EXAMPLES ────────────────────────────────────────────────── */}
      <section className="section-alt px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-500 mb-3 block">Real examples</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See the compression</h2>
            <p className="text-slate-500 dark:text-slate-400">Actual before/after from real coding sessions.</p>
          </div>

          <div className="space-y-12">
            {/* Example 1: vitest */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Before</span>
                <span className="text-[10px] text-slate-500">vitest output &middot; 2,340 chars</span>
              </div>
              <Terminal title="vitest">
                <div className="text-slate-500 text-xs leading-relaxed">
                  <div className="text-green-400"> {"\u2713"} config.test.ts (12) {"\u2713"} cache.test.ts (8) {"\u2713"} expand.test.ts (15)</div>
                  <div className="text-green-400"> {"\u2713"} compressor.test.ts (24) {"\u2713"} deterministic.test.ts (89)</div>
                  <div className="text-red-400"> {"\u2715"} server.test.ts (40 | 2 failed)</div>
                  <div className="text-red-400 ml-4">FAIL handles streaming &mdash; expected 500 to be 200</div>
                  <div className="text-red-400 ml-4">FAIL returns version &mdash; Cannot read undefined</div>
                  <div className="mt-1 text-slate-600">Test Files 1 failed | 5 passed &middot; Tests 2 failed | 186 passed</div>
                </div>
              </Terminal>
              <div className="flex items-center gap-2 mt-4 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">After</span>
                <span className="text-[10px] text-slate-500">compressed &middot; 198 chars &middot; <span className="text-teal-400 font-semibold">-92%</span></span>
              </div>
              <Terminal title="squeezr output">
                <div className="text-teal-300 text-xs">[squeezr:a4c2d1 -92%] 6 suites, 188 tests (2 FAILED):</div>
                <div className="text-teal-300 text-xs">FAIL server.test.ts: streaming(500!=200), health(undef)</div>
                <div className="text-teal-300 text-xs">Pass: config(12) cache(8) expand(15) compressor(24) det(89)</div>
              </Terminal>
            </div>

            {/* Example 2: file read */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">Before</span>
                <span className="text-[10px] text-slate-500">file read &middot; 3,200 lines</span>
              </div>
              <Terminal title="cat -n server.ts">
                <div className="text-slate-500 text-xs">
                  <div><span className="text-slate-600 mr-3">1</span>import {"{"} Hono {"}"} from &apos;hono&apos;</div>
                  <div><span className="text-slate-600 mr-3">2</span>import {"{"} stream {"}"} from &apos;hono/streaming&apos;</div>
                  <div><span className="text-slate-600 mr-3">3</span>import {"{"} config {"}"} from &apos;./config.js&apos;</div>
                  <div className="text-slate-700">...</div>
                  <div><span className="text-slate-600 mr-2">3200</span>export {"{"} app {"}"}</div>
                </div>
              </Terminal>
              <div className="flex items-center gap-2 mt-4 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">After</span>
                <span className="text-[10px] text-slate-500">structure extraction &middot; <span className="text-teal-400 font-semibold">-97%</span></span>
              </div>
              <Terminal title="squeezr output">
                <div className="text-teal-300 text-xs">[squeezr:b7e3f4 -97%] server.ts: 3200 lines. Exports: app (Hono).</div>
                <div className="text-teal-300 text-xs">Routes: /v1/messages, /v1/chat/completions, /v1beta/models/*</div>
              </Terminal>
            </div>
          </div>
        </div>
      </section>

      <WaveDividerAlt />

      {/* ─── QUICK START ─────────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-3 block">Get started</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Three commands</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-10">That&apos;s all it takes.</p>
          <Terminal title="terminal">
            <TerminalLine prompt="$" command="npm install -g squeezr-ai" />
            <TerminalLine output="" />
            <TerminalLine prompt="$" command="squeezr setup" />
            <TerminalLine output="\u2713 Environment configured" />
            <TerminalLine output="\u2713 Daemon started on :8080" />
            <TerminalLine output="" />
            <TerminalLine prompt="$" command="claude" />
            <TerminalLine output="\u2713 Squeezr compressing automatically" />
            <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-500">
              <span className="text-amber-400">Saved:</span> 34,200 tokens this session &middot; 42% compression
            </div>
          </Terminal>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 40 40" fill="none"><rect width="40" height="40" rx="8" fill="#0d9488"/><path d="M10 12h20v3H10zM12 18h16v2H12zM14 23h12v2H14zM16 28h8v2H16z" fill="white" opacity="0.95"/></svg>
            <span className="font-medium text-slate-700 dark:text-slate-300">Squeezr</span>
            <span className="text-slate-400">&middot; MIT License</span>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/sergioramosv/Squeezr" className="hover:text-teal-500 transition-colors">GitHub</a>
            <a href="https://www.npmjs.com/package/squeezr-ai" className="hover:text-teal-500 transition-colors">npm</a>
            <Link href="/docs" className="hover:text-teal-500 transition-colors">Docs</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

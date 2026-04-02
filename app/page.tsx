import Link from "next/link";
import { Terminal, TerminalLine } from "@/components/Terminal";

/* ═══ DATA ═══════════════════════════════════════════════════════════ */

const features = [
  { icon: "\u26A1", title: "30+ Patterns", desc: "Git diffs, test runners, build tools, Docker, Terraform, package managers \u2014 each has a dedicated compressor.", tag: "Deterministic" },
  { icon: "\uD83E\uDDE0", title: "AI Fallback", desc: "Older blocks are compressed by Haiku, GPT-4o-mini, or Gemini Flash to under 150 tokens.", tag: "Smart" },
  { icon: "\uD83D\uDD04", title: "File Dedup", desc: "Read the same file 5 times? Only the latest stays full. Earlier reads become lightweight references.", tag: "Dedup" },
  { icon: "\uD83D\uDCBE", title: "Session Cache", desc: "Identical compressed strings reuse API provider KV cache \u2014 up to 90% cost reduction on cache hits.", tag: "Cache" },
  { icon: "\uD83D\uDD0D", title: "Expand Tool", desc: "The AI can call squeezr_expand() to retrieve any original content. Nothing is permanently lost.", tag: "Lossless" },
  { icon: "\uD83D\uDE80", title: "Zero Config", desc: "One install, one command, works immediately. Optional TOML config for fine-grained control.", tag: "Simple" },
];

const flow = [
  { n: "01", title: "Install & Setup", desc: "One npm install, one setup command. Auto-detects your OS, sets env vars, registers daemon.", cmd: "npm i -g squeezr-ai && squeezr setup" },
  { n: "02", title: "Proxy Intercepts", desc: "Your AI tool sends requests through localhost:8080. Squeezr intercepts transparently.", cmd: "export ANTHROPIC_BASE_URL=http://localhost:8080" },
  { n: "03", title: "7-Layer Compression", desc: "System prompt, dedup, noise strip, patterns, line dedup, AI compress, session cache.", cmd: "# 7 layers run automatically per request" },
  { n: "04", title: "AI Gets Clean Context", desc: "Compressed request goes to the API. The AI still gets all essential info \u2014 errors, paths, values.", cmd: "# thousands of tokens saved per session" },
];

const tools = [
  { name: "Claude Code", desc: "Anthropic Messages API", letter: "C", gradient: "from-orange-500 to-amber-500" },
  { name: "OpenAI Codex", desc: "Chat Completions API", letter: "X", gradient: "from-emerald-500 to-green-500" },
  { name: "Aider", desc: "OpenAI-compatible", letter: "A", gradient: "from-sky-500 to-blue-500" },
  { name: "Gemini CLI", desc: "Google AI API", letter: "G", gradient: "from-blue-500 to-indigo-500" },
  { name: "Ollama", desc: "Local inference", letter: "O", gradient: "from-slate-500 to-zinc-500" },
  { name: "LM Studio", desc: "Local inference", letter: "L", gradient: "from-purple-500 to-violet-500" },
];

const pipeline = [
  { title: "System Prompt", pct: 95, desc: "~13KB \u2192 600 tokens" },
  { title: "Read Dedup", pct: 80, desc: "Collapse duplicate reads" },
  { title: "Noise Strip", pct: 30, desc: "ANSI, progress bars" },
  { title: "Tool Patterns", pct: 60, desc: "30+ specific compressors" },
  { title: "Line Dedup", pct: 25, desc: "Repeated lines & stacks" },
  { title: "AI Compress", pct: 85, desc: "Haiku / GPT-mini / Flash" },
  { title: "Session Cache", pct: 90, desc: "KV cache warming" },
];

/* ═══ PAGE ═══════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      {/* ══════ HERO ══════ */}
      <section className="sec-hero relative overflow-hidden min-h-screen flex items-center">
        <div className="orb orb-blue w-[600px] h-[600px] top-[-200px] left-[-100px]" />
        <div className="orb orb-indigo w-[500px] h-[500px] bottom-[-150px] right-[-100px]" />
        <div className="orb orb-emerald w-[300px] h-[300px] top-[50%] left-[60%]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-blue-500/20 bg-blue-500/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-blue-300 font-medium">v1.11.1 &middot; 190 tests &middot; MIT</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
                <span className="text-white">Compress your</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">AI context window</span>
              </h1>

              <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
                Local proxy that compresses tool outputs, deduplicates file reads,
                and strips noise. <span className="text-slate-200 font-medium">Save thousands of tokens</span> per session with zero workflow changes.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/docs" className="group px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-blue-600/20 hover:-translate-y-0.5 text-sm flex items-center gap-2">
                  Get Started
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </Link>
                <a href="https://github.com/sergioramosv/Squeezr" className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold rounded-xl transition-all hover:-translate-y-0.5 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                  GitHub
                </a>
              </div>

              <div className="flex gap-8 text-sm">
                <div><span className="text-2xl font-bold text-white">30+</span><br/><span className="text-slate-500 text-xs">patterns</span></div>
                <div><span className="text-2xl font-bold text-white">7</span><br/><span className="text-slate-500 text-xs">compression layers</span></div>
                <div><span className="text-2xl font-bold text-white">6</span><br/><span className="text-slate-500 text-xs">AI tools</span></div>
              </div>
            </div>

            {/* Right: terminal mockup */}
            <div className="hidden lg:block">
              <Terminal title="~ \u2014 zsh">
                <TerminalLine prompt="$" command="npm install -g squeezr-ai" />
                <TerminalLine prompt="$" command="squeezr setup" />
                <TerminalLine output={"\u2713 Environment configured"} />
                <TerminalLine output={"\u2713 Proxy started on :8080"} />
                <TerminalLine output="" />
                <TerminalLine prompt="$" command="claude" />
                <div className="mt-1 text-emerald-400 text-xs">{"\u2713"} Squeezr active</div>
                <div className="mt-3 pt-3 border-t border-white/[0.04] text-[11px] text-slate-600">
                  Session: <span className="text-blue-400">42 req</span> &middot; <span className="text-emerald-400">34K tokens saved</span> &middot; 38%
                </div>
              </Terminal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FEATURES ══════ dark cards grid */}
      <section className="sec-features px-6 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-3 block">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Six layers of intelligence keep your context window clean.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="card-dark p-6 group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl">{f.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 group-hover:text-blue-500/60 transition-colors">{f.tag}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FLOW ══════ numbered steps with code */}
      <section className="sec-tools px-6 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-3 block">How it works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The complete flow</h2>
            <p className="text-slate-400 max-w-lg mx-auto">From install to savings in four steps.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {flow.map((s) => (
              <div key={s.n} className="flow-card group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="step-num">{s.n}</div>
                  <div>
                    <h3 className="font-semibold text-white text-base mb-1">{s.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
                <code className="block text-xs font-mono text-slate-500 bg-black/30 dark:bg-black/40 px-4 py-2.5 rounded-xl border border-white/[0.03]">{s.cmd}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TOOLS ══════ tool cards with colored icons */}
      <section className="sec-pipeline px-6 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3 block">Compatibility</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Works with your tools</h2>
            <p className="text-slate-400">Auto-detects API format from request headers. Zero per-tool config.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map((t) => (
              <div key={t.name} className="card-dark p-5 text-center group">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-lg font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                  {t.letter}
                </div>
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PIPELINE ══════ visual bars */}
      <section className="sec-examples px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 mb-3 block">Architecture</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">7-Layer Pipeline</h2>
            <p className="text-slate-400 max-w-lg mx-auto">Each request passes through seven independent stages of compression.</p>
          </div>
          <div className="grid gap-3">
            {pipeline.map((s, i) => (
              <div key={i} className="card-dark p-5 flex items-center gap-5 group">
                <div className="step-num text-sm">{i + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm text-white">{s.title}</h4>
                    <span className="text-xs font-bold text-blue-400">{s.pct}%</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2.5">{s.desc}</p>
                  <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-700" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ EXAMPLES ══════ side by side terminals */}
      <section className="sec-cta px-6 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-3 block">Real examples</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">See the compression</h2>
            <p className="text-slate-400 max-w-lg mx-auto">Before and after from real coding sessions.</p>
          </div>

          <div className="space-y-8">
            {/* Example 1 */}
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-red-500/10 text-red-400 border border-red-500/20">Before</span>
                  <span className="text-xs text-slate-600">vitest &middot; 2,340 chars</span>
                </div>
                <Terminal title="vitest run">
                  <div className="text-xs leading-loose">
                    <div className="text-emerald-400">{"\u2713"} config (12) cache (8) expand (15)</div>
                    <div className="text-emerald-400">{"\u2713"} compressor (24) deterministic (89)</div>
                    <div className="text-red-400">{"\u2715"} server.test.ts (40 | 2 failed)</div>
                    <div className="text-red-400/60 ml-3">FAIL streaming \u2014 expected 500 to be 200</div>
                    <div className="text-red-400/60 ml-3">FAIL health \u2014 Cannot read undefined</div>
                    <div className="text-slate-700 mt-1">1 failed | 5 passed &middot; 2 failed | 186 passed</div>
                  </div>
                </Terminal>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">After</span>
                  <span className="text-xs text-slate-600">198 chars &middot; <span className="text-emerald-400 font-bold">-92%</span></span>
                </div>
                <Terminal title="compressed">
                  <div className="text-xs leading-loose text-blue-300">
                    <div>[squeezr:a4c2d1 -92%]</div>
                    <div>6 suites, 188 tests (2 FAILED):</div>
                    <div>server.test.ts: streaming(500!=200)</div>
                    <div>health: Cannot read undefined</div>
                    <div className="text-slate-600">Pass: config cache expand compressor det</div>
                  </div>
                </Terminal>
              </div>
            </div>

            {/* Example 2 */}
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-red-500/10 text-red-400 border border-red-500/20">Before</span>
                  <span className="text-xs text-slate-600">file read &middot; 3,200 lines</span>
                </div>
                <Terminal title="cat -n server.ts">
                  <div className="text-xs leading-loose">
                    <div><span className="text-slate-700 select-none mr-2">   1</span>import {"{"} Hono {"}"} from &apos;hono&apos;</div>
                    <div><span className="text-slate-700 select-none mr-2">   2</span>import {"{"} stream {"}"} from &apos;hono/streaming&apos;</div>
                    <div><span className="text-slate-700 select-none mr-2">   3</span>import {"{"} config {"}"} from &apos;./config.js&apos;</div>
                    <div className="text-slate-800 select-none">  ...</div>
                    <div><span className="text-slate-700 select-none mr-2">3200</span>export {"{"} app {"}"}</div>
                  </div>
                </Terminal>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">After</span>
                  <span className="text-xs text-slate-600">84 chars &middot; <span className="text-emerald-400 font-bold">-97%</span></span>
                </div>
                <Terminal title="compressed">
                  <div className="text-xs leading-loose text-blue-300">
                    <div>[squeezr:b7e3f4 -97%]</div>
                    <div>server.ts: 3200 lines</div>
                    <div>Exports: app (Hono)</div>
                    <div>Routes: /v1/messages</div>
                    <div>/v1/chat/completions, /v1beta/models/*</div>
                  </div>
                </Terminal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to compress?</h2>
          <p className="text-slate-400 mb-10 text-lg">Three commands. Thirty seconds. That&apos;s it.</p>
          <div className="max-w-md mx-auto mb-10">
            <Terminal title="terminal">
              <TerminalLine prompt="$" command="npm i -g squeezr-ai" />
              <TerminalLine prompt="$" command="squeezr setup" />
              <TerminalLine prompt="$" command="claude" />
              <div className="mt-2 text-emerald-400 text-xs">{"\u2713"} Compressing automatically</div>
            </Terminal>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/docs/installation" className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-blue-600/20 hover:-translate-y-0.5 text-sm">
              Read the docs
            </Link>
            <a href="https://github.com/sergioramosv/Squeezr" className="px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold rounded-xl transition-all text-sm">
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="border-t border-[#1f1f23] py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 40 40" fill="none"><path d="M6 10h28v4H6zM9 18h22v3H9zM12 25h16v3H12zM16 32h8v2H16z" fill="white" opacity="0.95"/></svg>
            </div>
            <span className="font-medium text-slate-400">Squeezr</span>
            <span>&middot; MIT</span>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com/sergioramosv/Squeezr" className="hover:text-blue-400 transition-colors">GitHub</a>
            <a href="https://www.npmjs.com/package/squeezr-ai" className="hover:text-blue-400 transition-colors">npm</a>
            <Link href="/docs" className="hover:text-blue-400 transition-colors">Docs</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

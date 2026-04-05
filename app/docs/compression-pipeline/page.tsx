import { DocPage } from "@/components/DocPage";

export default function CompressionPipelinePage() {
  return (
    <DocPage title="Compression Pipeline">
      <p>
        Every request from your AI CLI passes through Squeezr on{" "}
        <code>localhost:8080</code>. The proxy applies three compression layers before
        forwarding to the upstream API.
      </p>

      <h2>Pipeline overview</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`Request from coding tool
         |
         v
  +------------------------+
  | Layer 1: System Prompt |  Compress once, cache, reuse every turn
  +------------------------+
         |
         v
  +------------------------+
  | Layer 2: Deterministic |  Zero-latency rule-based transforms
  |    Preprocessing       |  (ANSI, dedup, JSON, noise removal)
  +------------------------+
         |
         v
  +------------------------+
  | Layer 3: Tool-Specific |  30+ patterns for git, tests, builds,
  |    Patterns            |  infra, package managers, and more
  +------------------------+
         |
         v
  Forward to upstream API (streaming, unmodified response)`}</code>
      </pre>

      <h2>Layer 1: System prompt compression</h2>
      <p>
        Claude Code&apos;s system prompt is ~13KB and is sent with every single request.
        Squeezr compresses it once using a cheap AI model (Haiku) and caches the result.
        Every subsequent request reuses the cached version automatically.
      </p>
      <p>
        <strong>Savings:</strong> ~3,000 tokens per request after the first.
      </p>

      <h2>Layer 2: Deterministic preprocessing</h2>
      <p>
        Zero-latency rule-based transforms applied to every tool result. No API calls,
        no latency:
      </p>
      <ul>
        <li>
          <strong>Noise removal</strong> &mdash; ANSI escape codes, progress bars,
          timestamps, spinner output stripped
        </li>
        <li>
          <strong>Deduplication</strong> &mdash; repeated stack frames, duplicate lines,
          redundant git hunks removed
        </li>
        <li>
          <strong>Minification</strong> &mdash; JSON whitespace collapsed, blank lines
          consolidated
        </li>
      </ul>

      <h2>Layer 3: Tool-specific patterns</h2>
      <p>
        Each tool result is matched against 30+ specialized compression rules. Errors,
        warnings, and actionable information are always preserved.
      </p>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Tools</th>
            <th>What it does</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Git</td>
            <td>diff, log, status, branch</td>
            <td>1-line diff context, capped log, compact status</td>
          </tr>
          <tr>
            <td>JS/TS</td>
            <td>vitest, jest, playwright, tsc, eslint, biome, prettier</td>
            <td>Failures/errors only, grouped by file</td>
          </tr>
          <tr>
            <td>Package managers</td>
            <td>pnpm, npm</td>
            <td>Install summary, list capped at 30, outdated only</td>
          </tr>
          <tr>
            <td>Build</td>
            <td>next build, cargo build</td>
            <td>Errors only</td>
          </tr>
          <tr>
            <td>Test</td>
            <td>cargo test, pytest, go test</td>
            <td>FAIL blocks + tracebacks only</td>
          </tr>
          <tr>
            <td>Infra</td>
            <td>terraform, docker, kubectl</td>
            <td>Resource changes, compact tables, last 50 log lines</td>
          </tr>
          <tr>
            <td>Other</td>
            <td>prisma, gh CLI, curl/wget</td>
            <td>Strip ASCII art, cap output, remove verbose headers</td>
          </tr>
        </tbody>
      </table>

      <h2>Exclusive patterns</h2>
      <p>
        Applied to specific content types regardless of which tool produced them:
      </p>
      <ul>
        <li>
          <strong>Lockfiles</strong> (package-lock.json, Cargo.lock, etc.) &rarr; dependency
          count summary
        </li>
        <li>
          <strong>Large code files</strong> (&gt;500 lines) &rarr; imports + function/class
          signatures only
        </li>
        <li>
          <strong>Long output</strong> (&gt;200 lines) &rarr; head + tail + omission note
        </li>
        <li>
          <strong>Grep results</strong> &rarr; grouped by file, matches capped
        </li>
        <li>
          <strong>Glob results</strong> (&gt;30 files) &rarr; directory tree summary
        </li>
        <li>
          <strong>Noisy output</strong> (&gt;50% non-essential) &rarr; auto-extract
          errors/warnings
        </li>
      </ul>

      <h2>Adaptive pressure</h2>
      <p>
        Compression aggressiveness scales automatically with context window usage:
      </p>
      <table>
        <thead>
          <tr>
            <th>Context usage</th>
            <th>Threshold</th>
            <th>Behavior</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&lt; 50%</td>
            <td>1,500 chars</td>
            <td>Light &mdash; only compress large results</td>
          </tr>
          <tr>
            <td>50&ndash;75%</td>
            <td>800 chars</td>
            <td>Normal &mdash; standard compression</td>
          </tr>
          <tr>
            <td>75&ndash;90%</td>
            <td>400 chars</td>
            <td>Aggressive &mdash; compress most results</td>
          </tr>
          <tr>
            <td>&gt; 90%</td>
            <td>150 chars</td>
            <td>Critical &mdash; compress everything, 0 git diff context</td>
          </tr>
        </tbody>
      </table>

      <h2>Session optimizations</h2>
      <ul>
        <li>
          <strong>Session cache</strong> &mdash; after ~50 tool results, older results are
          batch-summarized into a single compact block
        </li>
        <li>
          <strong>KV cache warming</strong> &mdash; deterministic MD5-based IDs keep
          compressed content prefix-stable across requests
        </li>
        <li>
          <strong>Cross-turn dedup</strong> &mdash; if the same file is read multiple times,
          earlier reads are replaced with reference pointers
        </li>
        <li>
          <strong>Expand on demand</strong> &mdash; compressed blocks include a{" "}
          <code>squeezr_expand(id)</code> callback to retrieve full content
        </li>
      </ul>

      <h2>Compression backends</h2>
      <table>
        <thead>
          <tr>
            <th>Backend</th>
            <th>Model</th>
            <th>Used for</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Anthropic</td>
            <td>Haiku</td>
            <td>System prompt, session cache</td>
            <td>~$0.0001/call</td>
          </tr>
          <tr>
            <td>OpenAI</td>
            <td>GPT-4o-mini</td>
            <td>Fallback compression</td>
            <td>~$0.0001/call</td>
          </tr>
          <tr>
            <td>Gemini</td>
            <td>Flash-8B</td>
            <td>Fallback compression</td>
            <td>Free</td>
          </tr>
          <tr>
            <td>Local</td>
            <td>qwen2.5-coder:1.5b</td>
            <td>Compression when using Ollama</td>
            <td>Free</td>
          </tr>
        </tbody>
      </table>
    </DocPage>
  );
}

import { DocPage } from "@/components/DocPage";

export default function ClaudeCodePage() {
  return (
    <DocPage title="Claude Code">
      <p>
        Claude Code is the primary target for Squeezr. Because it sends large tool results
        (file reads, shell output, search results) in every turn, it benefits the most from
        compression &mdash; typically saving 50&ndash;70% of input tokens per session.
      </p>

      <h2>Setup</h2>
      <p>
        Run <code>squeezr setup</code> once. It automatically sets{" "}
        <code>ANTHROPIC_BASE_URL=http://localhost:8080</code> in your environment.
        No manual configuration needed.
      </p>
      <p>
        Then start the proxy:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup   # one-time
squeezr start`}</code>
      </pre>
      <p>
        Claude Code reads <code>ANTHROPIC_BASE_URL</code> automatically and routes all API calls
        through the proxy. Your existing <code>ANTHROPIC_API_KEY</code> or OAuth token continues
        to work &mdash; Squeezr forwards it to the Anthropic API transparently.
      </p>

      <h3>OAuth support</h3>
      <p>
        Claude Max, Team, and Enterprise plans authenticate via OAuth tokens instead of API keys.
        Squeezr detects and forwards OAuth tokens transparently. No additional configuration is
        needed.
      </p>

      <h2>How it works with Claude Code</h2>

      <h3>Layer 1: System prompt compression</h3>
      <p>
        Claude Code&apos;s system prompt is ~13KB and is sent with every request. Squeezr compresses
        it once using a cheap AI model (Haiku) and caches the result. Every subsequent request
        reuses the cached version, saving ~3,000 tokens per request.
      </p>

      <h3>Layer 2: Deterministic preprocessing</h3>
      <p>
        Zero-latency rule-based transforms applied to every tool result before anything else:
      </p>
      <ul>
        <li>ANSI escape codes and progress bars stripped</li>
        <li>Duplicate stack frames and repeated lines deduplicated</li>
        <li>JSON whitespace collapsed</li>
        <li>Blank lines consolidated</li>
      </ul>

      <h3>Layer 3: Tool-specific patterns</h3>
      <p>
        Each tool result is matched against 30+ specialized patterns. Errors and actionable
        information are always preserved:
      </p>
      <table>
        <thead>
          <tr>
            <th>Tool</th>
            <th>Compression strategy</th>
            <th>Typical savings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Read</code></td>
            <td>Cross-turn dedup, large file &rarr; signatures only</td>
            <td>40&ndash;90%</td>
          </tr>
          <tr>
            <td><code>Bash</code></td>
            <td>Pattern matching (git, test, build)</td>
            <td>50&ndash;80%</td>
          </tr>
          <tr>
            <td><code>Grep</code></td>
            <td>Grouped by file, matches capped</td>
            <td>30&ndash;60%</td>
          </tr>
          <tr>
            <td><code>Glob</code></td>
            <td>Directory tree summary (&gt;30 files)</td>
            <td>30&ndash;50%</td>
          </tr>
          <tr>
            <td><code>WebFetch</code></td>
            <td>AI summarization</td>
            <td>60&ndash;80%</td>
          </tr>
        </tbody>
      </table>

      <h3>Cross-turn file read deduplication</h3>
      <p>
        When Claude Code reads the same file multiple times in a conversation, Squeezr detects
        the duplication and replaces repeated reads with a compact reference pointer. This alone
        can save thousands of tokens in long sessions.
      </p>

      <h3>Adaptive pressure</h3>
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

      <h2>Per-command skip</h2>
      <p>
        Add <code># squeezr:skip</code> anywhere in a Bash command to bypass compression for
        that specific result:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`cat important-file.txt  # squeezr:skip`}</code>
      </pre>

      <h2>Configuration tips</h2>
      <ul>
        <li>
          <strong>Skip specific tools:</strong>
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
skip_tools = ["Read"]`}</code>
          </pre>
        </li>
        <li>
          <strong>Only compress specific tools:</strong>
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
only_tools = ["Bash"]`}</code>
          </pre>
        </li>
        <li>
          <strong>Raise the threshold</strong> to compress less (fewer false positives):
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
threshold = 1500`}</code>
          </pre>
        </li>
      </ul>

      <h2>Verifying it works</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr status`}</code>
      </pre>
      <p>
        After a few interactions, you should see a positive savings percentage. Check the{" "}
        <a href="/docs/troubleshooting">troubleshooting guide</a> if you see 502 errors or
        the proxy is not intercepting requests.
      </p>
    </DocPage>
  );
}

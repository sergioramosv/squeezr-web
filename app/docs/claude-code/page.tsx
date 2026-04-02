import { DocPage } from "@/components/DocPage";

export default function ClaudeCodePage() {
  return (
    <DocPage title="Claude Code">
      <p>
        Claude Code is the primary target for Squeezr. Because Claude Code
        sends large tool results (file reads, shell output, search results) in
        every turn, it benefits the most from compression &mdash; typically
        saving 50&ndash;70% of input tokens.
      </p>

      <h2>Setup</h2>
      <p>
        Set the <code>ANTHROPIC_BASE_URL</code> environment variable so Claude
        Code sends requests through the Squeezr proxy:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`export ANTHROPIC_BASE_URL=http://localhost:8080/anthropic`}</code>
      </pre>
      <p>
        Add this to your shell profile (<code>~/.bashrc</code>,{" "}
        <code>~/.zshrc</code>) so it persists. Your existing{" "}
        <code>ANTHROPIC_API_KEY</code> continues to work &mdash; Squeezr
        forwards it to the Anthropic API.
      </p>

      <h3>OAuth support</h3>
      <p>
        If you use Claude Code with OAuth authentication (Claude Max/Team/Enterprise),
        Squeezr detects and forwards OAuth tokens transparently. No additional
        configuration is needed.
      </p>

      <h3>API key support</h3>
      <p>
        Both <code>x-api-key</code> header and <code>ANTHROPIC_API_KEY</code>{" "}
        environment variable are supported. Squeezr never stores or logs your
        API key.
      </p>

      <h2>How it works with Claude Code</h2>
      <p>
        Squeezr performs several optimizations specifically designed for the
        Anthropic Messages API format used by Claude Code:
      </p>

      <h3>Tool result compression</h3>
      <p>
        Claude Code uses tools like <code>Read</code>, <code>Bash</code>,{" "}
        <code>Grep</code>, and <code>Glob</code> that return large text blocks.
        Squeezr compresses these tool results using pattern-specific strategies:
      </p>
      <ul>
        <li>
          <strong>File reads</strong> are deduplicated across turns &mdash; if
          the same file was read earlier in the conversation and hasn&apos;t changed,
          the content is replaced with a short reference.
        </li>
        <li>
          <strong>Shell output</strong> (git diffs, test results, build logs)
          is matched against 30+ patterns and compressed using domain-specific
          rules that preserve errors and actionable information.
        </li>
        <li>
          <strong>Search results</strong> from Grep and Glob are compacted by
          removing redundant path prefixes and grouping results.
        </li>
      </ul>

      <h3>Cross-turn file read deduplication</h3>
      <p>
        When Claude Code reads the same file multiple times in a conversation,
        Squeezr detects the duplication and replaces repeated reads with a
        compact reference: <code>[file already in context: path/to/file.ts]</code>.
        This alone can save thousands of tokens in long sessions.
      </p>

      <h3>Expand tool injection</h3>
      <p>
        Squeezr injects a <code>squeezr_expand</code> tool definition into
        each request. If Claude needs the full uncompressed content of a
        compressed block, it can call this tool with the block&apos;s ID. The
        original content is served from an in-memory store. This ensures zero
        information loss.
      </p>

      <h3>System prompt optimization</h3>
      <p>
        Claude Code&apos;s system prompt is large and repeated in every request.
        Squeezr caches it and replaces repeated instances with a hash reference,
        saving tokens on every turn after the first.
      </p>

      <h2>Supported tools</h2>
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
            <td>Cross-turn dedup, line dedup</td>
            <td>40&ndash;90%</td>
          </tr>
          <tr>
            <td><code>Bash</code></td>
            <td>Pattern matching (git, test, build)</td>
            <td>50&ndash;80%</td>
          </tr>
          <tr>
            <td><code>Grep</code></td>
            <td>Path prefix dedup, result grouping</td>
            <td>30&ndash;60%</td>
          </tr>
          <tr>
            <td><code>Glob</code></td>
            <td>Path prefix dedup</td>
            <td>30&ndash;50%</td>
          </tr>
          <tr>
            <td><code>WebFetch</code></td>
            <td>AI summarization</td>
            <td>60&ndash;80%</td>
          </tr>
          <tr>
            <td><code>NotebookEdit</code></td>
            <td>Output truncation</td>
            <td>40&ndash;70%</td>
          </tr>
        </tbody>
      </table>

      <h2>Configuration tips</h2>
      <ul>
        <li>
          <strong>Aggressive mode for large repos</strong> &mdash; If you work
          with large monorepos, increase the compression aggressiveness:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
aggressiveness = "high"
min_size = 200`}</code>
          </pre>
        </li>
        <li>
          <strong>Skip specific tools</strong> &mdash; If you never want to
          compress results from a specific tool:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
skip_tools = ["WebFetch"]`}</code>
          </pre>
        </li>
        <li>
          <strong>Adaptive thresholds</strong> &mdash; Squeezr automatically
          adjusts compression based on conversation length. Long conversations
          get more aggressive compression.
        </li>
      </ul>

      <h2>Verifying it works</h2>
      <p>
        After a few interactions with Claude Code, check the proxy stats:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`curl http://localhost:8080/squeezr/stats`}</code>
      </pre>
      <p>
        You should see a positive <code>savings</code> percentage. If
        savings are below 20%, check the{" "}
        <a href="/docs/troubleshooting">troubleshooting guide</a>.
      </p>
    </DocPage>
  );
}

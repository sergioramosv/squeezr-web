import { DocPage } from "@/components/DocPage";

export default function ConfigurationPage() {
  return (
    <DocPage title="Configuration">
      <p>
        Squeezr is configured via TOML files. The global config lives next to the binary and is
        deep-merged with an optional per-project config.
      </p>

      <h2>Config file locations</h2>

      <h3>Global config: <code>squeezr.toml</code></h3>
      <p>
        Located next to the installed binary (in the npm global prefix). Created automatically
        with defaults on first run. Use <code>squeezr config</code> to see its resolved path and
        current values.
      </p>

      <h3>Project config: <code>.squeezr.toml</code></h3>
      <p>
        Place this in your project root. Settings here are deep-merged over the global config.
        Useful for per-repo compression tuning (e.g. more aggressive compression for large
        monorepos, or skipping specific tools).
      </p>

      <h2>Full configuration reference</h2>

      <h3>[proxy]</h3>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[proxy]
port = 8080        # HTTP proxy port (Claude Code, Aider, Gemini CLI)
mitm_port = 8081   # MITM proxy port (Codex) — defaults to port + 1`}</code>
      </pre>

      <h3>[compression]</h3>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[compression]
threshold = 800              # min chars to trigger compression
keep_recent = 3              # last N tool results left uncompressed
compress_system_prompt = true
compress_conversation = false  # compress assistant messages too (aggressive)
# skip_tools = ["Read"]        # never compress these tools
# only_tools = ["Bash"]        # only compress these tools`}</code>
      </pre>

      <h3>[cache]</h3>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[cache]
enabled = true
max_entries = 1000`}</code>
      </pre>

      <h3>[adaptive]</h3>
      <p>
        Adaptive pressure scales compression aggressiveness with context window usage.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[adaptive]
enabled = true
low_threshold = 1500      # < 50% context: only compress results > 1500 chars
mid_threshold = 800       # 50–75% context: standard compression
high_threshold = 400      # 75–90% context: aggressive
critical_threshold = 150  # > 90% context: compress everything`}</code>
      </pre>

      <h3>[local]</h3>
      <p>
        Configure a local model for compression (used when your coding tool is Ollama, or as a
        fallback compression backend).
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[local]
enabled = true
upstream_url = "http://localhost:11434"
compression_model = "qwen2.5-coder:1.5b"`}</code>
      </pre>

      <h2>Environment variable overrides</h2>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>SQUEEZR_PORT</code></td>
            <td><code>8080</code></td>
            <td>HTTP proxy port</td>
          </tr>
          <tr>
            <td><code>SQUEEZR_MITM_PORT</code></td>
            <td><code>8081</code></td>
            <td>MITM proxy port (Codex)</td>
          </tr>
          <tr>
            <td><code>SQUEEZR_THRESHOLD</code></td>
            <td><code>800</code></td>
            <td>Min chars to compress</td>
          </tr>
          <tr>
            <td><code>SQUEEZR_KEEP_RECENT</code></td>
            <td><code>3</code></td>
            <td>Recent results to skip compression</td>
          </tr>
          <tr>
            <td><code>SQUEEZR_DISABLED</code></td>
            <td><code>false</code></td>
            <td>Disable all compression</td>
          </tr>
          <tr>
            <td><code>SQUEEZR_DRY_RUN</code></td>
            <td><code>false</code></td>
            <td>Log savings without compressing</td>
          </tr>
          <tr>
            <td><code>SQUEEZR_LOCAL_UPSTREAM</code></td>
            <td><code>http://localhost:11434</code></td>
            <td>Ollama/LM Studio URL</td>
          </tr>
          <tr>
            <td><code>SQUEEZR_LOCAL_MODEL</code></td>
            <td><code>qwen2.5-coder:1.5b</code></td>
            <td>Local compression model</td>
          </tr>
        </tbody>
      </table>

      <h2>Per-command skip</h2>
      <p>
        Add <code># squeezr:skip</code> anywhere in a Bash command to bypass compression for
        that specific result:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`cat my-file.json  # squeezr:skip`}</code>
      </pre>

      <h2>Example: project config</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# .squeezr.toml — in your project root

[compression]
threshold = 400           # more aggressive for this large monorepo
compress_conversation = true
skip_tools = ["WebFetch"] # never compress web fetches in this project

[adaptive]
critical_threshold = 100  # push harder when context is nearly full`}</code>
      </pre>
    </DocPage>
  );
}

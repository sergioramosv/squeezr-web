import { DocPage } from "@/components/DocPage";

export default function ConfigFilePage() {
  return (
    <DocPage title="Config File Reference">
      <p>
        Squeezr uses TOML for configuration. This page is the complete reference for every key in
        the config file, organized by section.
      </p>

      <h2>File locations</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Global config — next to the installed binary (in npm global prefix)
squeezr.toml

# Project config — deep-merged over global, apply per-repo overrides
.squeezr.toml   (in your project root)`}</code>
      </pre>
      <p>
        Use <code>squeezr config</code> to print the resolved path and current values.
      </p>

      <h2>[proxy]</h2>
      <p>Controls the proxy server ports.</p>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>port</code></td>
            <td>integer</td>
            <td><code>8080</code></td>
            <td>HTTP proxy port (Claude Code, Aider, Gemini CLI).</td>
          </tr>
          <tr>
            <td><code>mitm_port</code></td>
            <td>integer</td>
            <td><code>8081</code></td>
            <td>MITM proxy port (Codex). Defaults to port + 1.</td>
          </tr>
        </tbody>
      </table>

      <h2>[compression]</h2>
      <p>Controls how and when content is compressed.</p>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>threshold</code></td>
            <td>integer</td>
            <td><code>800</code></td>
            <td>Minimum content size (chars) to trigger compression.</td>
          </tr>
          <tr>
            <td><code>keep_recent</code></td>
            <td>integer</td>
            <td><code>3</code></td>
            <td>Last N tool results to leave uncompressed.</td>
          </tr>
          <tr>
            <td><code>compress_system_prompt</code></td>
            <td>boolean</td>
            <td><code>true</code></td>
            <td>Compress and cache the system prompt.</td>
          </tr>
          <tr>
            <td><code>compress_conversation</code></td>
            <td>boolean</td>
            <td><code>false</code></td>
            <td>Also compress assistant messages (aggressive mode).</td>
          </tr>
          <tr>
            <td><code>skip_tools</code></td>
            <td>array</td>
            <td><code>[]</code></td>
            <td>Tool names to never compress (e.g. <code>[&quot;Read&quot;]</code>).</td>
          </tr>
          <tr>
            <td><code>only_tools</code></td>
            <td>array</td>
            <td><code>[]</code></td>
            <td>Only compress these tools, skip all others (e.g. <code>[&quot;Bash&quot;]</code>).</td>
          </tr>
        </tbody>
      </table>

      <h2>[cache]</h2>
      <p>Controls in-process caching of compressed results.</p>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>enabled</code></td>
            <td>boolean</td>
            <td><code>true</code></td>
            <td>Enable the cache.</td>
          </tr>
          <tr>
            <td><code>max_entries</code></td>
            <td>integer</td>
            <td><code>1000</code></td>
            <td>Maximum number of cached compressed results.</td>
          </tr>
        </tbody>
      </table>

      <h2>[adaptive]</h2>
      <p>
        Adaptive pressure automatically increases compression aggressiveness as the context
        window fills up.
      </p>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>enabled</code></td>
            <td>boolean</td>
            <td><code>true</code></td>
            <td>Enable adaptive compression.</td>
          </tr>
          <tr>
            <td><code>low_threshold</code></td>
            <td>integer</td>
            <td><code>1500</code></td>
            <td>Min chars to compress when context is below 50%.</td>
          </tr>
          <tr>
            <td><code>mid_threshold</code></td>
            <td>integer</td>
            <td><code>800</code></td>
            <td>Min chars to compress when context is 50&ndash;75%.</td>
          </tr>
          <tr>
            <td><code>high_threshold</code></td>
            <td>integer</td>
            <td><code>400</code></td>
            <td>Min chars to compress when context is 75&ndash;90%.</td>
          </tr>
          <tr>
            <td><code>critical_threshold</code></td>
            <td>integer</td>
            <td><code>150</code></td>
            <td>Min chars to compress when context exceeds 90%. Git diff context set to 0.</td>
          </tr>
        </tbody>
      </table>

      <h2>[local]</h2>
      <p>Configuration for local model servers (Ollama) used as the compression backend.</p>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>enabled</code></td>
            <td>boolean</td>
            <td><code>true</code></td>
            <td>Enable local model support.</td>
          </tr>
          <tr>
            <td><code>upstream_url</code></td>
            <td>string</td>
            <td><code>&quot;http://localhost:11434&quot;</code></td>
            <td>URL of the local model server.</td>
          </tr>
          <tr>
            <td><code>compression_model</code></td>
            <td>string</td>
            <td><code>&quot;qwen2.5-coder:1.5b&quot;</code></td>
            <td>Local model to use for AI compression.</td>
          </tr>
        </tbody>
      </table>

      <h2>Full example</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# squeezr.toml

[proxy]
port = 8080
mitm_port = 8081

[compression]
threshold = 800
keep_recent = 3
compress_system_prompt = true
compress_conversation = false
# skip_tools = ["Read"]
# only_tools = ["Bash"]

[cache]
enabled = true
max_entries = 1000

[adaptive]
enabled = true
low_threshold = 1500
mid_threshold = 800
high_threshold = 400
critical_threshold = 150

[local]
enabled = true
upstream_url = "http://localhost:11434"
compression_model = "qwen2.5-coder:1.5b"`}</code>
      </pre>
    </DocPage>
  );
}

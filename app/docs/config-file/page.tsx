import { DocPage } from "@/components/DocPage";

export default function ConfigFilePage() {
  return (
    <DocPage title="Config File Reference">
      <p>
        Squeezr uses TOML for configuration. This page is the complete
        reference for every key in the config file, organized by section.
      </p>

      <h2>File location</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Global (applies everywhere)
~/.config/squeezr/config.toml

# Project-level (overrides global for this directory)
.squeezr/config.toml`}</code>
      </pre>

      <h2>[proxy]</h2>
      <p>Controls the proxy server.</p>
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
            <td>Port the proxy listens on.</td>
          </tr>
          <tr>
            <td><code>bind</code></td>
            <td>string</td>
            <td><code>&quot;127.0.0.1&quot;</code></td>
            <td>Bind address. Use <code>&quot;0.0.0.0&quot;</code> for all interfaces.</td>
          </tr>
          <tr>
            <td><code>timeout</code></td>
            <td>integer</td>
            <td><code>120000</code></td>
            <td>Request timeout in milliseconds.</td>
          </tr>
          <tr>
            <td><code>debug</code></td>
            <td>boolean</td>
            <td><code>false</code></td>
            <td>Enable verbose debug logging.</td>
          </tr>
        </tbody>
      </table>

      <h2>[compression]</h2>
      <p>Controls how content is compressed.</p>
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
            <td><code>aggressiveness</code></td>
            <td>string</td>
            <td><code>&quot;medium&quot;</code></td>
            <td>Compression level: <code>&quot;low&quot;</code>, <code>&quot;medium&quot;</code>, or <code>&quot;high&quot;</code>.</td>
          </tr>
          <tr>
            <td><code>min_size</code></td>
            <td>integer</td>
            <td><code>500</code></td>
            <td>Minimum content size (chars) to trigger compression.</td>
          </tr>
          <tr>
            <td><code>max_output</code></td>
            <td>integer</td>
            <td><code>2000</code></td>
            <td>Maximum size of compressed output (chars).</td>
          </tr>
          <tr>
            <td><code>skip_tools</code></td>
            <td>array</td>
            <td><code>[]</code></td>
            <td>Tool names to never compress.</td>
          </tr>
          <tr>
            <td><code>ai_compression</code></td>
            <td>boolean</td>
            <td><code>true</code></td>
            <td>Enable AI-powered compression for unrecognized patterns.</td>
          </tr>
          <tr>
            <td><code>ai_model</code></td>
            <td>string</td>
            <td><code>&quot;claude-3-haiku-20240307&quot;</code></td>
            <td>Model used for AI compression.</td>
          </tr>
          <tr>
            <td><code>ai_max_input</code></td>
            <td>integer</td>
            <td><code>50000</code></td>
            <td>Maximum input size (chars) for AI compression.</td>
          </tr>
        </tbody>
      </table>

      <h2>[cache]</h2>
      <p>Controls the disk-based compression cache.</p>
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
            <td>Enable the disk cache.</td>
          </tr>
          <tr>
            <td><code>dir</code></td>
            <td>string</td>
            <td><code>&quot;~/.cache/squeezr&quot;</code></td>
            <td>Cache directory path.</td>
          </tr>
          <tr>
            <td><code>max_size_mb</code></td>
            <td>integer</td>
            <td><code>500</code></td>
            <td>Maximum cache size in megabytes.</td>
          </tr>
          <tr>
            <td><code>ttl</code></td>
            <td>integer</td>
            <td><code>86400</code></td>
            <td>Time-to-live for cache entries in seconds.</td>
          </tr>
          <tr>
            <td><code>eviction</code></td>
            <td>string</td>
            <td><code>&quot;lru&quot;</code></td>
            <td>Eviction strategy. Currently only <code>&quot;lru&quot;</code> is supported.</td>
          </tr>
        </tbody>
      </table>

      <h2>[adaptive]</h2>
      <p>Controls adaptive compression that scales with conversation length.</p>
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
            <td><code>threshold_low</code></td>
            <td>integer</td>
            <td><code>50000</code></td>
            <td>Token count below which base aggressiveness is used.</td>
          </tr>
          <tr>
            <td><code>threshold_high</code></td>
            <td>integer</td>
            <td><code>150000</code></td>
            <td>Token count above which maximum compression is applied.</td>
          </tr>
          <tr>
            <td><code>reduction_factor</code></td>
            <td>float</td>
            <td><code>0.7</code></td>
            <td>Factor to reduce output size at each threshold step.</td>
          </tr>
        </tbody>
      </table>

      <h2>[local]</h2>
      <p>Configuration for local model servers.</p>
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
            <td><code>upstream</code></td>
            <td>string</td>
            <td><code>&quot;&quot;</code></td>
            <td>URL of the local model server (e.g., Ollama).</td>
          </tr>
          <tr>
            <td><code>detect_local_key</code></td>
            <td>boolean</td>
            <td><code>true</code></td>
            <td>Skip API key validation for local upstreams.</td>
          </tr>
          <tr>
            <td><code>model</code></td>
            <td>string</td>
            <td><code>&quot;&quot;</code></td>
            <td>Model name override (optional).</td>
          </tr>
        </tbody>
      </table>

      <h2>Full example</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# ~/.config/squeezr/config.toml

[proxy]
port = 8080
bind = "127.0.0.1"
timeout = 120000
debug = false

[compression]
aggressiveness = "medium"
min_size = 500
max_output = 2000
skip_tools = []
ai_compression = true
ai_model = "claude-3-haiku-20240307"
ai_max_input = 50000

[cache]
enabled = true
dir = "~/.cache/squeezr"
max_size_mb = 500
ttl = 86400
eviction = "lru"

[adaptive]
enabled = true
threshold_low = 50000
threshold_high = 150000
reduction_factor = 0.7

[local]
upstream = "http://localhost:11434"
detect_local_key = true`}</code>
      </pre>
    </DocPage>
  );
}

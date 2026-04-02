import { DocPage } from "@/components/DocPage";

export default function ConfigurationPage() {
  return (
    <DocPage title="Configuration">
      <p>
        Squeezr is configured via TOML files. The configuration system supports
        global defaults, project-level overrides, and environment variable
        fallbacks.
      </p>

      <h2>Config file locations</h2>
      <p>Squeezr looks for config files in this order (later overrides earlier):</p>

      <h3>Global config</h3>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`~/.config/squeezr/config.toml`}</code>
      </pre>
      <p>
        This is the default config created by <code>squeezr setup</code>. It
        applies to all projects unless overridden.
      </p>

      <h3>Project config</h3>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`.squeezr/config.toml`}</code>
      </pre>
      <p>
        Place this in your project root. Settings here override the global
        config for that project directory. Useful for per-repo compression
        tuning.
      </p>

      <h2>Full configuration reference</h2>

      <h3>[proxy]</h3>
      <p>Controls the proxy server itself.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[proxy]
# Port the proxy listens on
port = 8080

# Bind address (0.0.0.0 for all interfaces)
bind = "127.0.0.1"

# Request timeout in milliseconds
timeout = 120000

# Enable debug logging
debug = false`}</code>
      </pre>

      <h3>[compression]</h3>
      <p>Controls how content is compressed.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[compression]
# Overall aggressiveness: "low", "medium", "high"
aggressiveness = "medium"

# Minimum content size (chars) to trigger compression
min_size = 500

# Maximum compressed output size (chars)
max_output = 2000

# Tools to skip (never compress their results)
skip_tools = []

# Enable AI-powered compression for unrecognized patterns
ai_compression = true

# Model to use for AI compression (small + fast)
ai_model = "claude-3-haiku-20240307"

# Maximum input size for AI compression (chars)
ai_max_input = 50000`}</code>
      </pre>

      <h3>[cache]</h3>
      <p>Controls caching behavior.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[cache]
# Enable disk-based compression cache
enabled = true

# Cache directory
dir = "~/.cache/squeezr"

# Maximum cache size in MB
max_size_mb = 500

# Cache entry TTL in seconds (default: 24h)
ttl = 86400

# LRU eviction when cache exceeds max_size_mb
eviction = "lru"`}</code>
      </pre>

      <h3>[adaptive]</h3>
      <p>
        Controls adaptive compression that adjusts based on conversation length.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[adaptive]
# Enable adaptive compression
enabled = true

# Token count thresholds for increasing aggressiveness
# Below low: use base aggressiveness
# Between low and high: increase by one level
# Above high: maximum compression
threshold_low = 50000
threshold_high = 150000

# Factor by which to reduce output size at each threshold
reduction_factor = 0.7`}</code>
      </pre>

      <h3>[local]</h3>
      <p>Configuration for local model servers (Ollama, LM Studio, etc.).</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[local]
# Upstream URL for local model server
upstream = "http://localhost:11434"

# Skip API key validation for local upstreams
detect_local_key = true

# Model name override (optional)
# model = "llama3.1:70b"`}</code>
      </pre>

      <h2>Environment variable overrides</h2>
      <p>
        Every config key can be overridden with an environment variable using
        the pattern <code>SQUEEZR_SECTION_KEY</code>:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Override proxy port
SQUEEZR_PROXY_PORT=9090

# Override compression aggressiveness
SQUEEZR_COMPRESSION_AGGRESSIVENESS=high

# Override cache directory
SQUEEZR_CACHE_DIR=/tmp/squeezr-cache

# Disable adaptive compression
SQUEEZR_ADAPTIVE_ENABLED=false`}</code>
      </pre>

      <h2>Per-tool skip directive</h2>
      <p>
        You can exclude specific tools from compression entirely. This is
        useful if a particular tool&apos;s output must never be modified:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[compression]
skip_tools = ["WebFetch", "mcp__my-server__sensitive_tool"]`}</code>
      </pre>
      <p>
        Tool names must match exactly as they appear in the API request. For
        MCP tools, use the full qualified name.
      </p>

      <h2>Example: full config</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# ~/.config/squeezr/config.toml

[proxy]
port = 8080
bind = "127.0.0.1"
debug = false

[compression]
aggressiveness = "medium"
min_size = 500
ai_compression = true

[cache]
enabled = true
max_size_mb = 500

[adaptive]
enabled = true
threshold_low = 50000
threshold_high = 150000

[local]
upstream = "http://localhost:11434"
detect_local_key = true`}</code>
      </pre>
    </DocPage>
  );
}

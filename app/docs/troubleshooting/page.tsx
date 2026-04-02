import { DocPage } from "@/components/DocPage";

export default function TroubleshootingPage() {
  return (
    <DocPage title="Troubleshooting">
      <p>
        Common issues and their solutions. If your problem isn&apos;t listed
        here, check the logs with <code>squeezr logs --follow</code> or open
        an issue on GitHub.
      </p>

      <h2>Proxy not running</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>Your coding tool reports a connection error or timeout.</li>
        <li><code>squeezr status</code> shows &quot;not running&quot;.</li>
        <li><code>curl http://localhost:8080/squeezr/health</code> fails.</li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>
          Start the proxy: <code>squeezr start</code>.
        </li>
        <li>
          If it fails to start, check logs:{" "}
          <code>squeezr start --foreground</code> to see errors in the
          terminal.
        </li>
        <li>
          Verify Node.js version: <code>node --version</code> (must be 18+).
        </li>
        <li>
          Check for stale PID file:{" "}
          <code>rm ~/.config/squeezr/squeezr.pid</code> then retry.
        </li>
      </ol>

      <h2>Port conflicts</h2>
      <h3>Symptoms</h3>
      <ul>
        <li><code>Error: listen EADDRINUSE: address already in use :::8080</code></li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>
          Check what is using the port:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`# Linux/macOS
lsof -i :8080

# Or
ss -tlnp | grep 8080`}</code>
          </pre>
        </li>
        <li>
          Kill the existing process or use a different port:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`# Use different port
squeezr start --port 9090

# Or in config.toml
# [proxy]
# port = 9090`}</code>
          </pre>
        </li>
        <li>
          If a previous Squeezr instance is stuck:{" "}
          <code>squeezr stop</code> then <code>squeezr start</code>.
        </li>
      </ol>

      <h2>WSL2 issues</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>Proxy starts in WSL2 but tools running on Windows can&apos;t connect.</li>
        <li>Intermittent connection resets.</li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>
          <strong>Use localhost from within WSL2</strong> &mdash; If your
          coding tool runs inside WSL2, use <code>localhost:8080</code> as
          normal.
        </li>
        <li>
          <strong>Access from Windows host</strong> &mdash; WSL2 has its own
          IP. From Windows, use the WSL2 IP address:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`# Get WSL2 IP from inside WSL
hostname -I

# Use in Windows environment variable
set ANTHROPIC_BASE_URL=http://172.x.x.x:8080/anthropic`}</code>
          </pre>
        </li>
        <li>
          <strong>Bind to all interfaces</strong> &mdash; If you need cross-network access:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[proxy]
bind = "0.0.0.0"`}</code>
          </pre>
        </li>
        <li>
          <strong>Windows firewall</strong> &mdash; Ensure the WSL2 port is
          not blocked by Windows Defender Firewall.
        </li>
      </ol>

      <h2>Memory usage</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>Proxy process using unexpectedly high memory.</li>
        <li>System becomes slow during long coding sessions.</li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>
          <strong>Expand store growth</strong> &mdash; The expand store holds
          original content in memory. In very long sessions with many
          compressed blocks, this can grow large. Restart the proxy to clear
          it: <code>squeezr stop &amp;&amp; squeezr start</code>.
        </li>
        <li>
          <strong>Reduce disk cache size</strong> &mdash; If the disk cache
          is too large:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[cache]
max_size_mb = 100`}</code>
          </pre>
        </li>
        <li>
          <strong>Disable AI compression</strong> &mdash; AI compression uses
          additional memory for the model client. If memory is tight:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
ai_compression = false`}</code>
          </pre>
        </li>
      </ol>

      <h2>Compression too aggressive</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>The model asks to re-read files it should have in context.</li>
        <li>The model frequently calls <code>squeezr_expand</code>.</li>
        <li>The model misses errors or important details in compressed output.</li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>
          Lower the aggressiveness:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
aggressiveness = "low"`}</code>
          </pre>
        </li>
        <li>
          Increase the minimum size threshold (compress less):
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
min_size = 2000`}</code>
          </pre>
        </li>
        <li>
          Disable adaptive compression to prevent automatic escalation:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[adaptive]
enabled = false`}</code>
          </pre>
        </li>
        <li>
          Skip specific tools that are causing problems:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
skip_tools = ["Read"]`}</code>
          </pre>
        </li>
      </ol>

      <h2>Compression not enough</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>Token savings are below 20%.</li>
        <li>You are hitting context window limits in long conversations.</li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>
          Increase aggressiveness:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
aggressiveness = "high"
min_size = 200`}</code>
          </pre>
        </li>
        <li>
          Enable adaptive compression with lower thresholds:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[adaptive]
enabled = true
threshold_low = 30000
threshold_high = 80000`}</code>
          </pre>
        </li>
        <li>
          Ensure AI compression is enabled:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
ai_compression = true`}</code>
          </pre>
        </li>
      </ol>

      <h2>Debug mode</h2>
      <p>
        Enable debug mode to see exactly what Squeezr is doing with each
        request:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Via CLI
squeezr start --debug

# Via config
[proxy]
debug = true

# Via environment variable
SQUEEZR_PROXY_DEBUG=true squeezr start`}</code>
      </pre>
      <p>
        In debug mode, logs include:
      </p>
      <ul>
        <li>Full request and response headers.</li>
        <li>Content size before and after each compression layer.</li>
        <li>Pattern matches and compression ratios.</li>
        <li>Cache hits and misses.</li>
        <li>Expand tool calls and resolutions.</li>
      </ul>
      <p>
        View debug logs with:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr logs --follow`}</code>
      </pre>

      <h2>API key detection issues</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>401 Unauthorized errors from the upstream API.</li>
        <li>Proxy logs show &quot;No API key found in request&quot;.</li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>
          Verify your API key environment variable is set:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`# Anthropic
echo $ANTHROPIC_API_KEY

# OpenAI
echo $OPENAI_API_KEY

# Gemini
echo $GEMINI_API_KEY`}</code>
          </pre>
        </li>
        <li>
          Ensure the key is set in the same shell session where you run your
          coding tool.
        </li>
        <li>
          For local models, enable local key detection:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[local]
detect_local_key = true`}</code>
          </pre>
        </li>
        <li>
          Check that your <code>*_BASE_URL</code> includes the correct route
          prefix (<code>/anthropic</code>, <code>/openai</code>, or{" "}
          <code>/gemini</code>).
        </li>
      </ol>

      <h2>Getting help</h2>
      <p>
        If none of the above solutions work:
      </p>
      <ol>
        <li>
          Run <code>squeezr start --foreground --debug</code> and reproduce the
          issue.
        </li>
        <li>
          Copy the relevant log output.
        </li>
        <li>
          Open an issue on{" "}
          <a href="https://github.com/nicobailon/squeezr" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{" "}
          with the log output, your config (with API keys removed), and a
          description of the problem.
        </li>
      </ol>
    </DocPage>
  );
}

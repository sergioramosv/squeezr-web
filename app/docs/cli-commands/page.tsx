import { DocPage } from "@/components/DocPage";

export default function CliCommandsPage() {
  return (
    <DocPage title="CLI Commands">
      <p>
        The Squeezr CLI manages the proxy lifecycle. All commands are available
        after installing with <code>npm install -g squeezr-ai</code>.
      </p>

      <h2>squeezr setup</h2>
      <p>
        Interactive wizard that detects your installed coding tools and
        generates the configuration file.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup`}</code>
      </pre>
      <p>This command will:</p>
      <ul>
        <li>Detect installed tools (Claude Code, Codex, Aider, Gemini CLI, Ollama).</li>
        <li>Prompt for API keys (optional &mdash; keys can be set via env vars).</li>
        <li>Write <code>~/.config/squeezr/config.toml</code>.</li>
        <li>Print environment variable export lines for your shell profile.</li>
      </ul>
      <p>
        Run <code>squeezr setup</code> again at any time to reconfigure. It
        will preserve your existing settings and only update what you change.
      </p>

      <h2>squeezr start</h2>
      <p>
        Starts the proxy as a background daemon.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr start

# With custom port
squeezr start --port 9090

# Foreground mode (for debugging)
squeezr start --foreground

# With debug logging
squeezr start --debug`}</code>
      </pre>
      <p>
        The proxy runs as a detached process. Its PID is stored in{" "}
        <code>~/.config/squeezr/squeezr.pid</code>.
      </p>

      <h2>squeezr stop</h2>
      <p>
        Stops the running proxy daemon.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr stop`}</code>
      </pre>
      <p>
        This sends a graceful shutdown signal. In-flight requests are allowed
        to complete before the process exits. The session cache and expand
        store are cleared.
      </p>

      <h2>squeezr status</h2>
      <p>
        Shows the current state of the proxy.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr status`}</code>
      </pre>
      <p>Example output:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`Squeezr proxy
  Status:     running
  Port:       8080
  PID:        12345
  Uptime:     2h 15m
  Requests:   142
  Savings:    63.2%

Routes:
  /anthropic  -> https://api.anthropic.com
  /openai     -> https://api.openai.com
  /gemini     -> https://generativelanguage.googleapis.com

Config:
  Global:   ~/.config/squeezr/config.toml
  Project:  (none)`}</code>
      </pre>

      <h2>squeezr logs</h2>
      <p>
        Shows the proxy logs. Useful for debugging connection issues.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Show recent logs
squeezr logs

# Follow logs in real-time
squeezr logs --follow

# Show last N lines
squeezr logs --lines 50`}</code>
      </pre>
      <p>
        Logs are stored in <code>~/.config/squeezr/squeezr.log</code>. In
        debug mode (<code>--debug</code> or <code>[proxy] debug = true</code>),
        logs include full request/response details.
      </p>

      <h2>squeezr --version</h2>
      <p>
        Prints the installed version.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr --version
# squeezr v1.2.0`}</code>
      </pre>

      <h2>Command summary</h2>
      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>squeezr setup</code></td>
            <td>Interactive configuration wizard</td>
          </tr>
          <tr>
            <td><code>squeezr start</code></td>
            <td>Start the proxy daemon</td>
          </tr>
          <tr>
            <td><code>squeezr stop</code></td>
            <td>Stop the proxy daemon</td>
          </tr>
          <tr>
            <td><code>squeezr status</code></td>
            <td>Show proxy status and stats</td>
          </tr>
          <tr>
            <td><code>squeezr logs</code></td>
            <td>View proxy logs</td>
          </tr>
          <tr>
            <td><code>squeezr --version</code></td>
            <td>Print version</td>
          </tr>
          <tr>
            <td><code>squeezr --help</code></td>
            <td>Show help</td>
          </tr>
        </tbody>
      </table>
    </DocPage>
  );
}

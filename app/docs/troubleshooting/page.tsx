import { DocPage } from "@/components/DocPage";

export default function TroubleshootingPage() {
  return (
    <DocPage title="Troubleshooting">
      <p>
        Common issues and their solutions. Check logs first with{" "}
        <code>squeezr logs</code>, then look for your issue below.
      </p>

      <h2>502 errors / Claude Code can&apos;t reach the API</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>Claude Code reports a 502 Bad Gateway or connection error.</li>
        <li>The proxy is running but requests fail.</li>
      </ul>
      <h3>Most likely cause: HTTPS_PROXY set globally</h3>
      <p>
        If <code>HTTPS_PROXY</code> is set in your global environment (e.g. via{" "}
        <code>setx</code> on Windows or in your shell profile), it routes <strong>all</strong>{" "}
        HTTPS traffic &mdash; including Claude Code &mdash; through the MITM proxy on port 8081,
        which is only designed for Codex WebSocket traffic. This will cause 502s for Claude Code.
      </p>
      <p>
        Fix: remove <code>HTTPS_PROXY</code> from your global environment. Only set it
        per-session in the terminal where you run Codex:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Windows — remove the global registry entry
reg delete HKCU\Environment /v HTTPS_PROXY /f

# Then set only when running Codex
$env:HTTPS_PROXY = "http://localhost:8081"
codex`}</code>
      </pre>

      <h2>Proxy not running</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>Your coding tool reports a connection error or timeout.</li>
        <li><code>squeezr status</code> shows &quot;not running&quot;.</li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>Start the proxy: <code>squeezr start</code></li>
        <li>
          Verify Node.js version: <code>node --version</code> (must be 18+; Node.js 24 is
          supported).
        </li>
        <li>
          Check logs for errors: <code>squeezr logs</code>
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
          Stop any existing Squeezr process: <code>squeezr stop</code>, then{" "}
          <code>squeezr start</code>.
        </li>
        <li>
          Change the port interactively: <code>squeezr ports</code>
        </li>
        <li>
          Or edit <code>squeezr.toml</code>:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[proxy]
port = 9090
mitm_port = 9091`}</code>
          </pre>
        </li>
      </ol>

      <h2>Env vars not applying after setup/update</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>After <code>squeezr setup</code> or <code>squeezr update</code>, the old{" "}
        <code>ANTHROPIC_BASE_URL</code> is still active.</li>
        <li>Claude Code goes directly to the Anthropic API, bypassing Squeezr.</li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>
          <strong>Open a new terminal.</strong> The shell wrapper installed by{" "}
          <code>squeezr setup</code> auto-refreshes env vars, but only after the wrapper is
          loaded. If you just ran setup for the first time, open a new terminal once to activate it.
        </li>
        <li>
          Or source your shell profile manually:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`# bash/zsh
source ~/.bashrc

# PowerShell
. $PROFILE`}</code>
          </pre>
        </li>
      </ol>

      <h2>Stale &quot;update available&quot; banner after squeezr update</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>
          After running <code>squeezr update</code>, the proxy still shows the old version or
          the update banner keeps appearing.
        </li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>
          Run <code>squeezr stop</code> then <code>squeezr start</code> to ensure the new
          binary is running.
        </li>
        <li>
          If problems persist, do a clean reinstall:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`squeezr uninstall
npm uninstall -g squeezr-ai
npm install -g squeezr-ai
squeezr setup
squeezr start`}</code>
          </pre>
        </li>
      </ol>

      <h2>Codex TLS certificate errors</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>Codex reports a certificate error when connecting to chatgpt.com.</li>
        <li>TLS handshake failure in Codex logs.</li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>
          Re-run setup to reinstall the CA certificate:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`squeezr setup`}</code>
          </pre>
        </li>
        <li>
          On Windows, the CA is imported into the Windows Certificate Store. Restart Codex after
          setup if the certificate was just installed.
        </li>
        <li>
          On macOS/Linux/WSL, verify <code>NODE_EXTRA_CA_CERTS</code> points to the bundle:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`echo $NODE_EXTRA_CA_CERTS
# should print ~/.squeezr/mitm-ca/bundle.crt`}</code>
          </pre>
        </li>
      </ol>

      <h2>Node.js v24 compatibility</h2>
      <p>
        Squeezr is fully compatible with Node.js v24. If you see{" "}
        <code>UND_ERR_NOT_SUPPORTED</code> errors with older versions of Squeezr, update to the
        latest version:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr update`}</code>
      </pre>

      <h2>Compression too aggressive</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>The model asks to re-read files it should have in context.</li>
        <li>The model misses errors or important details in compressed output.</li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>
          Raise the compression threshold (compress less):
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
threshold = 1500`}</code>
          </pre>
        </li>
        <li>
          Skip specific tools:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
skip_tools = ["Read"]`}</code>
          </pre>
        </li>
        <li>
          Disable adaptive compression:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[adaptive]
enabled = false`}</code>
          </pre>
        </li>
        <li>
          Skip compression for a single command by adding <code># squeezr:skip</code> to the
          Bash command.
        </li>
      </ol>

      <h2>Getting help</h2>
      <p>
        If none of the above solutions work:
      </p>
      <ol>
        <li>Run <code>squeezr logs</code> and copy the relevant output.</li>
        <li>Check your env vars: <code>echo $ANTHROPIC_BASE_URL</code></li>
        <li>
          Open an issue on{" "}
          <a href="https://github.com/sergioramosv/Squeezr" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{" "}
          with the log output, your config (with API keys removed), and a description of the
          problem.
        </li>
      </ol>
    </DocPage>
  );
}

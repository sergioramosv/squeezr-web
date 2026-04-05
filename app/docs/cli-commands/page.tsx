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
        One-time setup that configures everything automatically: env vars, shell wrapper,
        auto-start, and TLS certificates. Run once after installation.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup`}</code>
      </pre>
      <p>What it does:</p>
      <ul>
        <li>Sets <code>ANTHROPIC_BASE_URL</code> and <code>GEMINI_API_BASE_URL</code> in your user environment.</li>
        <li>Installs a shell wrapper in PowerShell <code>$PROFILE</code> (Windows) or <code>~/.bashrc</code> / <code>~/.zshrc</code> (Linux/macOS/WSL) that auto-refreshes env vars without restarting the terminal.</li>
        <li>Registers auto-start (Task Scheduler on Windows, systemd on Linux, launchd on macOS).</li>
        <li>Generates and installs the MITM CA certificate for Codex support.</li>
      </ul>

      <h2>squeezr start</h2>
      <p>Starts the proxy as a background daemon.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr start`}</code>
      </pre>
      <p>
        Starts both the HTTP proxy (port 8080) and the MITM proxy (port 8081). If a version
        mismatch is detected after an update, it restarts automatically with the correct binary.
      </p>

      <h2>squeezr stop</h2>
      <p>Stops the running proxy daemon.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr stop`}</code>
      </pre>

      <h2>squeezr status</h2>
      <p>Shows whether the proxy is running, on which ports, and the PID.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr status`}</code>
      </pre>

      <h2>squeezr update</h2>
      <p>
        Kills the running proxy, installs the latest version from npm, and restarts automatically.
        Also runs setup to refresh env vars and shell wrappers.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr update`}</code>
      </pre>

      <h2>squeezr logs</h2>
      <p>Shows the last 50 log lines.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr logs`}</code>
      </pre>

      <h2>squeezr config</h2>
      <p>Prints the current resolved configuration.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr config`}</code>
      </pre>

      <h2>squeezr ports</h2>
      <p>Interactive prompt to change the HTTP proxy port and MITM proxy port. Updates env vars automatically.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr ports`}</code>
      </pre>

      <h2>squeezr gain</h2>
      <p>Estimates token savings for a directory by analysing the files in it.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr gain`}</code>
      </pre>

      <h2>squeezr discover</h2>
      <p>Detects which AI CLIs are installed on your system.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr discover`}</code>
      </pre>

      <h2>squeezr uninstall</h2>
      <p>
        Removes everything Squeezr installed: env vars, CA certificates, auto-start entries,
        and log files. Run <code>npm uninstall -g squeezr-ai</code> afterwards to remove the
        package.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr uninstall`}</code>
      </pre>

      <h2>squeezr version</h2>
      <p>Prints the installed version.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr version`}</code>
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
            <td>Configure env vars, shell wrapper, auto-start, CA trust</td>
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
            <td>Show proxy status</td>
          </tr>
          <tr>
            <td><code>squeezr update</code></td>
            <td>Update to latest version and restart</td>
          </tr>
          <tr>
            <td><code>squeezr logs</code></td>
            <td>Show last 50 log lines</td>
          </tr>
          <tr>
            <td><code>squeezr config</code></td>
            <td>Print current configuration</td>
          </tr>
          <tr>
            <td><code>squeezr ports</code></td>
            <td>Change HTTP and MITM proxy ports</td>
          </tr>
          <tr>
            <td><code>squeezr gain</code></td>
            <td>Estimate token savings for a directory</td>
          </tr>
          <tr>
            <td><code>squeezr discover</code></td>
            <td>Detect installed AI CLIs</td>
          </tr>
          <tr>
            <td><code>squeezr uninstall</code></td>
            <td>Remove Squeezr completely</td>
          </tr>
          <tr>
            <td><code>squeezr version</code></td>
            <td>Print version</td>
          </tr>
        </tbody>
      </table>
    </DocPage>
  );
}

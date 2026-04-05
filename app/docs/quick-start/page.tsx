import { DocPage } from "@/components/DocPage";

export default function QuickStartPage() {
  return (
    <DocPage title="Quick Start">
      <p>
        Get Squeezr running in under two minutes. Two commands and you&apos;re done.
      </p>

      <h2>Step 1: Install</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`npm install -g squeezr-ai`}</code>
      </pre>

      <h2>Step 2: Run setup</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup`}</code>
      </pre>
      <p>
        That&apos;s it. <code>squeezr setup</code> handles everything automatically:
      </p>
      <ul>
        <li>Sets <code>ANTHROPIC_BASE_URL</code> and <code>GEMINI_API_BASE_URL</code> to point at the proxy.</li>
        <li>Installs a shell wrapper in your PowerShell profile (Windows) or <code>~/.bashrc</code> / <code>~/.zshrc</code> (Linux/macOS/WSL) so env vars refresh automatically after each <code>squeezr</code> command &mdash; no need to restart your terminal.</li>
        <li>Registers auto-start so the proxy comes back up after a reboot (Task Scheduler on Windows, systemd on Linux, launchd on macOS).</li>
        <li>Imports the MITM CA certificate so Codex trusts the proxy&apos;s TLS (Windows Certificate Store on Windows; <code>~/.squeezr/mitm-ca/bundle.crt</code> on macOS/Linux/WSL).</li>
      </ul>

      <h2>Step 3: Start the proxy</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr start`}</code>
      </pre>
      <p>
        Use your coding tool exactly as before &mdash; Squeezr compresses transparently.
      </p>

      <h2>What happens behind the scenes</h2>
      <p>
        Every request passes through a three-layer compression pipeline:
      </p>
      <ol>
        <li>
          <strong>System prompt compression</strong> &mdash; Claude Code&apos;s ~13KB system prompt is
          compressed once and cached. Subsequent requests reuse the cached version, saving ~3,000
          tokens per request.
        </li>
        <li>
          <strong>Deterministic preprocessing</strong> &mdash; Zero-latency rule-based transforms:
          ANSI escape codes stripped, repeated stack frames deduplicated, JSON whitespace collapsed,
          progress bars removed.
        </li>
        <li>
          <strong>Tool-specific patterns</strong> &mdash; 30+ rules matched against git, test
          runners, build output, package managers, infra tools, and more. Errors and actionable
          information are always preserved.
        </li>
      </ol>

      <h2>Typical savings</h2>
      <ul>
        <li><strong>Per tool result:</strong> 70&ndash;95% reduction depending on tool</li>
        <li><strong>Per session (2 hours):</strong> ~200K tokens &rarr; ~80K tokens (60% savings)</li>
        <li><strong>System prompt:</strong> ~13KB &rarr; ~600 tokens (cached)</li>
      </ul>

      <h2>Next steps</h2>
      <ul>
        <li>
          Read the guide for your specific tool:{" "}
          <a href="/docs/claude-code">Claude Code</a>,{" "}
          <a href="/docs/codex">Codex</a>,{" "}
          <a href="/docs/aider">Aider</a>,{" "}
          <a href="/docs/gemini-cli">Gemini CLI</a>,{" "}
          <a href="/docs/ollama">Ollama</a>.
        </li>
        <li>
          Learn how the{" "}
          <a href="/docs/compression-pipeline">compression pipeline</a> works.
        </li>
        <li>
          Explore the full{" "}
          <a href="/docs/configuration">configuration reference</a>.
        </li>
      </ul>
    </DocPage>
  );
}

import { DocPage } from "@/components/DocPage";

export default function SetupPage() {
  return (
    <DocPage title="Setup">
      <p>
        Run <code>squeezr setup</code> once after installation. It configures
        everything automatically &mdash; env vars, shell wrapper, auto-start, and TLS certificates.
        You don&apos;t need to edit shell profiles or set environment variables manually.
      </p>

      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup
squeezr start`}</code>
      </pre>

      <p>
        That&apos;s all that is required for Claude Code, Aider, Gemini CLI, and Ollama.
        Codex requires one additional per-session step described below.
      </p>

      <h2>What setup does</h2>

      <h3>Environment variables</h3>
      <p>
        Sets the following vars in your user environment (Windows registry / macOS/Linux{" "}
        <code>~/.bashrc</code> or <code>~/.zshrc</code>):
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`ANTHROPIC_BASE_URL=http://localhost:8080
GEMINI_API_BASE_URL=http://localhost:8080`}</code>
      </pre>
      <p>
        Your existing API keys are not touched. Squeezr forwards them to the upstream API
        automatically.
      </p>

      <h3>Shell wrapper</h3>
      <p>
        Because child processes cannot modify the parent shell&apos;s environment, setup installs a
        persistent wrapper function so env vars refresh in the current terminal without restarting it:
      </p>
      <ul>
        <li>
          <strong>Windows:</strong> function added to PowerShell <code>$PROFILE</code>
        </li>
        <li>
          <strong>Linux / macOS / WSL:</strong> function added to <code>~/.bashrc</code> or{" "}
          <code>~/.zshrc</code>
        </li>
      </ul>
      <p>
        After setup runs, open a new terminal once (or source your profile) and the wrapper will
        be active in all future sessions.
      </p>

      <h3>Auto-start</h3>
      <p>
        Registers Squeezr to start automatically after a reboot:
      </p>
      <ul>
        <li><strong>Windows:</strong> Task Scheduler or NSSM</li>
        <li><strong>Linux:</strong> systemd user service</li>
        <li><strong>macOS:</strong> launchd agent</li>
      </ul>

      <h3>TLS certificates (for Codex MITM)</h3>
      <ul>
        <li>
          <strong>Windows:</strong> imports the MITM CA into the Windows Certificate Store at
          user level (no admin required)
        </li>
        <li>
          <strong>macOS/Linux/WSL:</strong> generates a CA bundle at{" "}
          <code>~/.squeezr/mitm-ca/bundle.crt</code> and sets <code>NODE_EXTRA_CA_CERTS</code>
        </li>
      </ul>

      <h2>Tool-specific notes</h2>

      <h3>Claude Code</h3>
      <p>
        Works automatically after setup. Claude Code reads <code>ANTHROPIC_BASE_URL</code> and
        routes all API calls through the proxy. No further configuration needed.
      </p>

      <h3>Aider</h3>
      <p>
        Set <code>ANTHROPIC_BASE_URL</code> (already done by setup) for Anthropic models, or
        configure <code>openai_base_url</code> in your <code>.aider.conf.yml</code> for OpenAI
        models:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# .aider.conf.yml
openai_base_url: http://localhost:8080`}</code>
      </pre>

      <h3>Gemini CLI</h3>
      <p>
        Works automatically after setup. Gemini CLI reads <code>GEMINI_API_BASE_URL</code>.
      </p>

      <h3>Ollama</h3>
      <p>
        Squeezr detects Ollama automatically when it sees a dummy API key (e.g.{" "}
        <code>ollama</code>) or a local upstream URL. No extra configuration needed if you
        are using Ollama with a tool that already targets the proxy.
      </p>
      <p>
        To use a local model for compression itself, configure in <code>squeezr.toml</code>:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[local]
enabled = true
upstream_url = "http://localhost:11434"
compression_model = "qwen2.5-coder:1.5b"`}</code>
      </pre>

      <h3>Codex</h3>
      <p>
        Codex uses WebSocket over TLS to <code>chatgpt.com</code> and cannot be proxied via a
        simple base URL override. Squeezr runs a TLS-terminating MITM proxy on port 8081.
      </p>
      <p>
        Set <code>HTTPS_PROXY</code> <strong>only in the terminal session where you run Codex</strong>
        &mdash; do not set it globally as it will break other tools:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Run this in the terminal where you launch Codex — not globally
HTTPS_PROXY=http://localhost:8081 codex`}</code>
      </pre>
      <p>
        See the <a href="/docs/codex">Codex guide</a> for the full technical breakdown.
      </p>

      <h2>Changing ports</h2>
      <p>
        To change the HTTP proxy port (default 8080) or the MITM proxy port (default 8081):
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr ports`}</code>
      </pre>
      <p>
        Or edit <code>squeezr.toml</code> directly:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[proxy]
port = 9090
mitm_port = 9091`}</code>
      </pre>

      <h2>Verify the connection</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr status`}</code>
      </pre>
    </DocPage>
  );
}

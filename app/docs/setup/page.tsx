import { DocPage } from "@/components/DocPage";

export default function SetupPage() {
  return (
    <DocPage title="Setup">
      <p>
        Once Squeezr is installed, you need to start the proxy and point your
        coding tools at it. This page covers both steps for every supported
        tool.
      </p>

      <h2>1. Start the proxy</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr start`}</code>
      </pre>
      <p>
        By default the proxy listens on <code>http://localhost:8080</code>. You
        can change the port in your config file or via the{" "}
        <code>SQUEEZR_PORT</code> environment variable.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Custom port
SQUEEZR_PORT=9090 squeezr start

# Or in config.toml
# [proxy]
# port = 9090`}</code>
      </pre>

      <h2>2. Configure your coding tool</h2>
      <p>
        Each tool needs to send its API requests through the Squeezr proxy
        instead of directly to the provider. Below is the configuration for
        every supported tool.
      </p>

      <h3>Claude Code</h3>
      <p>
        Set the <code>ANTHROPIC_BASE_URL</code> environment variable to point
        at the proxy:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`export ANTHROPIC_BASE_URL=http://localhost:8080/anthropic`}</code>
      </pre>
      <p>
        Add this to your shell profile (<code>~/.bashrc</code>,{" "}
        <code>~/.zshrc</code>, etc.) so it persists across sessions. Squeezr
        forwards your existing <code>ANTHROPIC_API_KEY</code> automatically.
      </p>

      <h3>Codex (OpenAI CLI)</h3>
      <p>
        Point Codex at the OpenAI-compatible proxy endpoint:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`export OPENAI_BASE_URL=http://localhost:8080/openai`}</code>
      </pre>
      <p>
        Your <code>OPENAI_API_KEY</code> is forwarded automatically. Works
        with any OpenAI chat completions-compatible endpoint.
      </p>

      <h3>Aider</h3>
      <p>Use the <code>--api-base</code> flag or set the env var:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Via flag
aider --api-base http://localhost:8080/openai

# Via environment variable
export AIDER_API_BASE=http://localhost:8080/openai

# Or in .aider.conf.yml
api-base: http://localhost:8080/openai`}</code>
      </pre>

      <h3>Gemini CLI</h3>
      <p>Set the Gemini API base URL:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`export GEMINI_API_BASE_URL=http://localhost:8080/gemini`}</code>
      </pre>
      <p>
        Squeezr handles both header-based and query-parameter-based API key
        forwarding for the Gemini <code>/v1beta/models/*</code> format.
      </p>

      <h3>Ollama (local models)</h3>
      <p>
        For Ollama, configure the upstream in your Squeezr config to point at
        your local Ollama instance:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# In config.toml
[local]
upstream = "http://localhost:11434"
detect_local_key = true

# Then point your tool at Squeezr
export OPENAI_BASE_URL=http://localhost:8080/openai`}</code>
      </pre>

      <h2>3. Verify the connection</h2>
      <p>
        Check that the proxy is running and can reach the upstream provider:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr status`}</code>
      </pre>
      <p>You should see output like:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`Squeezr proxy
  Status:   running
  Port:     8080
  PID:      12345
  Uptime:   2m 31s

Routes:
  /anthropic  -> https://api.anthropic.com
  /openai     -> https://api.openai.com
  /gemini     -> https://generativelanguage.googleapis.com`}</code>
      </pre>

      <h2>Next steps</h2>
      <p>
        See the <a href="/docs/quick-start">Quick Start</a> for an end-to-end
        walkthrough, or dive into the guide for your specific tool:
      </p>
      <ul>
        <li><a href="/docs/claude-code">Claude Code</a></li>
        <li><a href="/docs/codex">Codex</a></li>
        <li><a href="/docs/aider">Aider</a></li>
        <li><a href="/docs/gemini-cli">Gemini CLI</a></li>
        <li><a href="/docs/ollama">Ollama</a></li>
      </ul>
    </DocPage>
  );
}

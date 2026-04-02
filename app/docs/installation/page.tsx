import { DocPage } from "@/components/DocPage";

export default function InstallationPage() {
  return (
    <DocPage title="Installation">
      <p>
        Squeezr is a transparent compression proxy for AI coding tools. It sits
        between your tool and the LLM API, reducing token usage by up to 70%
        with zero changes to your workflow.
      </p>

      <h2>Requirements</h2>
      <ul>
        <li>
          <strong>Node.js 18+</strong> &mdash; Squeezr is built on Node and
          requires version 18 or later. Check with <code>node --version</code>.
        </li>
        <li>
          <strong>macOS, Linux, or WSL2</strong> &mdash; native Windows support
          is experimental; WSL2 is recommended on Windows machines.
        </li>
        <li>
          <strong>An API key</strong> for at least one supported provider
          (Anthropic, OpenAI, Google, or a local model via Ollama).
        </li>
      </ul>

      <h2>Install via npm</h2>
      <p>Install Squeezr globally so the CLI is available everywhere:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`npm install -g squeezr-ai`}</code>
      </pre>

      <p>Or with your preferred package manager:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# pnpm
pnpm add -g squeezr-ai

# yarn
yarn global add squeezr-ai`}</code>
      </pre>

      <h2>Verify the installation</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr --version
# squeezr v1.2.0`}</code>
      </pre>

      <h2>Initial setup</h2>
      <p>
        Run the interactive setup wizard. It detects installed coding tools and
        generates the configuration file for you:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup`}</code>
      </pre>
      <p>The wizard will:</p>
      <ol>
        <li>Detect which AI coding tools you have installed (Claude Code, Codex, Aider, Gemini CLI, Ollama).</li>
        <li>Ask which provider API keys to configure.</li>
        <li>Write a TOML config to <code>~/.config/squeezr/config.toml</code>.</li>
        <li>Print the environment variables you need to set in your shell profile.</li>
      </ol>

      <h2>Updating</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`npm update -g squeezr-ai`}</code>
      </pre>

      <h2>Uninstalling</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`npm uninstall -g squeezr-ai

# Remove config files
rm -rf ~/.config/squeezr`}</code>
      </pre>

      <h2>Next steps</h2>
      <p>
        Head to the <a href="/docs/setup">Setup</a> guide to start the proxy
        and connect your first coding tool, or jump straight to the{" "}
        <a href="/docs/quick-start">Quick Start</a> for the three-step
        overview.
      </p>
    </DocPage>
  );
}

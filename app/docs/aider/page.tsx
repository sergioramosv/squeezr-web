import { DocPage } from "@/components/DocPage";

export default function AiderPage() {
  return (
    <DocPage title="Aider">
      <p>
        Aider is an AI pair programming tool that works in the terminal. It
        uses the OpenAI chat completions format, making it fully compatible
        with Squeezr&apos;s OpenAI proxy route.
      </p>

      <h2>Setup</h2>
      <p>There are three ways to configure Aider to use Squeezr:</p>

      <h3>Option 1: Command-line flag</h3>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`aider --api-base http://localhost:8080/openai`}</code>
      </pre>

      <h3>Option 2: Environment variable</h3>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`export AIDER_API_BASE=http://localhost:8080/openai`}</code>
      </pre>

      <h3>Option 3: Configuration file</h3>
      <p>
        Add to your <code>.aider.conf.yml</code> in your home directory or
        project root:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# ~/.aider.conf.yml
api-base: http://localhost:8080/openai`}</code>
      </pre>

      <h2>Using Aider with Anthropic models</h2>
      <p>
        If you use Aider with Claude models via the Anthropic API, use the
        Anthropic route instead:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# For Anthropic models
export ANTHROPIC_BASE_URL=http://localhost:8080/anthropic

aider --model claude-3-5-sonnet-20241022`}</code>
      </pre>

      <h2>What gets compressed</h2>
      <p>
        Aider sends file contents, git diffs, and command outputs as part of
        its prompts. Squeezr compresses:
      </p>
      <ul>
        <li>
          <strong>Repository map</strong> &mdash; Aider&apos;s repo map can be
          very large. Squeezr deduplicates it across turns.
        </li>
        <li>
          <strong>File contents</strong> &mdash; Files added to the chat are
          compressed with cross-turn dedup.
        </li>
        <li>
          <strong>Git diffs</strong> &mdash; Diff output is compressed using
          the git-specific pattern matcher.
        </li>
        <li>
          <strong>Command output</strong> &mdash; Test results, lint output,
          and build logs are pattern-matched and compressed.
        </li>
      </ul>

      <h2>Project-level configuration</h2>
      <p>
        You can create a project-level Squeezr config alongside your{" "}
        <code>.aider.conf.yml</code>:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# .squeezr/config.toml (in project root)
[compression]
aggressiveness = "medium"
skip_tools = []`}</code>
      </pre>
      <p>
        Project-level config overrides the global config for that directory.
      </p>

      <h2>Tips</h2>
      <ul>
        <li>
          Aider sessions can be very long. Squeezr&apos;s cross-turn dedup is
          especially valuable here, as the same files are often re-sent many
          times.
        </li>
        <li>
          If you use <code>/add</code> to add many files, Squeezr will
          compress them more aggressively on subsequent turns.
        </li>
        <li>
          Use <code>squeezr status</code> to verify the proxy is running
          before starting an Aider session.
        </li>
      </ul>
    </DocPage>
  );
}

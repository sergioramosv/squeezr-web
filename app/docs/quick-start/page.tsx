import { DocPage } from "@/components/DocPage";

export default function QuickStartPage() {
  return (
    <DocPage title="Quick Start">
      <p>
        Get Squeezr running in under two minutes. Three steps, zero config
        changes to your coding tool.
      </p>

      <h2>Step 1: Install</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`npm install -g squeezr-ai`}</code>
      </pre>

      <h2>Step 2: Start the proxy</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr start`}</code>
      </pre>

      <h2>Step 3: Point your tool at the proxy</h2>
      <p>
        Add the appropriate environment variable to your shell profile. For
        example, with Claude Code:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Claude Code
export ANTHROPIC_BASE_URL=http://localhost:8080/anthropic

# Codex / Aider
export OPENAI_BASE_URL=http://localhost:8080/openai

# Gemini CLI
export GEMINI_API_BASE_URL=http://localhost:8080/gemini`}</code>
      </pre>
      <p>
        That&apos;s it. Use your tool exactly as before &mdash; Squeezr compresses
        transparently.
      </p>

      <h2>What happens behind the scenes</h2>
      <p>
        When your coding tool sends a request to the LLM API, Squeezr
        intercepts and processes it through a multi-layer compression pipeline:
      </p>
      <ol>
        <li>
          <strong>Request interception</strong> &mdash; The proxy receives the
          API call from your tool and inspects the message payload.
        </li>
        <li>
          <strong>Pattern matching</strong> &mdash; Tool results (file reads,
          git diffs, test output, build logs) are matched against 30+ known
          patterns and compressed using domain-specific strategies.
        </li>
        <li>
          <strong>Deduplication</strong> &mdash; Content that has appeared in
          previous turns of the same conversation is deduplicated so the model
          doesn&apos;t re-read identical data.
        </li>
        <li>
          <strong>AI compression</strong> &mdash; For large content blocks that
          don&apos;t match a known pattern, a small, fast model summarises the
          content while preserving all actionable information.
        </li>
        <li>
          <strong>Expand tool injection</strong> &mdash; An{" "}
          <code>squeezr_expand</code> tool is injected into the request so the
          model can retrieve full original content on demand.
        </li>
        <li>
          <strong>Forwarding</strong> &mdash; The optimised request is forwarded
          to the real API. The response is streamed back unmodified.
        </li>
      </ol>

      <h2>Check your savings</h2>
      <p>
        After a few interactions, check how much Squeezr has saved:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`curl http://localhost:8080/squeezr/stats`}</code>
      </pre>
      <p>You will see a JSON response with token counts:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "totalOriginalTokens": 284102,
  "totalCompressedTokens": 98435,
  "savings": "65.4%",
  "requestsProcessed": 47,
  "cacheHits": 23,
  "uptime": "1h 12m"
}`}</code>
      </pre>

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

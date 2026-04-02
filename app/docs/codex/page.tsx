import { DocPage } from "@/components/DocPage";

export default function CodexPage() {
  return (
    <DocPage title="Codex (OpenAI)">
      <p>
        Codex and other OpenAI-compatible tools work with Squeezr through the
        standard OpenAI Chat Completions API format. Any tool that targets{" "}
        <code>https://api.openai.com/v1</code> can be routed through the proxy.
      </p>

      <h2>Setup</h2>
      <p>
        Set the <code>OPENAI_BASE_URL</code> environment variable:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`export OPENAI_BASE_URL=http://localhost:8080/openai`}</code>
      </pre>
      <p>
        Add this to your shell profile so it persists. Your{" "}
        <code>OPENAI_API_KEY</code> is forwarded automatically via the{" "}
        <code>Authorization: Bearer</code> header.
      </p>

      <h2>How it works</h2>
      <p>
        Squeezr intercepts requests to the <code>/v1/chat/completions</code>{" "}
        endpoint and compresses the message array:
      </p>
      <ul>
        <li>
          <strong>Tool messages</strong> &mdash; Content in messages with{" "}
          <code>role: &quot;tool&quot;</code> is compressed using the same pattern
          matching and AI summarization pipeline as Anthropic requests.
        </li>
        <li>
          <strong>System messages</strong> &mdash; Large system prompts are
          cached and deduplicated across turns.
        </li>
        <li>
          <strong>User messages</strong> &mdash; Text content in user messages
          is left untouched to preserve intent.
        </li>
      </ul>

      <h3>OpenAI Chat Completions format</h3>
      <p>
        Squeezr understands the full OpenAI chat format including function
        calls, tool calls, and multi-part content arrays:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "model": "gpt-4o",
  "messages": [
    { "role": "system", "content": "..." },
    { "role": "user", "content": "Fix the bug in auth.ts" },
    { "role": "assistant", "tool_calls": [...] },
    { "role": "tool", "tool_call_id": "...", "content": "..." }
  ]
}`}</code>
      </pre>
      <p>
        The <code>tool</code> messages are the primary compression targets.
        Squeezr compresses their content and injects the expand tool so the
        model can retrieve full content if needed.
      </p>

      <h2>Local model configuration</h2>
      <p>
        If you are using a locally-hosted OpenAI-compatible model (e.g., via
        LM Studio, vLLM, or text-generation-webui), configure the upstream in
        your Squeezr config:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# config.toml
[local]
upstream = "http://localhost:1234"
detect_local_key = true`}</code>
      </pre>
      <p>
        With <code>detect_local_key = true</code>, Squeezr will not require or
        forward an API key when it detects the upstream is a local address.
      </p>

      <h2>Streaming</h2>
      <p>
        Squeezr fully supports streaming responses. When your tool sends{" "}
        <code>&quot;stream&quot;: true</code>, the proxy compresses the request,
        forwards it to the API, and streams the response chunks back in
        real-time with no buffering delay.
      </p>

      <h2>Compatible tools</h2>
      <p>
        Any tool that uses the OpenAI chat completions format works, including:
      </p>
      <ul>
        <li>OpenAI Codex CLI</li>
        <li>Continue (VS Code / JetBrains)</li>
        <li>Cursor (when using OpenAI models)</li>
        <li>Custom tools built on the OpenAI SDK</li>
      </ul>
    </DocPage>
  );
}

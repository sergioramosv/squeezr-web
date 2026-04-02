import { DocPage } from "@/components/DocPage";

export default function OllamaPage() {
  return (
    <DocPage title="Ollama">
      <p>
        Ollama lets you run LLMs locally. While local models are free, they
        still benefit from Squeezr&apos;s compression &mdash; smaller prompts
        mean faster inference, lower memory usage, and better results within
        the model&apos;s context window.
      </p>

      <h2>Setup</h2>
      <p>
        Ollama exposes an OpenAI-compatible API, so you use the standard
        OpenAI route. The key difference is configuring the upstream to point
        at your local Ollama instance.
      </p>

      <h3>Step 1: Configure the upstream</h3>
      <p>
        In your Squeezr config, set the local upstream to your Ollama address:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# ~/.config/squeezr/config.toml

[local]
upstream = "http://localhost:11434"
detect_local_key = true`}</code>
      </pre>

      <h3>Step 2: Point your tool at Squeezr</h3>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`export OPENAI_BASE_URL=http://localhost:8080/openai`}</code>
      </pre>

      <h3>Step 3: Start both services</h3>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Terminal 1: Ollama
ollama serve

# Terminal 2: Squeezr
squeezr start`}</code>
      </pre>

      <h2>Local key detection</h2>
      <p>
        When <code>detect_local_key = true</code> is set, Squeezr checks
        whether the upstream URL points to a local address (localhost, 127.0.0.1,
        or a private IP). If it does:
      </p>
      <ul>
        <li>No API key is required in the request headers.</li>
        <li>
          If an API key is present, it is forwarded but not validated by
          Squeezr.
        </li>
        <li>
          The <code>Authorization</code> header is stripped if the upstream is
          local and no key is configured, preventing Ollama from rejecting
          requests with invalid tokens.
        </li>
      </ul>

      <h2>TOML configuration reference</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[local]
# URL of the local model server
upstream = "http://localhost:11434"

# Auto-detect local endpoints and skip key validation
detect_local_key = true

# Optional: model name override
# model = "llama3.1:70b"`}</code>
      </pre>

      <h2>Why compress local model requests?</h2>
      <p>
        Even though local models are free, compression helps in several ways:
      </p>
      <ul>
        <li>
          <strong>Faster inference</strong> &mdash; Fewer input tokens means
          the model processes the prompt faster. This is especially noticeable
          with larger models.
        </li>
        <li>
          <strong>Context window</strong> &mdash; Local models often have
          smaller context windows (4K&ndash;32K). Compression lets you fit more
          conversation history within the limit.
        </li>
        <li>
          <strong>Memory usage</strong> &mdash; KV cache memory scales with
          input length. Shorter prompts reduce VRAM pressure.
        </li>
        <li>
          <strong>Quality</strong> &mdash; Removing noise and duplication helps
          the model focus on what matters, improving response quality.
        </li>
      </ul>

      <h2>Compatible tools</h2>
      <p>
        Any coding tool that can target an OpenAI-compatible endpoint works
        with the Ollama + Squeezr setup:
      </p>
      <ul>
        <li>Aider with <code>--api-base</code></li>
        <li>Continue (VS Code extension)</li>
        <li>Open Interpreter</li>
        <li>Custom scripts using the OpenAI SDK</li>
      </ul>
    </DocPage>
  );
}

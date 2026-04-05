import { DocPage } from "@/components/DocPage";

export default function OllamaPage() {
  return (
    <DocPage title="Ollama & LM Studio">
      <p>
        Ollama lets you run LLMs locally. While local models are free, they
        still benefit from Squeezr&apos;s compression &mdash; smaller prompts
        mean faster inference, lower memory usage, and better results within
        the model&apos;s context window.
      </p>

      <h2>How Squeezr detects Ollama</h2>
      <p>
        Squeezr detects Ollama automatically via transparent proxy &mdash; when it sees a
        dummy API key (e.g. <code>ollama</code> as the value of the{" "}
        <code>Authorization: Bearer</code> header) or a request targeting a local upstream,
        it routes through the local model server without requiring a real API key.
      </p>

      <h2>Setup</h2>
      <p>
        Configure the local upstream in <code>squeezr.toml</code> (next to the binary):
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[local]
enabled = true
upstream_url = "http://localhost:11434"
compression_model = "qwen2.5-coder:1.5b"`}</code>
      </pre>
      <p>
        Then start both services:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Start Ollama
ollama serve

# Start Squeezr
squeezr start`}</code>
      </pre>

      <h2>Using Ollama as the compression backend</h2>
      <p>
        With <code>compression_model</code> set, Squeezr uses the local Ollama model to compress
        large content blocks instead of calling an external API. This makes compression completely
        free when using Ollama for your main coding tool.
      </p>
      <p>
        Pull the compression model first:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`ollama pull qwen2.5-coder:1.5b`}</code>
      </pre>

      <h2>Why compress local model requests?</h2>
      <p>
        Even though local models are free, compression helps in several ways:
      </p>
      <ul>
        <li>
          <strong>Faster inference</strong> &mdash; Fewer input tokens means the model processes
          the prompt faster. This is especially noticeable with larger models.
        </li>
        <li>
          <strong>Context window</strong> &mdash; Local models often have smaller context windows
          (4K&ndash;32K). Compression lets you fit more conversation history within the limit.
        </li>
        <li>
          <strong>Memory usage</strong> &mdash; KV cache memory scales with input length. Shorter
          prompts reduce VRAM pressure.
        </li>
        <li>
          <strong>Quality</strong> &mdash; Removing noise and duplication helps the model focus
          on what matters, improving response quality.
        </li>
      </ul>
    </DocPage>
  );
}

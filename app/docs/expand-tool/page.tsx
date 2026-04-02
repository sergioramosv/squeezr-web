import { DocPage } from "@/components/DocPage";

export default function ExpandToolPage() {
  return (
    <DocPage title="Expand Tool">
      <p>
        The expand tool is the mechanism that makes Squeezr&apos;s compression
        lossless. When content is compressed, the model receives a summary
        plus an ID. If the model needs the full original content, it calls the{" "}
        <code>squeezr_expand</code> tool with that ID.
      </p>

      <h2>How it works</h2>
      <p>The expand mechanism follows five steps:</p>
      <ol>
        <li>
          <strong>Compression</strong> &mdash; When Squeezr compresses a tool
          result, it stores the full original content in the expand store
          (in-memory, keyed by a 6-character ID).
        </li>
        <li>
          <strong>Marker insertion</strong> &mdash; The compressed output
          includes a marker like{" "}
          <code>[squeezr:a3f2b1 -65%]</code> that tells the model the content
          was compressed and provides the ID.
        </li>
        <li>
          <strong>Tool injection</strong> &mdash; Squeezr injects a{" "}
          <code>squeezr_expand</code> tool definition into the API request so
          the model knows it can retrieve full content.
        </li>
        <li>
          <strong>Model calls expand</strong> &mdash; If the model determines
          it needs the full content (e.g., to find a specific line in a file
          read), it calls <code>squeezr_expand</code> with the ID.
        </li>
        <li>
          <strong>Proxy intercepts</strong> &mdash; Squeezr intercepts the
          expand tool call in the model&apos;s response, looks up the ID in the
          expand store, and returns the full original content as the tool
          result in the next request.
        </li>
      </ol>

      <h2>Compressed format</h2>
      <p>
        When content is compressed, it follows this format:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[squeezr:ID -SAVINGS%] SUMMARY

Example:
[squeezr:a3f2b1 -65%] Git diff: 3 files changed.
- src/auth.ts: Added JWT validation in login handler (lines 45-67)
- src/middleware.ts: Added auth middleware check
- tests/auth.test.ts: 2 new test cases for JWT flow

ERRORS:
- Line 52: Missing return type annotation`}</code>
      </pre>
      <p>
        The summary preserves all actionable information: errors, warnings,
        file paths, line numbers, and key changes. Only boilerplate and
        repetition are removed.
      </p>

      <h2>Tool definition (Anthropic format)</h2>
      <p>
        For Anthropic API requests, Squeezr injects this tool definition:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "name": "squeezr_expand",
  "description": "Retrieve the full original content of a Squeezr-compressed tool result. Use this when you need more detail than the compressed summary provides.",
  "input_schema": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "description": "The 6-char ID from [squeezr:ID] in the compressed content"
      }
    },
    "required": ["id"]
  }
}`}</code>
      </pre>

      <h2>Tool definition (OpenAI format)</h2>
      <p>
        For OpenAI-compatible requests, the tool is injected in function
        calling format:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "type": "function",
  "function": {
    "name": "squeezr_expand",
    "description": "Retrieve the full original content of a Squeezr-compressed tool result. Use this when you need more detail than the compressed summary provides.",
    "parameters": {
      "type": "object",
      "properties": {
        "id": {
          "type": "string",
          "description": "The 6-char ID from [squeezr:ID] in the compressed content"
        }
      },
      "required": ["id"]
    }
  }
}`}</code>
      </pre>

      <h2>Behavior</h2>

      <h3>When does the model call expand?</h3>
      <p>
        In practice, models call expand rarely &mdash; typically less than 5%
        of compressed blocks are expanded. This is because the compression
        summaries are designed to include all actionable information. The model
        only needs to expand when:
      </p>
      <ul>
        <li>It needs to reference a specific line number in a file.</li>
        <li>It needs the exact syntax of code that was summarized.</li>
        <li>The compression was too aggressive for the specific task.</li>
      </ul>

      <h3>What happens if the ID is expired?</h3>
      <p>
        Expand IDs are scoped to the proxy session. If the proxy restarts, all
        IDs from the previous session become invalid. If the model tries to
        expand an expired ID, it receives a message:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "error": "Content not found. The ID may have expired or the proxy may have restarted. Ask the user to re-read the file or re-run the command."
}`}</code>
      </pre>

      <h3>Performance</h3>
      <p>
        Expand calls are served from memory and are extremely fast (typically
        under 5ms). They do not count against API rate limits since they are
        handled entirely by the proxy.
      </p>

      <h3>Streaming compatibility</h3>
      <p>
        The expand tool works with streaming responses. When the model
        generates an expand tool call during streaming, Squeezr detects it in
        the stream, resolves the ID, and includes the full content in the
        next request from the coding tool.
      </p>
    </DocPage>
  );
}

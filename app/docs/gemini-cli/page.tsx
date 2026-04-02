import { DocPage } from "@/components/DocPage";

export default function GeminiCliPage() {
  return (
    <DocPage title="Gemini CLI">
      <p>
        Gemini CLI is Google&apos;s command-line tool for interacting with
        Gemini models. Squeezr supports the Gemini API format including the{" "}
        <code>/v1beta/models/*</code> endpoint structure.
      </p>

      <h2>Setup</h2>
      <p>
        Set the <code>GEMINI_API_BASE_URL</code> environment variable:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`export GEMINI_API_BASE_URL=http://localhost:8080/gemini`}</code>
      </pre>
      <p>
        Add this to your shell profile so it persists across sessions.
      </p>

      <h2>API format</h2>
      <p>
        The Gemini API uses a different request format than OpenAI or
        Anthropic. Squeezr handles the{" "}
        <code>/v1beta/models/MODEL:generateContent</code> and{" "}
        <code>/v1beta/models/MODEL:streamGenerateContent</code> endpoints:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`POST /v1beta/models/gemini-2.0-flash:generateContent
POST /v1beta/models/gemini-2.0-flash:streamGenerateContent`}</code>
      </pre>
      <p>
        Squeezr parses the Gemini content structure (parts array with text,
        functionCall, and functionResponse types) and applies compression to
        the appropriate parts.
      </p>

      <h2>API key handling</h2>
      <p>
        The Gemini API supports two methods of authentication, and Squeezr
        handles both transparently:
      </p>

      <h3>Header-based (recommended)</h3>
      <p>
        When your <code>GEMINI_API_KEY</code> is sent via the{" "}
        <code>x-goog-api-key</code> header, Squeezr forwards it as-is:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Header forwarding (automatic)
x-goog-api-key: your-api-key`}</code>
      </pre>

      <h3>Query parameter</h3>
      <p>
        Some Gemini clients append the API key as a <code>?key=</code> query
        parameter. Squeezr detects this, strips it from the proxied URL, and
        reattaches it when forwarding to the Google API:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Query parameter (also supported)
/v1beta/models/gemini-2.0-flash:generateContent?key=your-api-key`}</code>
      </pre>

      <h2>What gets compressed</h2>
      <p>
        In the Gemini format, tool results are sent as{" "}
        <code>functionResponse</code> parts. Squeezr compresses the{" "}
        <code>response</code> field of these parts using the same pipeline as
        other providers:
      </p>
      <ul>
        <li>File read results are deduplicated across turns.</li>
        <li>Shell command output is pattern-matched and compressed.</li>
        <li>Large text blocks get AI summarization.</li>
      </ul>

      <h2>Streaming support</h2>
      <p>
        When Gemini CLI uses the <code>streamGenerateContent</code> endpoint,
        Squeezr compresses the request and streams the response back without
        buffering. Server-sent events (SSE) are proxied in real-time.
      </p>

      <h2>Limitations</h2>
      <ul>
        <li>
          <strong>Multi-modal content</strong> &mdash; Image and audio parts
          are passed through unmodified. Only text parts are compressed.
        </li>
        <li>
          <strong>Grounding</strong> &mdash; Google Search grounding results
          are not compressed to preserve source attribution.
        </li>
      </ul>
    </DocPage>
  );
}

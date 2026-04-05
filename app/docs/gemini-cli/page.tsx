import { DocPage } from "@/components/DocPage";

export default function GeminiCliPage() {
  return (
    <DocPage title="Gemini CLI">
      <p>
        Gemini CLI is Google&apos;s command-line tool for interacting with Gemini models.
        Squeezr supports the Gemini API format including the{" "}
        <code>/v1beta/models/*</code> endpoint structure.
      </p>

      <h2>Setup</h2>
      <p>
        Run <code>squeezr setup</code> first. It automatically sets{" "}
        <code>GEMINI_API_BASE_URL=http://localhost:8080</code> in your environment.
        Then start the proxy:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup   # one-time
squeezr start`}</code>
      </pre>
      <p>
        Gemini CLI reads <code>GEMINI_API_BASE_URL</code> automatically. Your existing{" "}
        <code>GEMINI_API_KEY</code> is forwarded to the Google API transparently.
      </p>

      <h2>API format</h2>
      <p>
        Squeezr handles the Gemini API endpoints:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`POST /v1beta/models/gemini-2.0-flash:generateContent
POST /v1beta/models/gemini-2.0-flash:streamGenerateContent`}</code>
      </pre>
      <p>
        The proxy parses the Gemini content structure (parts array with text,
        functionCall, and functionResponse types) and applies compression to the
        appropriate parts.
      </p>

      <h2>API key handling</h2>
      <p>
        Squeezr handles both Gemini authentication methods transparently:
      </p>
      <ul>
        <li>
          <strong>Header-based:</strong> <code>x-goog-api-key</code> header is forwarded
          as-is.
        </li>
        <li>
          <strong>Query parameter:</strong> <code>?key=...</code> is detected, stripped from
          the proxied URL, and reattached when forwarding to the Google API.
        </li>
      </ul>

      <h2>What gets compressed</h2>
      <p>
        In the Gemini format, tool results are sent as <code>functionResponse</code> parts.
        Squeezr compresses the response field of these parts:
      </p>
      <ul>
        <li>File read results are deduplicated across turns.</li>
        <li>Shell command output is pattern-matched and compressed.</li>
        <li>Large text blocks are summarized while preserving errors and key info.</li>
      </ul>

      <h2>Streaming support</h2>
      <p>
        When Gemini CLI uses the <code>streamGenerateContent</code> endpoint, Squeezr compresses
        the request and streams the response back without buffering. Server-sent events (SSE)
        are proxied in real-time.
      </p>
    </DocPage>
  );
}

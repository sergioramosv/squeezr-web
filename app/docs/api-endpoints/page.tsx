import { DocPage } from "@/components/DocPage";

export default function ApiEndpointsPage() {
  return (
    <DocPage title="API Endpoints">
      <p>
        Squeezr exposes several HTTP endpoints for health checks, statistics,
        and the expand mechanism, alongside the proxy routes that forward
        requests to LLM providers.
      </p>

      <h2>Management endpoints</h2>

      <h3>GET /squeezr/health</h3>
      <p>
        Health check endpoint. Returns a 200 status when the proxy is running.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`curl http://localhost:8080/squeezr/health`}</code>
      </pre>
      <p>Response:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "status": "ok",
  "version": "1.2.0",
  "uptime": 7351
}`}</code>
      </pre>

      <h3>GET /squeezr/stats</h3>
      <p>
        Returns detailed statistics about proxy usage, compression savings,
        and cache performance.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`curl http://localhost:8080/squeezr/stats`}</code>
      </pre>
      <p>Full response example:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "uptime": "2h 15m 31s",
  "requests": {
    "total": 247,
    "anthropic": 189,
    "openai": 42,
    "gemini": 16,
    "local": 0
  },
  "compression": {
    "totalOriginalTokens": 1284102,
    "totalCompressedTokens": 448435,
    "savings": "65.1%",
    "avgCompressionRatio": 0.349,
    "blocksCompressed": 892,
    "blocksSkipped": 134,
    "patternsUsed": {
      "git_diff": 67,
      "test_vitest": 43,
      "file_read_dedup": 312,
      "system_prompt_cache": 189,
      "ai_compression": 28,
      "line_dedup": 94,
      "ansi_strip": 159
    }
  },
  "cache": {
    "sessionHits": 342,
    "sessionMisses": 98,
    "diskHits": 43,
    "diskMisses": 55,
    "diskSizeMb": 18.7,
    "expandStoreEntries": 156,
    "hitRate": "78.5%"
  },
  "expand": {
    "totalCalls": 12,
    "avgLatencyMs": 2.3
  },
  "adaptive": {
    "currentLevel": "medium",
    "escalations": 3,
    "avgConversationTokens": 78400
  }
}`}</code>
      </pre>

      <h3>GET /squeezr/expand/:id</h3>
      <p>
        Retrieves the full original content for a compressed block. This is
        primarily used internally by the <code>squeezr_expand</code> tool, but
        can also be called directly for debugging.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`curl http://localhost:8080/squeezr/expand/a3f2b1`}</code>
      </pre>
      <p>Response:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "id": "a3f2b1",
  "originalContent": "... full original content ...",
  "originalSize": 12847,
  "compressedSize": 2134,
  "pattern": "git_diff",
  "createdAt": "2025-01-15T10:23:45Z"
}`}</code>
      </pre>
      <p>
        Returns 404 if the ID is not found (expired or from a previous
        session).
      </p>

      <h2>Proxy routes</h2>
      <p>
        These routes proxy requests to the upstream LLM providers. Your coding
        tools should be configured to send requests to these endpoints.
      </p>
      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>Upstream</th>
            <th>API format</th>
            <th>Auth</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>/anthropic/*</code></td>
            <td><code>https://api.anthropic.com</code></td>
            <td>Anthropic Messages API</td>
            <td><code>x-api-key</code> header</td>
          </tr>
          <tr>
            <td><code>/openai/*</code></td>
            <td><code>https://api.openai.com</code></td>
            <td>OpenAI Chat Completions</td>
            <td><code>Authorization: Bearer</code></td>
          </tr>
          <tr>
            <td><code>/gemini/*</code></td>
            <td><code>https://generativelanguage.googleapis.com</code></td>
            <td>Gemini v1beta</td>
            <td><code>x-goog-api-key</code> or <code>?key=</code></td>
          </tr>
        </tbody>
      </table>
      <p>
        All routes preserve the path suffix. For example, a request to{" "}
        <code>/anthropic/v1/messages</code> is proxied to{" "}
        <code>https://api.anthropic.com/v1/messages</code>.
      </p>

      <h2>Request flow</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`Coding Tool
  |
  | POST /anthropic/v1/messages
  v
Squeezr Proxy (localhost:8080)
  |
  | 1. Parse request body
  | 2. Run compression pipeline
  | 3. Inject expand tool
  | 4. Forward to upstream
  |
  | POST https://api.anthropic.com/v1/messages
  v
Anthropic API
  |
  | Stream response
  v
Squeezr Proxy
  |
  | Pass-through (no modification)
  v
Coding Tool`}</code>
      </pre>

      <h2>CORS and headers</h2>
      <p>
        Squeezr forwards all request headers to the upstream, with the
        exception of the <code>Host</code> header (rewritten to match the
        upstream). Response headers are returned unmodified.
      </p>
      <p>
        For local development, CORS headers are not added by default. If you
        need CORS support (e.g., for browser-based tools), set{" "}
        <code>[proxy] bind = &quot;0.0.0.0&quot;</code> and handle CORS in
        your application.
      </p>
    </DocPage>
  );
}

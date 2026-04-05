"use client";
import { DocPage } from "@/components/DocPage";
import { useI18n } from "@/lib/i18n";

export default function ApiEndpointsPage() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return (
    <DocPage title={isEs ? "Endpoints de la API" : "API Endpoints"}>
      {isEs ? <Es /> : <En />}
    </DocPage>
  );
}

function En() {
  return (
    <>
      <p>
        Squeezr exposes several HTTP endpoints for health checks, statistics,
        and the expand mechanism, alongside the transparent proxy that forwards
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
  "version": "1.17.0",
  "uptime": 7351
}`}</code>
      </pre>

      <h3>GET /squeezr/stats</h3>
      <p>
        Returns statistics about proxy usage, compression savings, and cache performance.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`curl http://localhost:8080/squeezr/stats`}</code>
      </pre>

      <h3>GET /squeezr/expand/:id</h3>
      <p>
        Retrieves the full original content for a compressed block. This is used internally by
        the <code>squeezr_expand</code> tool, but can also be called directly for debugging.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`curl http://localhost:8080/squeezr/expand/a3f2b1`}</code>
      </pre>
      <p>
        Returns 404 if the ID is not found (expired or from a previous session).
      </p>

      <h2>Proxy behavior</h2>
      <p>
        Squeezr sits transparently between your coding tool and the upstream API. Your tools point
        at <code>http://localhost:8080</code> and Squeezr automatically routes to the correct
        provider:
      </p>
      <table>
        <thead>
          <tr>
            <th>Tool</th>
            <th>Env var</th>
            <th>Upstream</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Claude Code / Aider</td>
            <td><code>ANTHROPIC_BASE_URL=http://localhost:8080</code></td>
            <td><code>https://api.anthropic.com</code></td>
          </tr>
          <tr>
            <td>Gemini CLI</td>
            <td><code>GEMINI_API_BASE_URL=http://localhost:8080</code></td>
            <td><code>https://generativelanguage.googleapis.com</code></td>
          </tr>
          <tr>
            <td>Codex</td>
            <td><code>HTTPS_PROXY=http://localhost:8081</code> (per-session)</td>
            <td><code>wss://chatgpt.com</code> (via MITM)</td>
          </tr>
          <tr>
            <td>Ollama</td>
            <td>Detected via dummy API key</td>
            <td><code>http://localhost:11434</code></td>
          </tr>
        </tbody>
      </table>

      <h2>Request flow</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`Coding Tool
  |
  | POST http://localhost:8080/v1/messages
  v
Squeezr Proxy (localhost:8080)
  |
  | 1. Parse request body
  | 2. Run compression pipeline (3 layers)
  | 3. Inject expand tool definition
  | 4. Forward to upstream API
  |
  | POST https://api.anthropic.com/v1/messages
  v
Anthropic API
  |
  | Stream response chunks
  v
Squeezr Proxy
  |
  | Pass-through (no modification to response)
  v
Coding Tool`}</code>
      </pre>

      <h2>Headers</h2>
      <p>
        Squeezr forwards all request headers to the upstream, except <code>Host</code> (rewritten
        to match the upstream), <code>Content-Length</code> (recalculated after compression), and{" "}
        <code>Expect</code> (stripped for Node.js v24 compatibility). Response headers are
        returned unmodified.
      </p>
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        Squeezr expone varios endpoints HTTP para verificaciones de estado, estadisticas
        y el mecanismo de expand, junto con el proxy transparente que reenvía
        solicitudes a los proveedores de LLM.
      </p>

      <h2>Endpoints de gestion</h2>

      <h3>GET /squeezr/health</h3>
      <p>
        Endpoint de verificacion de estado. Devuelve un estado 200 cuando el proxy esta en ejecucion.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`curl http://localhost:8080/squeezr/health`}</code>
      </pre>
      <p>Respuesta:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "status": "ok",
  "version": "1.17.0",
  "uptime": 7351
}`}</code>
      </pre>

      <h3>GET /squeezr/stats</h3>
      <p>
        Devuelve estadisticas sobre el uso del proxy, ahorro por compresion y rendimiento de la cache.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`curl http://localhost:8080/squeezr/stats`}</code>
      </pre>

      <h3>GET /squeezr/expand/:id</h3>
      <p>
        Recupera el contenido original completo de un bloque comprimido. Es usado internamente por
        la herramienta <code>squeezr_expand</code>, pero tambien se puede llamar directamente para depuracion.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`curl http://localhost:8080/squeezr/expand/a3f2b1`}</code>
      </pre>
      <p>
        Devuelve 404 si el ID no se encuentra (expirado o de una sesion anterior).
      </p>

      <h2>Comportamiento del proxy</h2>
      <p>
        Squeezr se ubica de forma transparente entre tu herramienta de codigo y la API upstream. Tus herramientas apuntan
        a <code>http://localhost:8080</code> y Squeezr enruta automaticamente al proveedor correcto:
      </p>
      <table>
        <thead>
          <tr>
            <th>Herramienta</th>
            <th>Variable de entorno</th>
            <th>Upstream</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Claude Code / Aider</td>
            <td><code>ANTHROPIC_BASE_URL=http://localhost:8080</code></td>
            <td><code>https://api.anthropic.com</code></td>
          </tr>
          <tr>
            <td>Gemini CLI</td>
            <td><code>GEMINI_API_BASE_URL=http://localhost:8080</code></td>
            <td><code>https://generativelanguage.googleapis.com</code></td>
          </tr>
          <tr>
            <td>Codex</td>
            <td><code>HTTPS_PROXY=http://localhost:8081</code> (por sesion)</td>
            <td><code>wss://chatgpt.com</code> (via MITM)</td>
          </tr>
          <tr>
            <td>Ollama</td>
            <td>Detectado via API key dummy</td>
            <td><code>http://localhost:11434</code></td>
          </tr>
        </tbody>
      </table>

      <h2>Flujo de solicitudes</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`Coding Tool
  |
  | POST http://localhost:8080/v1/messages
  v
Squeezr Proxy (localhost:8080)
  |
  | 1. Parse request body
  | 2. Run compression pipeline (3 layers)
  | 3. Inject expand tool definition
  | 4. Forward to upstream API
  |
  | POST https://api.anthropic.com/v1/messages
  v
Anthropic API
  |
  | Stream response chunks
  v
Squeezr Proxy
  |
  | Pass-through (no modification to response)
  v
Coding Tool`}</code>
      </pre>

      <h2>Headers</h2>
      <p>
        Squeezr reenvía todos los headers de la solicitud al upstream, excepto <code>Host</code> (reescrito
        para coincidir con el upstream), <code>Content-Length</code> (recalculado despues de la compresion), y{" "}
        <code>Expect</code> (eliminado para compatibilidad con Node.js v24). Los headers de respuesta se
        devuelven sin modificar.
      </p>
    </>
  );
}

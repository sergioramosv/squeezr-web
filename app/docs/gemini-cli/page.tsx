"use client";
import { DocPage } from "@/components/DocPage";
import { useI18n } from "@/lib/i18n";

export default function GeminiCliPage() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return (
    <DocPage title="Gemini CLI">
      {isEs ? <Es /> : <En />}
    </DocPage>
  );
}

function En() {
  return (
    <>
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
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        Gemini CLI es la herramienta de línea de comandos de Google para interactuar con modelos
        Gemini. Squeezr soporta el formato de la API de Gemini incluyendo la estructura de
        endpoints <code>/v1beta/models/*</code>.
      </p>

      <h2>Configuración</h2>
      <p>
        Ejecuta <code>squeezr setup</code> primero. Configura automáticamente{" "}
        <code>GEMINI_API_BASE_URL=http://localhost:8080</code> en tu entorno.
        Luego inicia el proxy:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup   # one-time
squeezr start`}</code>
      </pre>
      <p>
        Gemini CLI lee <code>GEMINI_API_BASE_URL</code> automáticamente. Tu{" "}
        <code>GEMINI_API_KEY</code> existente se reenvía a la API de Google de forma transparente.
      </p>

      <h2>Formato de API</h2>
      <p>
        Squeezr maneja los endpoints de la API de Gemini:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`POST /v1beta/models/gemini-2.0-flash:generateContent
POST /v1beta/models/gemini-2.0-flash:streamGenerateContent`}</code>
      </pre>
      <p>
        El proxy analiza la estructura de contenido de Gemini (array de parts con tipos text,
        functionCall y functionResponse) y aplica compresión a las partes apropiadas.
      </p>

      <h2>Manejo de API key</h2>
      <p>
        Squeezr maneja ambos métodos de autenticación de Gemini de forma transparente:
      </p>
      <ul>
        <li>
          <strong>Basado en header:</strong> el header <code>x-goog-api-key</code> se reenvía
          tal cual.
        </li>
        <li>
          <strong>Parámetro de query:</strong> <code>?key=...</code> se detecta, se elimina de
          la URL del proxy y se vuelve a adjuntar al reenviar a la API de Google.
        </li>
      </ul>

      <h2>Qué se comprime</h2>
      <p>
        En el formato de Gemini, los resultados de herramientas se envían como partes{" "}
        <code>functionResponse</code>. Squeezr comprime el campo response de estas partes:
      </p>
      <ul>
        <li>Los resultados de lectura de archivos se deduplican entre turnos.</li>
        <li>La salida de comandos de shell se procesa con reconocimiento de patrones y se comprime.</li>
        <li>Los bloques de texto grandes se resumen preservando errores e información clave.</li>
      </ul>

      <h2>Soporte de streaming</h2>
      <p>
        Cuando Gemini CLI usa el endpoint <code>streamGenerateContent</code>, Squeezr comprime
        la petición y retransmite la respuesta sin buffering. Los eventos server-sent (SSE)
        se proxean en tiempo real.
      </p>
    </>
  );
}

"use client";
import { DocPage } from "@/components/DocPage";
import { useI18n } from "@/lib/i18n";

export default function ExpandToolPage() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return (
    <DocPage title={isEs ? "Herramienta Expand" : "Expand Tool"}>
      {isEs ? <Es /> : <En />}
    </DocPage>
  );
}

function En() {
  return (
    <>
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
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        La herramienta expand es el mecanismo que hace que la compresion de Squeezr sea
        sin perdida. Cuando el contenido se comprime, el modelo recibe un resumen
        mas un ID. Si el modelo necesita el contenido original completo, llama a la herramienta{" "}
        <code>squeezr_expand</code> con ese ID.
      </p>

      <h2>Como funciona</h2>
      <p>El mecanismo de expand sigue cinco pasos:</p>
      <ol>
        <li>
          <strong>Compresion</strong> &mdash; Cuando Squeezr comprime el resultado
          de una herramienta, almacena el contenido original completo en el expand store
          (en memoria, indexado por un ID de 6 caracteres).
        </li>
        <li>
          <strong>Insercion de marcador</strong> &mdash; La salida comprimida
          incluye un marcador como{" "}
          <code>[squeezr:a3f2b1 -65%]</code> que le indica al modelo que el contenido
          fue comprimido y proporciona el ID.
        </li>
        <li>
          <strong>Inyeccion de herramienta</strong> &mdash; Squeezr inyecta una
          definicion de la herramienta{" "}
          <code>squeezr_expand</code> en la solicitud a la API para que
          el modelo sepa que puede recuperar el contenido completo.
        </li>
        <li>
          <strong>El modelo llama a expand</strong> &mdash; Si el modelo determina
          que necesita el contenido completo (por ejemplo, para encontrar una linea especifica en un archivo),
          llama a <code>squeezr_expand</code> con el ID.
        </li>
        <li>
          <strong>El proxy intercepta</strong> &mdash; Squeezr intercepta la
          llamada a la herramienta expand en la respuesta del modelo, busca el ID en el
          expand store y devuelve el contenido original completo como resultado
          de la herramienta en la siguiente solicitud.
        </li>
      </ol>

      <h2>Formato comprimido</h2>
      <p>
        Cuando el contenido se comprime, sigue este formato:
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
        El resumen preserva toda la informacion accionable: errores, advertencias,
        rutas de archivos, numeros de linea y cambios clave. Solo se eliminan el
        boilerplate y las repeticiones.
      </p>

      <h2>Definicion de herramienta (formato Anthropic)</h2>
      <p>
        Para solicitudes a la API de Anthropic, Squeezr inyecta esta definicion de herramienta:
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

      <h2>Definicion de herramienta (formato OpenAI)</h2>
      <p>
        Para solicitudes compatibles con OpenAI, la herramienta se inyecta en formato
        de llamada a funciones:
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

      <h2>Comportamiento</h2>

      <h3>Cuando llama el modelo a expand?</h3>
      <p>
        En la practica, los modelos llaman a expand raramente &mdash; tipicamente menos del 5%
        de los bloques comprimidos se expanden. Esto se debe a que los resumenes de compresion
        estan disenados para incluir toda la informacion accionable. El modelo
        solo necesita expandir cuando:
      </p>
      <ul>
        <li>Necesita referenciar un numero de linea especifico en un archivo.</li>
        <li>Necesita la sintaxis exacta del codigo que fue resumido.</li>
        <li>La compresion fue demasiado agresiva para la tarea especifica.</li>
      </ul>

      <h3>Que pasa si el ID ha expirado?</h3>
      <p>
        Los IDs de expand estan limitados a la sesion del proxy. Si el proxy se reinicia, todos
        los IDs de la sesion anterior se invalidan. Si el modelo intenta
        expandir un ID expirado, recibe un mensaje:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "error": "Content not found. The ID may have expired or the proxy may have restarted. Ask the user to re-read the file or re-run the command."
}`}</code>
      </pre>

      <h3>Rendimiento</h3>
      <p>
        Las llamadas a expand se sirven desde memoria y son extremadamente rapidas (tipicamente
        menos de 5ms). No cuentan contra los limites de tasa de la API ya que son
        manejadas completamente por el proxy.
      </p>

      <h3>Compatibilidad con streaming</h3>
      <p>
        La herramienta expand funciona con respuestas en streaming. Cuando el modelo
        genera una llamada a la herramienta expand durante el streaming, Squeezr la detecta en
        el stream, resuelve el ID e incluye el contenido completo en la
        siguiente solicitud de la herramienta de codigo.
      </p>
    </>
  );
}

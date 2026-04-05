"use client";
import { DocPage } from "@/components/DocPage";
import { useI18n } from "@/lib/i18n";

export default function ClaudeCodePage() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return (
    <DocPage title="Claude Code">
      {isEs ? <Es /> : <En />}
    </DocPage>
  );
}

function En() {
  return (
    <>
      <p>
        Claude Code is the primary target for Squeezr. Because it sends large tool results
        (file reads, shell output, search results) in every turn, it benefits the most from
        compression &mdash; typically saving 50&ndash;70% of input tokens per session.
      </p>

      <h2>Setup</h2>
      <p>
        Run <code>squeezr setup</code> once. It automatically sets{" "}
        <code>ANTHROPIC_BASE_URL=http://localhost:8080</code> in your environment.
        No manual configuration needed.
      </p>
      <p>
        Then start the proxy:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup   # one-time
squeezr start`}</code>
      </pre>
      <p>
        Claude Code reads <code>ANTHROPIC_BASE_URL</code> automatically and routes all API calls
        through the proxy. Your existing <code>ANTHROPIC_API_KEY</code> or OAuth token continues
        to work &mdash; Squeezr forwards it to the Anthropic API transparently.
      </p>

      <h3>OAuth support</h3>
      <p>
        Claude Max, Team, and Enterprise plans authenticate via OAuth tokens instead of API keys.
        Squeezr detects and forwards OAuth tokens transparently. No additional configuration is
        needed.
      </p>

      <h2>How it works with Claude Code</h2>

      <h3>Layer 1: System prompt compression</h3>
      <p>
        Claude Code&apos;s system prompt is ~13KB and is sent with every request. Squeezr compresses
        it once using a cheap AI model (Haiku) and caches the result. Every subsequent request
        reuses the cached version, saving ~3,000 tokens per request.
      </p>

      <h3>Layer 2: Deterministic preprocessing</h3>
      <p>
        Zero-latency rule-based transforms applied to every tool result before anything else:
      </p>
      <ul>
        <li>ANSI escape codes and progress bars stripped</li>
        <li>Duplicate stack frames and repeated lines deduplicated</li>
        <li>JSON whitespace collapsed</li>
        <li>Blank lines consolidated</li>
      </ul>

      <h3>Layer 3: Tool-specific patterns</h3>
      <p>
        Each tool result is matched against 30+ specialized patterns. Errors and actionable
        information are always preserved:
      </p>
      <table>
        <thead>
          <tr>
            <th>Tool</th>
            <th>Compression strategy</th>
            <th>Typical savings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Read</code></td>
            <td>Cross-turn dedup, large file &rarr; signatures only</td>
            <td>40&ndash;90%</td>
          </tr>
          <tr>
            <td><code>Bash</code></td>
            <td>Pattern matching (git, test, build)</td>
            <td>50&ndash;80%</td>
          </tr>
          <tr>
            <td><code>Grep</code></td>
            <td>Grouped by file, matches capped</td>
            <td>30&ndash;60%</td>
          </tr>
          <tr>
            <td><code>Glob</code></td>
            <td>Directory tree summary (&gt;30 files)</td>
            <td>30&ndash;50%</td>
          </tr>
          <tr>
            <td><code>WebFetch</code></td>
            <td>AI summarization</td>
            <td>60&ndash;80%</td>
          </tr>
        </tbody>
      </table>

      <h3>Cross-turn file read deduplication</h3>
      <p>
        When Claude Code reads the same file multiple times in a conversation, Squeezr detects
        the duplication and replaces repeated reads with a compact reference pointer. This alone
        can save thousands of tokens in long sessions.
      </p>

      <h3>Adaptive pressure</h3>
      <p>
        Compression aggressiveness scales automatically with context window usage:
      </p>
      <table>
        <thead>
          <tr>
            <th>Context usage</th>
            <th>Threshold</th>
            <th>Behavior</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&lt; 50%</td>
            <td>1,500 chars</td>
            <td>Light &mdash; only compress large results</td>
          </tr>
          <tr>
            <td>50&ndash;75%</td>
            <td>800 chars</td>
            <td>Normal &mdash; standard compression</td>
          </tr>
          <tr>
            <td>75&ndash;90%</td>
            <td>400 chars</td>
            <td>Aggressive &mdash; compress most results</td>
          </tr>
          <tr>
            <td>&gt; 90%</td>
            <td>150 chars</td>
            <td>Critical &mdash; compress everything, 0 git diff context</td>
          </tr>
        </tbody>
      </table>

      <h2>Per-command skip</h2>
      <p>
        Add <code># squeezr:skip</code> anywhere in a Bash command to bypass compression for
        that specific result:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`cat important-file.txt  # squeezr:skip`}</code>
      </pre>

      <h2>Configuration tips</h2>
      <ul>
        <li>
          <strong>Skip specific tools:</strong>
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
skip_tools = ["Read"]`}</code>
          </pre>
        </li>
        <li>
          <strong>Only compress specific tools:</strong>
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
only_tools = ["Bash"]`}</code>
          </pre>
        </li>
        <li>
          <strong>Raise the threshold</strong> to compress less (fewer false positives):
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
threshold = 1500`}</code>
          </pre>
        </li>
      </ul>

      <h2>Verifying it works</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr status`}</code>
      </pre>
      <p>
        After a few interactions, you should see a positive savings percentage. Check the{" "}
        <a href="/docs/troubleshooting">troubleshooting guide</a> if you see 502 errors or
        the proxy is not intercepting requests.
      </p>
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        Claude Code es el objetivo principal de Squeezr. Dado que envia resultados grandes de herramientas
        (lecturas de archivos, salida de shell, resultados de busqueda) en cada turno, es el que mas se beneficia de la
        compresion &mdash; ahorrando tipicamente entre un 50&ndash;70% de tokens de entrada por sesion.
      </p>

      <h2>Configuracion</h2>
      <p>
        Ejecuta <code>squeezr setup</code> una vez. Establece automaticamente{" "}
        <code>ANTHROPIC_BASE_URL=http://localhost:8080</code> en tu entorno.
        No se necesita configuracion manual.
      </p>
      <p>
        Luego inicia el proxy:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup   # one-time
squeezr start`}</code>
      </pre>
      <p>
        Claude Code lee <code>ANTHROPIC_BASE_URL</code> automaticamente y enruta todas las llamadas API
        a traves del proxy. Tu <code>ANTHROPIC_API_KEY</code> existente o token OAuth sigue
        funcionando &mdash; Squeezr lo reenvia a la API de Anthropic de forma transparente.
      </p>

      <h3>Soporte OAuth</h3>
      <p>
        Los planes Claude Max, Team y Enterprise se autentican mediante tokens OAuth en lugar de API keys.
        Squeezr detecta y reenvia los tokens OAuth de forma transparente. No se necesita configuracion
        adicional.
      </p>

      <h2>Como funciona con Claude Code</h2>

      <h3>Capa 1: Compresion del system prompt</h3>
      <p>
        El system prompt de Claude Code tiene ~13KB y se envia con cada solicitud. Squeezr lo comprime
        una vez usando un modelo de IA economico (Haiku) y cachea el resultado. Cada solicitud posterior
        reutiliza la version cacheada, ahorrando ~3.000 tokens por solicitud.
      </p>

      <h3>Capa 2: Preprocesamiento deterministico</h3>
      <p>
        Transformaciones basadas en reglas sin latencia aplicadas a cada resultado de herramienta antes que nada:
      </p>
      <ul>
        <li>Codigos de escape ANSI y barras de progreso eliminados</li>
        <li>Stack frames duplicados y lineas repetidas deduplicados</li>
        <li>Espacios en blanco de JSON colapsados</li>
        <li>Lineas en blanco consolidadas</li>
      </ul>

      <h3>Capa 3: Patrones especificos por herramienta</h3>
      <p>
        Cada resultado de herramienta se compara contra mas de 30 patrones especializados. Los errores y la informacion
        relevante siempre se preservan:
      </p>
      <table>
        <thead>
          <tr>
            <th>Herramienta</th>
            <th>Estrategia de compresion</th>
            <th>Ahorro tipico</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Read</code></td>
            <td>Dedup entre turnos, archivo grande &rarr; solo firmas</td>
            <td>40&ndash;90%</td>
          </tr>
          <tr>
            <td><code>Bash</code></td>
            <td>Coincidencia de patrones (git, test, build)</td>
            <td>50&ndash;80%</td>
          </tr>
          <tr>
            <td><code>Grep</code></td>
            <td>Agrupado por archivo, coincidencias limitadas</td>
            <td>30&ndash;60%</td>
          </tr>
          <tr>
            <td><code>Glob</code></td>
            <td>Resumen de arbol de directorios (&gt;30 archivos)</td>
            <td>30&ndash;50%</td>
          </tr>
          <tr>
            <td><code>WebFetch</code></td>
            <td>Resumen con IA</td>
            <td>60&ndash;80%</td>
          </tr>
        </tbody>
      </table>

      <h3>Deduplicacion de lecturas de archivos entre turnos</h3>
      <p>
        Cuando Claude Code lee el mismo archivo multiples veces en una conversacion, Squeezr detecta
        la duplicacion y reemplaza las lecturas repetidas con un puntero de referencia compacto. Solo esto
        puede ahorrar miles de tokens en sesiones largas.
      </p>

      <h3>Presion adaptativa</h3>
      <p>
        La agresividad de la compresion escala automaticamente con el uso de la ventana de contexto:
      </p>
      <table>
        <thead>
          <tr>
            <th>Uso de contexto</th>
            <th>Umbral</th>
            <th>Comportamiento</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&lt; 50%</td>
            <td>1.500 chars</td>
            <td>Ligero &mdash; solo comprime resultados grandes</td>
          </tr>
          <tr>
            <td>50&ndash;75%</td>
            <td>800 chars</td>
            <td>Normal &mdash; compresion estandar</td>
          </tr>
          <tr>
            <td>75&ndash;90%</td>
            <td>400 chars</td>
            <td>Agresivo &mdash; comprime la mayoria de resultados</td>
          </tr>
          <tr>
            <td>&gt; 90%</td>
            <td>150 chars</td>
            <td>Critico &mdash; comprime todo, 0 contexto en git diff</td>
          </tr>
        </tbody>
      </table>

      <h2>Omitir por comando</h2>
      <p>
        Agrega <code># squeezr:skip</code> en cualquier parte de un comando Bash para omitir la compresion para
        ese resultado especifico:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`cat important-file.txt  # squeezr:skip`}</code>
      </pre>

      <h2>Consejos de configuracion</h2>
      <ul>
        <li>
          <strong>Omitir herramientas especificas:</strong>
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
skip_tools = ["Read"]`}</code>
          </pre>
        </li>
        <li>
          <strong>Comprimir solo herramientas especificas:</strong>
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
only_tools = ["Bash"]`}</code>
          </pre>
        </li>
        <li>
          <strong>Aumentar el umbral</strong> para comprimir menos (menos falsos positivos):
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
threshold = 1500`}</code>
          </pre>
        </li>
      </ul>

      <h2>Verificar que funciona</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr status`}</code>
      </pre>
      <p>
        Despues de algunas interacciones, deberias ver un porcentaje positivo de ahorro. Consulta la{" "}
        <a href="/docs/troubleshooting">guia de solucion de problemas</a> si ves errores 502 o
        el proxy no esta interceptando las solicitudes.
      </p>
    </>
  );
}

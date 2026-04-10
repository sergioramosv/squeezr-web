"use client";
import { DocPage } from "@/components/DocPage";
import { useI18n } from "@/lib/i18n";

export default function McpServerPage() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return (
    <DocPage title={isEs ? "Servidor MCP" : "MCP Server"}>
      {isEs ? <Es /> : <En />}
    </DocPage>
  );
}

function En() {
  return (
    <>
      <p>
        Squeezr exposes an MCP (Model Context Protocol) server that allows AI tools to query and
        control the proxy programmatically. Claude Code and other MCP-compatible clients can use
        these tools directly from within a conversation.
      </p>

      <h2>Available tools</h2>
      <p>
        The MCP server provides 9 tools. Each tool is callable by the AI agent during a session.
      </p>

      <h3>squeezr_status</h3>
      <p>
        Returns the current proxy status: whether it&apos;s running, uptime, PID, ports, and version.
        Equivalent to running <code>squeezr status</code> from the CLI.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}><em>No parameters</em></td>
          </tr>
        </tbody>
      </table>

      <h3>squeezr_stats</h3>
      <p>
        Returns compression statistics for the current session: total requests, tokens saved,
        compression ratio, cache hit rate, and per-tool breakdown.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}><em>No parameters</em></td>
          </tr>
        </tbody>
      </table>

      <h3>squeezr_set_mode</h3>
      <p>
        Changes the compression mode on the fly. Useful for temporarily disabling compression or
        switching between aggressive and light modes during a session.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>mode</code></td>
            <td><code>string</code></td>
            <td>One of: <code>&quot;full&quot;</code>, <code>&quot;light&quot;</code>, <code>&quot;aggressive&quot;</code>, <code>&quot;off&quot;</code></td>
          </tr>
        </tbody>
      </table>

      <h3>squeezr_config</h3>
      <p>
        Returns the current resolved configuration, merging global <code>squeezr.toml</code> with
        any per-project <code>.squeezr.toml</code> overrides.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}><em>No parameters</em></td>
          </tr>
        </tbody>
      </table>

      <h3>squeezr_habits</h3>
      <p>
        Returns learned compression habits and patterns observed from your usage. Shows which tools
        generate the most tokens, which patterns fire most frequently, and optimization suggestions.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}><em>No parameters</em></td>
          </tr>
        </tbody>
      </table>

      <h3>squeezr_stop</h3>
      <p>
        Stops the Squeezr proxy daemon. Equivalent to <code>squeezr stop</code>.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}><em>No parameters</em></td>
          </tr>
        </tbody>
      </table>

      <h3>squeezr_check_updates</h3>
      <p>
        Checks if a newer version of Squeezr is available on npm. Returns the current version and
        latest available version.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}><em>No parameters</em></td>
          </tr>
        </tbody>
      </table>

      <h3>squeezr_update</h3>
      <p>
        Updates Squeezr to the latest version. Stops the proxy, installs the update from npm, and
        restarts automatically. Equivalent to <code>squeezr update</code>.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}><em>No parameters</em></td>
          </tr>
        </tbody>
      </table>

      <h3>squeezr_set_project</h3>
      <p>
        Sets or changes the active project context. This affects which <code>.squeezr.toml</code>{" "}
        overrides are applied and how per-project stats are tracked.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>path</code></td>
            <td><code>string</code></td>
            <td>Absolute path to the project directory</td>
          </tr>
        </tbody>
      </table>

      <h2>How MCP integration works</h2>
      <p>
        When Squeezr starts, it registers itself as an MCP server. Claude Code and other MCP-compatible
        clients discover the tools automatically. The AI can then call any of these tools as part of
        a conversation &mdash; for example, checking stats, switching compression modes, or updating
        the proxy.
      </p>

      <h2>Example usage</h2>
      <p>In a Claude Code session, the AI might:</p>
      <ul>
        <li>Call <code>squeezr_stats</code> to report how many tokens were saved so far</li>
        <li>Call <code>squeezr_set_mode(&quot;aggressive&quot;)</code> when context is running low</li>
        <li>Call <code>squeezr_check_updates</code> to see if a new version is available</li>
        <li>Call <code>squeezr_habits</code> to suggest workflow optimizations</li>
        <li>Call <code>squeezr_set_project</code> when switching between repositories</li>
      </ul>
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        Squeezr expone un servidor MCP (Model Context Protocol) que permite a las herramientas de IA
        consultar y controlar el proxy programaticamente. Claude Code y otros clientes compatibles
        con MCP pueden usar estas herramientas directamente desde una conversacion.
      </p>

      <h2>Herramientas disponibles</h2>
      <p>
        El servidor MCP proporciona 9 herramientas. Cada herramienta es invocable por el agente IA
        durante una sesion.
      </p>

      <h3>squeezr_status</h3>
      <p>
        Devuelve el estado actual del proxy: si esta ejecutandose, tiempo de actividad, PID, puertos
        y version. Equivalente a ejecutar <code>squeezr status</code> desde el CLI.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parametro</th>
            <th>Tipo</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}><em>Sin parametros</em></td>
          </tr>
        </tbody>
      </table>

      <h3>squeezr_stats</h3>
      <p>
        Devuelve estadisticas de compresion de la sesion actual: total de peticiones, tokens ahorrados,
        ratio de compresion, tasa de aciertos de cache y desglose por herramienta.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parametro</th>
            <th>Tipo</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}><em>Sin parametros</em></td>
          </tr>
        </tbody>
      </table>

      <h3>squeezr_set_mode</h3>
      <p>
        Cambia el modo de compresion al vuelo. Util para desactivar la compresion temporalmente o
        cambiar entre modos agresivo y ligero durante una sesion.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parametro</th>
            <th>Tipo</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>mode</code></td>
            <td><code>string</code></td>
            <td>Uno de: <code>&quot;full&quot;</code>, <code>&quot;light&quot;</code>, <code>&quot;aggressive&quot;</code>, <code>&quot;off&quot;</code></td>
          </tr>
        </tbody>
      </table>

      <h3>squeezr_config</h3>
      <p>
        Devuelve la configuracion resuelta actual, combinando el <code>squeezr.toml</code> global con
        cualquier sobreescritura de <code>.squeezr.toml</code> por proyecto.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parametro</th>
            <th>Tipo</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}><em>Sin parametros</em></td>
          </tr>
        </tbody>
      </table>

      <h3>squeezr_habits</h3>
      <p>
        Devuelve habitos de compresion aprendidos y patrones observados de tu uso. Muestra que herramientas
        generan mas tokens, que patrones se activan con mas frecuencia, y sugerencias de optimizacion.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parametro</th>
            <th>Tipo</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}><em>Sin parametros</em></td>
          </tr>
        </tbody>
      </table>

      <h3>squeezr_stop</h3>
      <p>
        Detiene el daemon del proxy Squeezr. Equivalente a <code>squeezr stop</code>.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parametro</th>
            <th>Tipo</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}><em>Sin parametros</em></td>
          </tr>
        </tbody>
      </table>

      <h3>squeezr_check_updates</h3>
      <p>
        Verifica si hay una version mas nueva de Squeezr disponible en npm. Devuelve la version
        actual y la ultima version disponible.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parametro</th>
            <th>Tipo</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}><em>Sin parametros</em></td>
          </tr>
        </tbody>
      </table>

      <h3>squeezr_update</h3>
      <p>
        Actualiza Squeezr a la ultima version. Detiene el proxy, instala la actualizacion desde npm
        y reinicia automaticamente. Equivalente a <code>squeezr update</code>.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parametro</th>
            <th>Tipo</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}><em>Sin parametros</em></td>
          </tr>
        </tbody>
      </table>

      <h3>squeezr_set_project</h3>
      <p>
        Establece o cambia el contexto de proyecto activo. Esto afecta que sobreescrituras de{" "}
        <code>.squeezr.toml</code> se aplican y como se rastrean las estadisticas por proyecto.
      </p>
      <table>
        <thead>
          <tr>
            <th>Parametro</th>
            <th>Tipo</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>path</code></td>
            <td><code>string</code></td>
            <td>Ruta absoluta al directorio del proyecto</td>
          </tr>
        </tbody>
      </table>

      <h2>Como funciona la integracion MCP</h2>
      <p>
        Cuando Squeezr se inicia, se registra como un servidor MCP. Claude Code y otros clientes
        compatibles con MCP descubren las herramientas automaticamente. La IA puede entonces llamar
        cualquiera de estas herramientas como parte de una conversacion &mdash; por ejemplo,
        consultando estadisticas, cambiando modos de compresion o actualizando el proxy.
      </p>

      <h2>Ejemplo de uso</h2>
      <p>En una sesion de Claude Code, la IA podria:</p>
      <ul>
        <li>Llamar a <code>squeezr_stats</code> para reportar cuantos tokens se han ahorrado</li>
        <li>Llamar a <code>squeezr_set_mode(&quot;aggressive&quot;)</code> cuando el contexto se esta agotando</li>
        <li>Llamar a <code>squeezr_check_updates</code> para ver si hay una nueva version disponible</li>
        <li>Llamar a <code>squeezr_habits</code> para sugerir optimizaciones de flujo de trabajo</li>
        <li>Llamar a <code>squeezr_set_project</code> al cambiar entre repositorios</li>
      </ul>
    </>
  );
}

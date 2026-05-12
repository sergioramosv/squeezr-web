"use client";
import { DocPage } from "@/components/DocPage";
import { useI18n } from "@/lib/i18n";

export default function CliCommandsPage() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return (
    <DocPage title={isEs ? "Comandos CLI" : "CLI Commands"}>
      {isEs ? <Es /> : <En />}
    </DocPage>
  );
}

function En() {
  return (
    <>
      <p>
        The Squeezr CLI manages the proxy lifecycle. All commands are available
        after installing with <code>npm install -g squeezr-ai</code>.
      </p>

      <h2>squeezr setup</h2>
      <p>
        One-time setup that configures everything automatically: env vars, shell wrapper,
        auto-start, and TLS certificates. Run once after installation.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup`}</code>
      </pre>
      <p>What it does:</p>
      <ul>
        <li>Sets <code>ANTHROPIC_BASE_URL</code> and <code>GEMINI_API_BASE_URL</code> in your user environment.</li>
        <li>Installs a shell wrapper in PowerShell <code>$PROFILE</code> (Windows) or <code>~/.bashrc</code> / <code>~/.zshrc</code> (Linux/macOS/WSL) that auto-refreshes env vars without restarting the terminal.</li>
        <li>Registers auto-start (Task Scheduler on Windows, systemd on Linux, launchd on macOS).</li>
        <li>Generates and installs the MITM CA certificate for Codex support.</li>
      </ul>

      <h2>squeezr start</h2>
      <p>Starts the proxy as a background daemon.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr start`}</code>
      </pre>
      <p>
        Starts both the HTTP proxy (port 8080) and the MITM proxy (port 8081). If a version
        mismatch is detected after an update, it restarts automatically with the correct binary.
      </p>

      <h2>squeezr stop</h2>
      <p>Stops the running proxy daemon.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr stop`}</code>
      </pre>

      <h2>squeezr status</h2>
      <p>Shows whether the proxy is running, on which ports, and the PID.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr status`}</code>
      </pre>

      <h2>squeezr update</h2>
      <p>
        Kills the running proxy, installs the latest version from npm, and restarts automatically.
        Also runs setup to refresh env vars and shell wrappers.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr update`}</code>
      </pre>

      <h2>squeezr logs</h2>
      <p>Shows the last 50 log lines.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr logs`}</code>
      </pre>

      <h2>squeezr config</h2>
      <p>Prints the current resolved configuration.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr config`}</code>
      </pre>

      <h2>squeezr ports</h2>
      <p>Interactive prompt to change the HTTP proxy port and MITM proxy port. Updates env vars automatically.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr ports`}</code>
      </pre>

      <h2>squeezr gain</h2>
      <p>Estimates token savings for a directory by analysing the files in it.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr gain`}</code>
      </pre>
      <p>Options:</p>
      <ul>
        <li><code>--session</code> &mdash; Show savings from the current live session instead of estimating from files.</li>
        <li><code>--details</code> &mdash; Show per-request breakdown with individual compression ratios.</li>
      </ul>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr gain --session --details`}</code>
      </pre>

      <h2>squeezr tunnel</h2>
      <p>
        Opens a secure tunnel (via Cloudflare) that exposes your local Squeezr proxy to the internet.
        Useful for tools like Cursor IDE that cannot connect to <code>localhost</code> directly.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr tunnel`}</code>
      </pre>
      <p>
        Prints a public <code>https://</code> URL that you can use as your API base URL in tools
        that don&apos;t support localhost. The tunnel stays open until you press Ctrl+C or stop the proxy.
      </p>

      <h2>squeezr bypass</h2>
      <p>
        Toggles bypass mode. When enabled, all requests pass through uncompressed but are
        still logged for stats. Runtime-only &mdash; resets on proxy restart.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr bypass          # toggle bypass on/off
squeezr bypass --on     # enable bypass (disable compression)
squeezr bypass --off    # disable bypass (resume compression)`}</code>
      </pre>
      <p>
        Use this when you suspect compression is affecting AI responses. The proxy continues
        recording request counts and token sizes, so you can compare sessions with and without
        compression active.
      </p>

      <h2>squeezr discover</h2>
      <p>Detects which AI CLIs are installed on your system.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr discover`}</code>
      </pre>

      <h2>squeezr uninstall</h2>
      <p>
        Removes everything Squeezr installed: env vars, CA certificates, auto-start entries,
        and log files. Run <code>npm uninstall -g squeezr-ai</code> afterwards to remove the
        package.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr uninstall`}</code>
      </pre>

      <h2>squeezr version</h2>
      <p>Prints the installed version.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr version`}</code>
      </pre>

      <h2>Command summary</h2>
      <table>
        <thead>
          <tr>
            <th>Command</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>squeezr setup</code></td>
            <td>Configure env vars, shell wrapper, auto-start, CA trust</td>
          </tr>
          <tr>
            <td><code>squeezr start</code></td>
            <td>Start the proxy daemon</td>
          </tr>
          <tr>
            <td><code>squeezr stop</code></td>
            <td>Stop the proxy daemon</td>
          </tr>
          <tr>
            <td><code>squeezr status</code></td>
            <td>Show proxy status</td>
          </tr>
          <tr>
            <td><code>squeezr update</code></td>
            <td>Update to latest version and restart</td>
          </tr>
          <tr>
            <td><code>squeezr logs</code></td>
            <td>Show last 50 log lines</td>
          </tr>
          <tr>
            <td><code>squeezr config</code></td>
            <td>Print current configuration</td>
          </tr>
          <tr>
            <td><code>squeezr ports</code></td>
            <td>Change HTTP and MITM proxy ports</td>
          </tr>
          <tr>
            <td><code>squeezr gain</code></td>
            <td>Estimate token savings (supports --session, --details)</td>
          </tr>
          <tr>
            <td><code>squeezr tunnel</code></td>
            <td>Open a public tunnel to the local proxy</td>
          </tr>
          <tr>
            <td><code>squeezr bypass</code></td>
            <td>Toggle bypass mode (skip compression, keep logging)</td>
          </tr>
          <tr>
            <td><code>squeezr discover</code></td>
            <td>Detect installed AI CLIs</td>
          </tr>
          <tr>
            <td><code>squeezr mcp install</code></td>
            <td>Register MCP server in Claude Code, Cursor, Windsurf, Cline</td>
          </tr>
          <tr>
            <td><code>squeezr uninstall</code></td>
            <td>Remove Squeezr completely</td>
          </tr>
          <tr>
            <td><code>squeezr version</code></td>
            <td>Print version</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        El CLI de Squeezr gestiona el ciclo de vida del proxy. Todos los comandos están disponibles
        después de instalar con <code>npm install -g squeezr-ai</code>.
      </p>

      <h2>squeezr setup</h2>
      <p>
        Configuración inicial única que configura todo automáticamente: variables de entorno,
        wrapper de shell, auto-inicio y certificados TLS. Ejecutar una vez después de la instalación.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup`}</code>
      </pre>
      <p>Qué hace:</p>
      <ul>
        <li>Establece <code>ANTHROPIC_BASE_URL</code> y <code>GEMINI_API_BASE_URL</code> en tu entorno de usuario.</li>
        <li>Instala un wrapper de shell en PowerShell <code>$PROFILE</code> (Windows) o <code>~/.bashrc</code> / <code>~/.zshrc</code> (Linux/macOS/WSL) que actualiza automáticamente las variables de entorno sin reiniciar la terminal.</li>
        <li>Registra auto-inicio (Task Scheduler en Windows, systemd en Linux, launchd en macOS).</li>
        <li>Genera e instala el certificado CA MITM para soporte de Codex.</li>
      </ul>

      <h2>squeezr start</h2>
      <p>Inicia el proxy como un daemon en segundo plano.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr start`}</code>
      </pre>
      <p>
        Inicia tanto el proxy HTTP (puerto 8080) como el proxy MITM (puerto 8081). Si se detecta
        una discrepancia de versión después de una actualización, se reinicia automáticamente con el binario correcto.
      </p>

      <h2>squeezr stop</h2>
      <p>Detiene el daemon del proxy en ejecución.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr stop`}</code>
      </pre>

      <h2>squeezr status</h2>
      <p>Muestra si el proxy está ejecutándose, en qué puertos y el PID.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr status`}</code>
      </pre>

      <h2>squeezr update</h2>
      <p>
        Detiene el proxy en ejecución, instala la última versión desde npm y reinicia automáticamente.
        También ejecuta setup para actualizar variables de entorno y wrappers de shell.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr update`}</code>
      </pre>

      <h2>squeezr logs</h2>
      <p>Muestra las últimas 50 líneas de log.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr logs`}</code>
      </pre>

      <h2>squeezr config</h2>
      <p>Imprime la configuración resuelta actual.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr config`}</code>
      </pre>

      <h2>squeezr ports</h2>
      <p>Prompt interactivo para cambiar el puerto del proxy HTTP y el puerto del proxy MITM. Actualiza las variables de entorno automáticamente.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr ports`}</code>
      </pre>

      <h2>squeezr gain</h2>
      <p>Estima el ahorro de tokens para un directorio analizando los archivos que contiene.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr gain`}</code>
      </pre>
      <p>Opciones:</p>
      <ul>
        <li><code>--session</code> &mdash; Muestra el ahorro de la sesión activa en vez de estimar desde archivos.</li>
        <li><code>--details</code> &mdash; Muestra desglose por petición con ratios de compresión individuales.</li>
      </ul>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr gain --session --details`}</code>
      </pre>

      <h2>squeezr tunnel</h2>
      <p>
        Abre un túnel seguro (via Cloudflare) que expone tu proxy Squeezr local a internet.
        Útil para herramientas como Cursor IDE que no pueden conectarse a <code>localhost</code> directamente.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr tunnel`}</code>
      </pre>
      <p>
        Imprime una URL pública <code>https://</code> que puedes usar como URL base de API en herramientas
        que no soportan localhost. El túnel permanece abierto hasta que presiones Ctrl+C o detengas el proxy.
      </p>

      <h2>squeezr bypass</h2>
      <p>
        Activa o desactiva el modo bypass. Cuando esta activado, las peticiones pasan sin
        comprimir pero se siguen registrando en las estadisticas. Solo dura en runtime &mdash;
        se reinicia al reiniciar el proxy.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr bypass          # alternar bypass
squeezr bypass --on     # activar bypass (desactivar compresion)
squeezr bypass --off    # desactivar bypass (reanudar compresion)`}</code>
      </pre>

      <h2>squeezr discover</h2>
      <p>Detecta qué CLIs de IA están instalados en tu sistema.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr discover`}</code>
      </pre>

      <h2>squeezr uninstall</h2>
      <p>
        Elimina todo lo que Squeezr instaló: variables de entorno, certificados CA, entradas de
        auto-inicio y archivos de log. Ejecuta <code>npm uninstall -g squeezr-ai</code> después para eliminar
        el paquete.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr uninstall`}</code>
      </pre>

      <h2>squeezr version</h2>
      <p>Imprime la versión instalada.</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr version`}</code>
      </pre>

      <h2>Resumen de comandos</h2>
      <table>
        <thead>
          <tr>
            <th>Comando</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>squeezr setup</code></td>
            <td>Configurar variables de entorno, wrapper de shell, auto-inicio, certificado CA</td>
          </tr>
          <tr>
            <td><code>squeezr start</code></td>
            <td>Iniciar el daemon del proxy</td>
          </tr>
          <tr>
            <td><code>squeezr stop</code></td>
            <td>Detener el daemon del proxy</td>
          </tr>
          <tr>
            <td><code>squeezr status</code></td>
            <td>Mostrar estado del proxy</td>
          </tr>
          <tr>
            <td><code>squeezr update</code></td>
            <td>Actualizar a la última versión y reiniciar</td>
          </tr>
          <tr>
            <td><code>squeezr logs</code></td>
            <td>Mostrar las últimas 50 líneas de log</td>
          </tr>
          <tr>
            <td><code>squeezr config</code></td>
            <td>Imprimir configuración actual</td>
          </tr>
          <tr>
            <td><code>squeezr ports</code></td>
            <td>Cambiar puertos del proxy HTTP y MITM</td>
          </tr>
          <tr>
            <td><code>squeezr gain</code></td>
            <td>Estimar ahorro de tokens (soporta --session, --details)</td>
          </tr>
          <tr>
            <td><code>squeezr tunnel</code></td>
            <td>Abrir un túnel público al proxy local</td>
          </tr>
          <tr>
            <td><code>squeezr bypass</code></td>
            <td>Alternar modo bypass (desactivar compresion, mantener logging)</td>
          </tr>
          <tr>
            <td><code>squeezr discover</code></td>
            <td>Detectar CLIs de IA instalados</td>
          </tr>
          <tr>
            <td><code>squeezr mcp install</code></td>
            <td>Registrar servidor MCP en Claude Code, Cursor, Windsurf, Cline</td>
          </tr>
          <tr>
            <td><code>squeezr uninstall</code></td>
            <td>Eliminar Squeezr completamente</td>
          </tr>
          <tr>
            <td><code>squeezr version</code></td>
            <td>Imprimir versión</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

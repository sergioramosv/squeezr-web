"use client";
import { DocPage } from "@/components/DocPage";
import { useI18n } from "@/lib/i18n";

export default function TroubleshootingPage() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return (
    <DocPage title={isEs ? "Solucion de problemas" : "Troubleshooting"}>
      {isEs ? <Es /> : <En />}
    </DocPage>
  );
}

function En() {
  return (
    <>
      <p>
        Common issues and their solutions. Check logs first with{" "}
        <code>squeezr logs</code>, then look for your issue below.
      </p>

      <h2>502 errors / Claude Code can&apos;t reach the API</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>Claude Code reports a 502 Bad Gateway or connection error.</li>
        <li>The proxy is running but requests fail.</li>
      </ul>
      <h3>Most likely cause: HTTPS_PROXY set globally</h3>
      <p>
        If <code>HTTPS_PROXY</code> is set in your global environment (e.g. via{" "}
        <code>setx</code> on Windows or in your shell profile), it routes <strong>all</strong>{" "}
        HTTPS traffic &mdash; including Claude Code &mdash; through the MITM proxy on port 8081,
        which is only designed for Codex WebSocket traffic. This will cause 502s for Claude Code.
      </p>
      <p>
        Fix: remove <code>HTTPS_PROXY</code> from your global environment. Only set it
        per-session in the terminal where you run Codex:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Windows — remove the global registry entry
reg delete HKCU\Environment /v HTTPS_PROXY /f

# Then set only when running Codex
$env:HTTPS_PROXY = "http://localhost:8081"
codex`}</code>
      </pre>

      <h2>Proxy not running</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>Your coding tool reports a connection error or timeout.</li>
        <li><code>squeezr status</code> shows &quot;not running&quot;.</li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>Start the proxy: <code>squeezr start</code></li>
        <li>
          Verify Node.js version: <code>node --version</code> (must be 18+; Node.js 24 is
          supported).
        </li>
        <li>
          Check logs for errors: <code>squeezr logs</code>
        </li>
      </ol>

      <h2>Port conflicts</h2>
      <h3>Symptoms</h3>
      <ul>
        <li><code>Error: listen EADDRINUSE: address already in use :::8080</code></li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>
          Stop any existing Squeezr process: <code>squeezr stop</code>, then{" "}
          <code>squeezr start</code>.
        </li>
        <li>
          Change the port interactively: <code>squeezr ports</code>
        </li>
        <li>
          Or edit <code>squeezr.toml</code>:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[proxy]
port = 9090
mitm_port = 9091`}</code>
          </pre>
        </li>
      </ol>

      <h2>Env vars not applying after setup/update</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>After <code>squeezr setup</code> or <code>squeezr update</code>, the old{" "}
        <code>ANTHROPIC_BASE_URL</code> is still active.</li>
        <li>Claude Code goes directly to the Anthropic API, bypassing Squeezr.</li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>
          <strong>Open a new terminal.</strong> The shell wrapper installed by{" "}
          <code>squeezr setup</code> auto-refreshes env vars, but only after the wrapper is
          loaded. If you just ran setup for the first time, open a new terminal once to activate it.
        </li>
        <li>
          Or source your shell profile manually:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`# bash/zsh
source ~/.bashrc

# PowerShell
. $PROFILE`}</code>
          </pre>
        </li>
      </ol>

      <h2>Stale &quot;update available&quot; banner after squeezr update</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>
          After running <code>squeezr update</code>, the proxy still shows the old version or
          the update banner keeps appearing.
        </li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>
          Run <code>squeezr stop</code> then <code>squeezr start</code> to ensure the new
          binary is running.
        </li>
        <li>
          If problems persist, do a clean reinstall:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`squeezr uninstall
npm uninstall -g squeezr-ai
npm install -g squeezr-ai
squeezr setup
squeezr start`}</code>
          </pre>
        </li>
      </ol>

      <h2>Codex TLS certificate errors</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>Codex reports a certificate error when connecting to chatgpt.com.</li>
        <li>TLS handshake failure in Codex logs.</li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>
          Re-run setup to reinstall the CA certificate:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`squeezr setup`}</code>
          </pre>
        </li>
        <li>
          On Windows, the CA is imported into the Windows Certificate Store. Restart Codex after
          setup if the certificate was just installed.
        </li>
        <li>
          On macOS/Linux/WSL, verify <code>NODE_EXTRA_CA_CERTS</code> points to the bundle:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`echo $NODE_EXTRA_CA_CERTS
# should print ~/.squeezr/mitm-ca/bundle.crt`}</code>
          </pre>
        </li>
      </ol>

      <h2>Node.js v24 compatibility</h2>
      <p>
        Squeezr is fully compatible with Node.js v24. If you see{" "}
        <code>UND_ERR_NOT_SUPPORTED</code> errors with older versions of Squeezr, update to the
        latest version:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr update`}</code>
      </pre>

      <h2>Compression too aggressive</h2>
      <h3>Symptoms</h3>
      <ul>
        <li>The model asks to re-read files it should have in context.</li>
        <li>The model misses errors or important details in compressed output.</li>
      </ul>
      <h3>Solutions</h3>
      <ol>
        <li>
          Raise the compression threshold (compress less):
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
threshold = 1500`}</code>
          </pre>
        </li>
        <li>
          Skip specific tools:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
skip_tools = ["Read"]`}</code>
          </pre>
        </li>
        <li>
          Disable adaptive compression:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[adaptive]
enabled = false`}</code>
          </pre>
        </li>
        <li>
          Skip compression for a single command by adding <code># squeezr:skip</code> to the
          Bash command.
        </li>
      </ol>

      <h2>Getting help</h2>
      <p>
        If none of the above solutions work:
      </p>
      <ol>
        <li>Run <code>squeezr logs</code> and copy the relevant output.</li>
        <li>Check your env vars: <code>echo $ANTHROPIC_BASE_URL</code></li>
        <li>
          Open an issue on{" "}
          <a href="https://github.com/sergioramosv/Squeezr" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{" "}
          with the log output, your config (with API keys removed), and a description of the
          problem.
        </li>
      </ol>
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        Problemas comunes y sus soluciones. Revisa los logs primero con{" "}
        <code>squeezr logs</code>, luego busca tu problema a continuacion.
      </p>

      <h2>Errores 502 / Claude Code no puede alcanzar la API</h2>
      <h3>Sintomas</h3>
      <ul>
        <li>Claude Code reporta un error 502 Bad Gateway o de conexion.</li>
        <li>El proxy esta en ejecucion pero las solicitudes fallan.</li>
      </ul>
      <h3>Causa mas probable: HTTPS_PROXY configurado globalmente</h3>
      <p>
        Si <code>HTTPS_PROXY</code> esta configurado en tu entorno global (por ejemplo, via{" "}
        <code>setx</code> en Windows o en el perfil de tu shell), enruta <strong>todo</strong>{" "}
        el trafico HTTPS &mdash; incluyendo Claude Code &mdash; a traves del proxy MITM en el puerto 8081,
        que solo esta disenado para trafico WebSocket de Codex. Esto causara errores 502 en Claude Code.
      </p>
      <p>
        Solucion: elimina <code>HTTPS_PROXY</code> de tu entorno global. Solo configuralo
        por sesion en la terminal donde ejecutas Codex:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Windows — remove the global registry entry
reg delete HKCU\Environment /v HTTPS_PROXY /f

# Then set only when running Codex
$env:HTTPS_PROXY = "http://localhost:8081"
codex`}</code>
      </pre>

      <h2>El proxy no esta en ejecucion</h2>
      <h3>Sintomas</h3>
      <ul>
        <li>Tu herramienta de codigo reporta un error de conexion o timeout.</li>
        <li><code>squeezr status</code> muestra &quot;not running&quot;.</li>
      </ul>
      <h3>Soluciones</h3>
      <ol>
        <li>Inicia el proxy: <code>squeezr start</code></li>
        <li>
          Verifica la version de Node.js: <code>node --version</code> (debe ser 18+; Node.js 24 es
          compatible).
        </li>
        <li>
          Revisa los logs en busca de errores: <code>squeezr logs</code>
        </li>
      </ol>

      <h2>Conflictos de puertos</h2>
      <h3>Sintomas</h3>
      <ul>
        <li><code>Error: listen EADDRINUSE: address already in use :::8080</code></li>
      </ul>
      <h3>Soluciones</h3>
      <ol>
        <li>
          Detiene cualquier proceso de Squeezr existente: <code>squeezr stop</code>, luego{" "}
          <code>squeezr start</code>.
        </li>
        <li>
          Cambia el puerto interactivamente: <code>squeezr ports</code>
        </li>
        <li>
          O edita <code>squeezr.toml</code>:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[proxy]
port = 9090
mitm_port = 9091`}</code>
          </pre>
        </li>
      </ol>

      <h2>Las variables de entorno no se aplican despues de setup/update</h2>
      <h3>Sintomas</h3>
      <ul>
        <li>Despues de <code>squeezr setup</code> o <code>squeezr update</code>, el antiguo{" "}
        <code>ANTHROPIC_BASE_URL</code> sigue activo.</li>
        <li>Claude Code va directamente a la API de Anthropic, saltandose Squeezr.</li>
      </ul>
      <h3>Soluciones</h3>
      <ol>
        <li>
          <strong>Abre una nueva terminal.</strong> El shell wrapper instalado por{" "}
          <code>squeezr setup</code> refresca automaticamente las variables de entorno, pero solo despues de que se
          cargue el wrapper. Si acabas de ejecutar setup por primera vez, abre una nueva terminal para activarlo.
        </li>
        <li>
          O recarga el perfil de tu shell manualmente:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`# bash/zsh
source ~/.bashrc

# PowerShell
. $PROFILE`}</code>
          </pre>
        </li>
      </ol>

      <h2>Banner de &quot;update available&quot; obsoleto despues de squeezr update</h2>
      <h3>Sintomas</h3>
      <ul>
        <li>
          Despues de ejecutar <code>squeezr update</code>, el proxy sigue mostrando la version anterior o
          el banner de actualizacion sigue apareciendo.
        </li>
      </ul>
      <h3>Soluciones</h3>
      <ol>
        <li>
          Ejecuta <code>squeezr stop</code> y luego <code>squeezr start</code> para asegurar que el nuevo
          binario este en ejecucion.
        </li>
        <li>
          Si el problema persiste, haz una reinstalacion limpia:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`squeezr uninstall
npm uninstall -g squeezr-ai
npm install -g squeezr-ai
squeezr setup
squeezr start`}</code>
          </pre>
        </li>
      </ol>

      <h2>Errores de certificado TLS de Codex</h2>
      <h3>Sintomas</h3>
      <ul>
        <li>Codex reporta un error de certificado al conectarse a chatgpt.com.</li>
        <li>Fallo en el handshake TLS en los logs de Codex.</li>
      </ul>
      <h3>Soluciones</h3>
      <ol>
        <li>
          Vuelve a ejecutar setup para reinstalar el certificado CA:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`squeezr setup`}</code>
          </pre>
        </li>
        <li>
          En Windows, el CA se importa al Windows Certificate Store. Reinicia Codex despues de
          setup si el certificado acaba de ser instalado.
        </li>
        <li>
          En macOS/Linux/WSL, verifica que <code>NODE_EXTRA_CA_CERTS</code> apunte al bundle:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`echo $NODE_EXTRA_CA_CERTS
# should print ~/.squeezr/mitm-ca/bundle.crt`}</code>
          </pre>
        </li>
      </ol>

      <h2>Compatibilidad con Node.js v24</h2>
      <p>
        Squeezr es totalmente compatible con Node.js v24. Si ves errores de{" "}
        <code>UND_ERR_NOT_SUPPORTED</code> con versiones anteriores de Squeezr, actualiza a la
        ultima version:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr update`}</code>
      </pre>

      <h2>Compresion demasiado agresiva</h2>
      <h3>Sintomas</h3>
      <ul>
        <li>El modelo pide volver a leer archivos que deberia tener en contexto.</li>
        <li>El modelo omite errores o detalles importantes en la salida comprimida.</li>
      </ul>
      <h3>Soluciones</h3>
      <ol>
        <li>
          Aumenta el umbral de compresion (comprimir menos):
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
threshold = 1500`}</code>
          </pre>
        </li>
        <li>
          Omitir herramientas especificas:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[compression]
skip_tools = ["Read"]`}</code>
          </pre>
        </li>
        <li>
          Desactivar la compresion adaptativa:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <code>{`[adaptive]
enabled = false`}</code>
          </pre>
        </li>
        <li>
          Omitir la compresion para un solo comando agregando <code># squeezr:skip</code> al
          comando Bash.
        </li>
      </ol>

      <h2>Obtener ayuda</h2>
      <p>
        Si ninguna de las soluciones anteriores funciona:
      </p>
      <ol>
        <li>Ejecuta <code>squeezr logs</code> y copia la salida relevante.</li>
        <li>Verifica tus variables de entorno: <code>echo $ANTHROPIC_BASE_URL</code></li>
        <li>
          Abre un issue en{" "}
          <a href="https://github.com/sergioramosv/Squeezr" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{" "}
          con la salida de los logs, tu configuracion (sin API keys) y una descripcion del
          problema.
        </li>
      </ol>
    </>
  );
}

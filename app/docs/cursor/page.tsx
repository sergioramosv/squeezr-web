"use client";
import { DocPage } from "@/components/DocPage";
import { useI18n } from "@/lib/i18n";

export default function CursorPage() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return (
    <DocPage title="Cursor IDE">
      {isEs ? <Es /> : <En />}
    </DocPage>
  );
}

function En() {
  return (
    <>
      <p>
        Squeezr can compress the context sent by Cursor&apos;s chat and agent modes, reducing token usage on every request.
        Tab completions (cursor-small) always go to Cursor&apos;s own infrastructure and cannot be intercepted.
      </p>

      <h2>Requirements</h2>
      <ul>
        <li>
          <strong>BYOK (Bring Your Own Key)</strong> — you must have your own OpenAI or Anthropic API key configured in
          Cursor. Cursor&apos;s built-in plan routes calls through Cursor&apos;s servers, not your machine, so{" "}
          <code>localhost</code> is unreachable.
        </li>
        <li>
          <strong>Override Base URL</strong> — Cursor must be set to call your endpoint instead of the default API.
        </li>
      </ul>

      <h2>What gets intercepted</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Intercepted</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Chat (Ask mode, Cmd+L)</td>
            <td>✅ Yes</td>
          </tr>
          <tr>
            <td>Agent mode</td>
            <td>✅ Yes</td>
          </tr>
          <tr>
            <td>Cmd+K (inline edit)</td>
            <td>✅ Yes</td>
          </tr>
          <tr>
            <td>Tab completions</td>
            <td>❌ No — always go to Cursor&apos;s infra</td>
          </tr>
        </tbody>
      </table>

      <h2>Step 1 — Start Squeezr</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr start
squeezr status   # must say "running"`}</code>
      </pre>

      <h2>Step 2 — Try localhost first</h2>
      <p>
        Open Cursor → <code>Cmd+Shift+J</code> (Settings) → <strong>Models</strong>.
      </p>
      <ol>
        <li>
          Add your API key — OpenAI (<code>sk-...</code>) or Anthropic (<code>sk-ant-...</code>).
        </li>
        <li>
          Enable <strong>Override OpenAI Base URL</strong> and set it to:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto mt-2">
            <code>{`http://localhost:8080/v1`}</code>
          </pre>
        </li>
        <li>
          <strong>Disable all built-in Cursor models</strong> — toggle off{" "}
          <code>cursor-small</code>, <code>cursor-fast</code>, and any other Cursor-branded models.
          This is required because of a Cursor bug: the Override Base URL applies to all models,
          including built-in ones that can&apos;t authenticate with your key.
        </li>
        <li>
          Click <strong>Add model</strong> and add a model name matching your API key (e.g.{" "}
          <code>gpt-4o</code> or <code>claude-sonnet-4-5</code>).
        </li>
      </ol>
      <p>
        Open a Cursor chat (Cmd+L) and send a message. If it works — you&apos;re done.
      </p>
      <p>
        If you see a network error or CORS error, proceed to Step 3.
      </p>

      <h2>Step 3 — Use the tunnel (if localhost fails)</h2>
      <p>
        Some versions of Cursor route BYOK calls through their servers even when Override Base URL is
        set, making <code>localhost</code> unreachable. The tunnel exposes your local proxy as a public
        HTTPS URL.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr tunnel`}</code>
      </pre>
      <p>
        The command will print a panel like this:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`╔══════════════════════════════════════════════════════════════════╗
║  Tunnel active:  https://abc123.trycloudflare.com               ║
╠══════════════════════════════════════════════════════════════════╣
║  CURSOR SETUP                                                    ║
║                                                                  ║
║  Override OpenAI Base URL →  https://abc123.trycloudflare.com/v1║
╚══════════════════════════════════════════════════════════════════╝`}</code>
      </pre>
      <p>
        Replace <code>http://localhost:8080/v1</code> with the tunnel URL in Cursor Settings.
      </p>

      <h3>Tunnel notes</h3>
      <ul>
        <li>
          The tunnel URL changes every time you restart <code>squeezr tunnel</code>. You&apos;ll need to
          update Cursor Settings each time.
        </li>
        <li>
          The tunnel uses <strong>Cloudflare Quick Tunnel</strong> — free, no account required. It
          uses the <code>cloudflared</code> binary if installed, or falls back to{" "}
          <code>npx cloudflared@latest</code>.
        </li>
        <li>
          If <code>cloudflared</code> is not installed and <code>npx</code> fails, install it
          manually:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto mt-2">
            <code>{`# macOS
brew install cloudflared

# Windows
winget install Cloudflare.cloudflared

# Linux
# See https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/`}</code>
          </pre>
        </li>
      </ul>

      <h2>Troubleshooting</h2>

      <h3>&quot;Failed to fetch&quot; or network error</h3>
      <p>
        Verify <code>squeezr status</code> shows running. If using localhost, check that no firewall
        is blocking port 8080.
      </p>

      <h3>Built-in Cursor models stop working</h3>
      <p>
        This is a known Cursor bug — the Override Base URL applies to all models. Disable the
        built-in Cursor models (<code>cursor-small</code>, <code>cursor-fast</code>, etc.) in
        Settings → Models and use only your own model.
      </p>

      <h3>Anthropic Override activates automatically</h3>
      <p>
        When you add an Anthropic BYOK key, Cursor may automatically enable the Anthropic override
        URL. This is normal — just make sure the URL points to Squeezr (localhost or tunnel).
      </p>

      <h3>401 Unauthorized</h3>
      <p>
        The API key from Cursor is forwarded as-is. Check that your key is correct in Cursor
        Settings. Use <code>squeezr logs</code> to see incoming requests.
      </p>
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        Squeezr puede comprimir el contexto enviado por los modos de chat y agente de Cursor, reduciendo el uso de tokens en cada solicitud.
        Los completados de tab (cursor-small) siempre van a la infraestructura propia de Cursor y no pueden ser interceptados.
      </p>

      <h2>Requisitos</h2>
      <ul>
        <li>
          <strong>BYOK (Bring Your Own Key)</strong> — debes tener tu propia API key de OpenAI o Anthropic configurada en
          Cursor. El plan integrado de Cursor enruta las llamadas a traves de los servidores de Cursor, no de tu maquina, por lo que{" "}
          <code>localhost</code> es inalcanzable.
        </li>
        <li>
          <strong>Override Base URL</strong> — Cursor debe estar configurado para llamar a tu endpoint en lugar de la API por defecto.
        </li>
      </ul>

      <h2>Que se intercepta</h2>
      <table>
        <thead>
          <tr>
            <th>Funcionalidad</th>
            <th>Interceptado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Chat (Ask mode, Cmd+L)</td>
            <td>✅ Si</td>
          </tr>
          <tr>
            <td>Agent mode</td>
            <td>✅ Si</td>
          </tr>
          <tr>
            <td>Cmd+K (edicion inline)</td>
            <td>✅ Si</td>
          </tr>
          <tr>
            <td>Tab completions</td>
            <td>❌ No — siempre van a la infra de Cursor</td>
          </tr>
        </tbody>
      </table>

      <h2>Paso 1 — Iniciar Squeezr</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr start
squeezr status   # must say "running"`}</code>
      </pre>

      <h2>Paso 2 — Probar localhost primero</h2>
      <p>
        Abre Cursor → <code>Cmd+Shift+J</code> (Settings) → <strong>Models</strong>.
      </p>
      <ol>
        <li>
          Agrega tu API key — OpenAI (<code>sk-...</code>) o Anthropic (<code>sk-ant-...</code>).
        </li>
        <li>
          Activa <strong>Override OpenAI Base URL</strong> y configuralo a:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto mt-2">
            <code>{`http://localhost:8080/v1`}</code>
          </pre>
        </li>
        <li>
          <strong>Desactiva todos los modelos integrados de Cursor</strong> — desactiva{" "}
          <code>cursor-small</code>, <code>cursor-fast</code> y cualquier otro modelo de la marca Cursor.
          Esto es necesario debido a un bug de Cursor: el Override Base URL aplica a todos los modelos,
          incluyendo los integrados que no pueden autenticarse con tu key.
        </li>
        <li>
          Haz clic en <strong>Add model</strong> y agrega un nombre de modelo que coincida con tu API key (por ejemplo,{" "}
          <code>gpt-4o</code> o <code>claude-sonnet-4-5</code>).
        </li>
      </ol>
      <p>
        Abre un chat de Cursor (Cmd+L) y envia un mensaje. Si funciona — ya esta listo.
      </p>
      <p>
        Si ves un error de red o un error CORS, continua con el Paso 3.
      </p>

      <h2>Paso 3 — Usar el tunnel (si localhost falla)</h2>
      <p>
        Algunas versiones de Cursor enrutan las llamadas BYOK a traves de sus servidores incluso cuando Override Base URL esta
        configurado, haciendo que <code>localhost</code> sea inalcanzable. El tunnel expone tu proxy local como una URL
        HTTPS publica.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr tunnel`}</code>
      </pre>
      <p>
        El comando imprimira un panel como este:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`╔══════════════════════════════════════════════════════════════════╗
║  Tunnel active:  https://abc123.trycloudflare.com               ║
╠══════════════════════════════════════════════════════════════════╣
║  CURSOR SETUP                                                    ║
║                                                                  ║
║  Override OpenAI Base URL →  https://abc123.trycloudflare.com/v1║
╚══════════════════════════════════════════════════════════════════╝`}</code>
      </pre>
      <p>
        Reemplaza <code>http://localhost:8080/v1</code> con la URL del tunnel en la configuracion de Cursor.
      </p>

      <h3>Notas sobre el tunnel</h3>
      <ul>
        <li>
          La URL del tunnel cambia cada vez que reinicias <code>squeezr tunnel</code>. Necesitaras
          actualizar la configuracion de Cursor cada vez.
        </li>
        <li>
          El tunnel usa <strong>Cloudflare Quick Tunnel</strong> — gratuito, sin necesidad de cuenta. Usa
          el binario <code>cloudflared</code> si esta instalado, o recurre a{" "}
          <code>npx cloudflared@latest</code>.
        </li>
        <li>
          Si <code>cloudflared</code> no esta instalado y <code>npx</code> falla, instalalo
          manualmente:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto mt-2">
            <code>{`# macOS
brew install cloudflared

# Windows
winget install Cloudflare.cloudflared

# Linux
# See https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/`}</code>
          </pre>
        </li>
      </ul>

      <h2>Solucion de problemas</h2>

      <h3>&quot;Failed to fetch&quot; o error de red</h3>
      <p>
        Verifica que <code>squeezr status</code> muestre running. Si usas localhost, comprueba que ningun firewall
        este bloqueando el puerto 8080.
      </p>

      <h3>Los modelos integrados de Cursor dejan de funcionar</h3>
      <p>
        Este es un bug conocido de Cursor — el Override Base URL aplica a todos los modelos. Desactiva los
        modelos integrados de Cursor (<code>cursor-small</code>, <code>cursor-fast</code>, etc.) en
        Settings → Models y usa solo tu propio modelo.
      </p>

      <h3>El Override de Anthropic se activa automaticamente</h3>
      <p>
        Cuando agregas una key BYOK de Anthropic, Cursor puede activar automaticamente la URL de override
        de Anthropic. Esto es normal — solo asegurate de que la URL apunte a Squeezr (localhost o tunnel).
      </p>

      <h3>401 Unauthorized</h3>
      <p>
        La API key de Cursor se reenvía tal cual. Verifica que tu key sea correcta en la configuracion de
        Cursor. Usa <code>squeezr logs</code> para ver las solicitudes entrantes.
      </p>
    </>
  );
}

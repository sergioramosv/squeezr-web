"use client";
import { DocPage } from "@/components/DocPage";
import { useI18n } from "@/lib/i18n";

export default function CodexPage() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return (
    <DocPage title="Codex">
      {isEs ? <Es /> : <En />}
    </DocPage>
  );
}

function En() {
  return (
    <>
      <p>
        Codex uses WebSocket over TLS to connect to <code>chatgpt.com</code> with OAuth
        authentication. It cannot be proxied via a simple base URL override. Squeezr runs a
        TLS-terminating MITM proxy on port 8081 that intercepts and compresses WebSocket frames.
      </p>

      <h2>Setup</h2>
      <p>
        First, run <code>squeezr setup</code> if you haven&apos;t already. It generates the MITM CA
        certificate and imports it into the Windows Certificate Store (Windows) or creates a CA
        bundle (macOS/Linux/WSL) so Codex trusts the proxy&apos;s TLS.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup   # one-time — generates and installs the MITM CA
squeezr start`}</code>
      </pre>
      <p>
        Then, <strong>in the terminal where you run Codex</strong>, set <code>HTTPS_PROXY</code>:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Windows (PowerShell) — set only in this terminal, not globally
$env:HTTPS_PROXY = "http://localhost:8081"
codex

# Linux / macOS / WSL
HTTPS_PROXY=http://localhost:8081 codex`}</code>
      </pre>

      <h2>Important: do not set HTTPS_PROXY globally</h2>
      <p>
        Setting <code>HTTPS_PROXY</code> globally (e.g. via <code>setx</code> on Windows or in
        your shell profile) will route <strong>all</strong> HTTPS traffic through the MITM proxy,
        breaking tools like npm, git, and Claude Code. Always set it only in the terminal session
        where you run Codex.
      </p>

      <h2>How the MITM proxy works</h2>
      <p>
        The MITM proxy on port 8081 operates as a TLS-terminating CONNECT proxy:
      </p>
      <ul>
        <li>
          <strong>chatgpt.com traffic</strong> &mdash; TLS is terminated, WebSocket frames are
          inspected and compressed, then re-encrypted and forwarded to <code>chatgpt.com</code>.
        </li>
        <li>
          <strong>All other HTTPS traffic</strong> &mdash; passed through as a transparent TCP
          tunnel. The proxy establishes a CONNECT tunnel without intercepting or reading the
          content. No certificate is needed.
        </li>
      </ul>
      <p>
        This means only <code>chatgpt.com</code> traffic is intercepted. npm, git, and any other
        tool that happens to use <code>HTTPS_PROXY</code> will work normally.
      </p>

      <h2>CA certificate</h2>
      <p>
        To terminate TLS for <code>chatgpt.com</code>, Squeezr generates a local Certificate
        Authority (CA) and signs a certificate for <code>chatgpt.com</code> on the fly.{" "}
        <code>squeezr setup</code> installs this CA so your system trusts it:
      </p>
      <ul>
        <li>
          <strong>Windows:</strong> imported into the Windows Certificate Store at user level
          (no admin required). Rust-based CLIs like Codex use the Windows trust store
          automatically.
        </li>
        <li>
          <strong>macOS/Linux/WSL:</strong> CA bundle written to{" "}
          <code>~/.squeezr/mitm-ca/bundle.crt</code>. The <code>NODE_EXTRA_CA_CERTS</code> env
          var is set to point at this bundle.
        </li>
      </ul>

      <h2>WebSocket compression</h2>
      <p>
        Codex exchanges JSON frames over the WebSocket connection. Squeezr intercepts each
        frame and applies the same three-layer compression pipeline used for HTTP requests:
      </p>
      <ol>
        <li>Deterministic preprocessing (ANSI, deduplication, whitespace)</li>
        <li>Tool-specific patterns (git, test, build output)</li>
        <li>Adaptive pressure based on context window usage</li>
      </ol>
      <p>
        Compressed frames use the same subscription as your normal Codex session &mdash; no
        extra API cost.
      </p>

      <h2>Troubleshooting</h2>
      <h3>TLS certificate errors</h3>
      <p>
        If Codex reports a certificate error, re-run <code>squeezr setup</code> to reinstall the
        CA certificate. On Windows, you may need to restart Codex after the CA is imported.
      </p>

      <h3>Proxy not intercepting</h3>
      <p>
        Verify <code>HTTPS_PROXY</code> is set in the current terminal and the proxy is running:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr status
echo $HTTPS_PROXY    # should print http://localhost:8081`}</code>
      </pre>
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        Codex usa WebSocket sobre TLS para conectarse a <code>chatgpt.com</code> con
        autenticación OAuth. No se puede redirigir mediante un simple cambio de URL base. Squeezr
        ejecuta un proxy MITM con terminación TLS en el puerto 8081 que intercepta y comprime
        los frames WebSocket.
      </p>

      <h2>Configuración</h2>
      <p>
        Primero, ejecuta <code>squeezr setup</code> si aún no lo has hecho. Genera el certificado
        CA MITM y lo importa en el almacén de certificados de Windows (Windows) o crea un bundle
        de CA (macOS/Linux/WSL) para que Codex confíe en el TLS del proxy.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup   # one-time — generates and installs the MITM CA
squeezr start`}</code>
      </pre>
      <p>
        Luego, <strong>en la terminal donde ejecutas Codex</strong>, configura <code>HTTPS_PROXY</code>:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Windows (PowerShell) — set only in this terminal, not globally
$env:HTTPS_PROXY = "http://localhost:8081"
codex

# Linux / macOS / WSL
HTTPS_PROXY=http://localhost:8081 codex`}</code>
      </pre>

      <h2>Importante: no configures HTTPS_PROXY globalmente</h2>
      <p>
        Configurar <code>HTTPS_PROXY</code> globalmente (ej. con <code>setx</code> en Windows o en
        tu perfil de shell) redirigirá <strong>todo</strong> el tráfico HTTPS a través del proxy MITM,
        rompiendo herramientas como npm, git y Claude Code. Configúralo solo en la sesión de terminal
        donde ejecutas Codex.
      </p>

      <h2>Cómo funciona el proxy MITM</h2>
      <p>
        El proxy MITM en el puerto 8081 opera como un proxy CONNECT con terminación TLS:
      </p>
      <ul>
        <li>
          <strong>Tráfico de chatgpt.com</strong> &mdash; Se termina el TLS, los frames WebSocket se
          inspeccionan y comprimen, luego se re-encriptan y reenvían a <code>chatgpt.com</code>.
        </li>
        <li>
          <strong>Todo el resto del tráfico HTTPS</strong> &mdash; pasa como un túnel TCP transparente.
          El proxy establece un túnel CONNECT sin interceptar ni leer el contenido. No se necesita
          certificado.
        </li>
      </ul>
      <p>
        Esto significa que solo se intercepta el tráfico de <code>chatgpt.com</code>. npm, git y
        cualquier otra herramienta que use <code>HTTPS_PROXY</code> funcionarán con normalidad.
      </p>

      <h2>Certificado CA</h2>
      <p>
        Para terminar TLS de <code>chatgpt.com</code>, Squeezr genera una Autoridad de Certificación
        (CA) local y firma un certificado para <code>chatgpt.com</code> al vuelo.{" "}
        <code>squeezr setup</code> instala esta CA para que tu sistema confíe en ella:
      </p>
      <ul>
        <li>
          <strong>Windows:</strong> se importa en el almacén de certificados de Windows a nivel
          de usuario (no requiere administrador). Las CLIs basadas en Rust como Codex usan el
          almacén de confianza de Windows automáticamente.
        </li>
        <li>
          <strong>macOS/Linux/WSL:</strong> el bundle de CA se escribe en{" "}
          <code>~/.squeezr/mitm-ca/bundle.crt</code>. La variable de entorno{" "}
          <code>NODE_EXTRA_CA_CERTS</code> se configura para apuntar a este bundle.
        </li>
      </ul>

      <h2>Compresión WebSocket</h2>
      <p>
        Codex intercambia frames JSON a través de la conexión WebSocket. Squeezr intercepta cada
        frame y aplica el mismo pipeline de compresión de tres capas usado para peticiones HTTP:
      </p>
      <ol>
        <li>Preprocesamiento determinístico (ANSI, deduplicación, espacios en blanco)</li>
        <li>Patrones específicos por herramienta (git, test, salida de build)</li>
        <li>Presión adaptativa basada en el uso de la ventana de contexto</li>
      </ol>
      <p>
        Los frames comprimidos usan la misma suscripción que tu sesión normal de Codex &mdash; sin
        coste adicional de API.
      </p>

      <h2>Solución de problemas</h2>
      <h3>Errores de certificado TLS</h3>
      <p>
        Si Codex reporta un error de certificado, vuelve a ejecutar <code>squeezr setup</code> para
        reinstalar el certificado CA. En Windows, puede que necesites reiniciar Codex después de
        importar el CA.
      </p>

      <h3>El proxy no intercepta</h3>
      <p>
        Verifica que <code>HTTPS_PROXY</code> esté configurado en la terminal actual y que el proxy esté ejecutándose:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr status
echo $HTTPS_PROXY    # should print http://localhost:8081`}</code>
      </pre>
    </>
  );
}

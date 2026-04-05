"use client";
import { DocPage } from "@/components/DocPage";
import { useI18n } from "@/lib/i18n";

export default function QuickStartPage() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return (
    <DocPage title={isEs ? "Guia rapida" : "Quick Start"}>
      {isEs ? <Es /> : <En />}
    </DocPage>
  );
}

function En() {
  return (
    <>
      <p>
        Get Squeezr running in under two minutes. Two commands and you&apos;re done.
      </p>

      <h2>Step 1: Install</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`npm install -g squeezr-ai`}</code>
      </pre>

      <h2>Step 2: Run setup</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup`}</code>
      </pre>
      <p>
        That&apos;s it. <code>squeezr setup</code> handles everything automatically:
      </p>
      <ul>
        <li>Sets <code>ANTHROPIC_BASE_URL</code> and <code>GEMINI_API_BASE_URL</code> to point at the proxy.</li>
        <li>Installs a shell wrapper in your PowerShell profile (Windows) or <code>~/.bashrc</code> / <code>~/.zshrc</code> (Linux/macOS/WSL) so env vars refresh automatically after each <code>squeezr</code> command &mdash; no need to restart your terminal.</li>
        <li>Registers auto-start so the proxy comes back up after a reboot (Task Scheduler on Windows, systemd on Linux, launchd on macOS).</li>
        <li>Imports the MITM CA certificate so Codex trusts the proxy&apos;s TLS (Windows Certificate Store on Windows; <code>~/.squeezr/mitm-ca/bundle.crt</code> on macOS/Linux/WSL).</li>
      </ul>

      <h2>Step 3: Start the proxy</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr start`}</code>
      </pre>
      <p>
        Use your coding tool exactly as before &mdash; Squeezr compresses transparently.
      </p>

      <h2>What happens behind the scenes</h2>
      <p>
        Every request passes through a three-layer compression pipeline:
      </p>
      <ol>
        <li>
          <strong>System prompt compression</strong> &mdash; Claude Code&apos;s ~13KB system prompt is
          compressed once and cached. Subsequent requests reuse the cached version, saving ~3,000
          tokens per request.
        </li>
        <li>
          <strong>Deterministic preprocessing</strong> &mdash; Zero-latency rule-based transforms:
          ANSI escape codes stripped, repeated stack frames deduplicated, JSON whitespace collapsed,
          progress bars removed.
        </li>
        <li>
          <strong>Tool-specific patterns</strong> &mdash; 30+ rules matched against git, test
          runners, build output, package managers, infra tools, and more. Errors and actionable
          information are always preserved.
        </li>
      </ol>

      <h2>Typical savings</h2>
      <ul>
        <li><strong>Per tool result:</strong> 70&ndash;95% reduction depending on tool</li>
        <li><strong>Per session (2 hours):</strong> ~200K tokens &rarr; ~80K tokens (60% savings)</li>
        <li><strong>System prompt:</strong> ~13KB &rarr; ~600 tokens (cached)</li>
      </ul>

      <h2>Next steps</h2>
      <ul>
        <li>
          Read the guide for your specific tool:{" "}
          <a href="/docs/claude-code">Claude Code</a>,{" "}
          <a href="/docs/codex">Codex</a>,{" "}
          <a href="/docs/aider">Aider</a>,{" "}
          <a href="/docs/gemini-cli">Gemini CLI</a>,{" "}
          <a href="/docs/ollama">Ollama</a>.
        </li>
        <li>
          Learn how the{" "}
          <a href="/docs/compression-pipeline">compression pipeline</a> works.
        </li>
        <li>
          Explore the full{" "}
          <a href="/docs/configuration">configuration reference</a>.
        </li>
      </ul>
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        Pon Squeezr en marcha en menos de dos minutos. Dos comandos y listo.
      </p>

      <h2>Paso 1: Instalar</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`npm install -g squeezr-ai`}</code>
      </pre>

      <h2>Paso 2: Ejecutar setup</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup`}</code>
      </pre>
      <p>
        Eso es todo. <code>squeezr setup</code> se encarga de todo automaticamente:
      </p>
      <ul>
        <li>Establece <code>ANTHROPIC_BASE_URL</code> y <code>GEMINI_API_BASE_URL</code> para apuntar al proxy.</li>
        <li>Instala un wrapper de shell en tu perfil de PowerShell (Windows) o <code>~/.bashrc</code> / <code>~/.zshrc</code> (Linux/macOS/WSL) para que las variables de entorno se actualicen automaticamente despues de cada comando <code>squeezr</code> &mdash; sin necesidad de reiniciar la terminal.</li>
        <li>Registra el auto-inicio para que el proxy vuelva a arrancar tras un reinicio (Task Scheduler en Windows, systemd en Linux, launchd en macOS).</li>
        <li>Importa el certificado CA MITM para que Codex confie en el TLS del proxy (almacen de certificados de Windows en Windows; <code>~/.squeezr/mitm-ca/bundle.crt</code> en macOS/Linux/WSL).</li>
      </ul>

      <h2>Paso 3: Iniciar el proxy</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr start`}</code>
      </pre>
      <p>
        Usa tu herramienta de programacion exactamente como antes &mdash; Squeezr comprime de forma transparente.
      </p>

      <h2>Que ocurre entre bastidores</h2>
      <p>
        Cada solicitud pasa por un pipeline de compresion de tres capas:
      </p>
      <ol>
        <li>
          <strong>Compresion del system prompt</strong> &mdash; El system prompt de ~13KB de Claude Code se
          comprime una vez y se cachea. Las solicitudes posteriores reutilizan la version cacheada, ahorrando ~3.000
          tokens por solicitud.
        </li>
        <li>
          <strong>Preprocesamiento deterministico</strong> &mdash; Transformaciones basadas en reglas sin latencia:
          codigos de escape ANSI eliminados, stack frames repetidos deduplicados, espacios en blanco de JSON colapsados,
          barras de progreso eliminadas.
        </li>
        <li>
          <strong>Patrones especificos por herramienta</strong> &mdash; Mas de 30 reglas aplicadas contra git,
          ejecutores de tests, salida de builds, gestores de paquetes, herramientas de infraestructura y mas. Los errores y la
          informacion relevante siempre se preservan.
        </li>
      </ol>

      <h2>Ahorro tipico</h2>
      <ul>
        <li><strong>Por resultado de herramienta:</strong> 70&ndash;95% de reduccion dependiendo de la herramienta</li>
        <li><strong>Por sesion (2 horas):</strong> ~200K tokens &rarr; ~80K tokens (60% de ahorro)</li>
        <li><strong>System prompt:</strong> ~13KB &rarr; ~600 tokens (cacheado)</li>
      </ul>

      <h2>Siguientes pasos</h2>
      <ul>
        <li>
          Lee la guia de tu herramienta especifica:{" "}
          <a href="/docs/claude-code">Claude Code</a>,{" "}
          <a href="/docs/codex">Codex</a>,{" "}
          <a href="/docs/aider">Aider</a>,{" "}
          <a href="/docs/gemini-cli">Gemini CLI</a>,{" "}
          <a href="/docs/ollama">Ollama</a>.
        </li>
        <li>
          Aprende como funciona el{" "}
          <a href="/docs/compression-pipeline">pipeline de compresion</a>.
        </li>
        <li>
          Explora la{" "}
          <a href="/docs/configuration">referencia de configuracion</a> completa.
        </li>
      </ul>
    </>
  );
}

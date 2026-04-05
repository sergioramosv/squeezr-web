"use client";
import { DocPage } from "@/components/DocPage";
import { useI18n } from "@/lib/i18n";

export default function InstallationPage() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return (
    <DocPage title={isEs ? "Instalacion" : "Installation"}>
      {isEs ? <Es /> : <En />}
    </DocPage>
  );
}

function En() {
  return (
    <>
      <p>
        Squeezr is a transparent compression proxy for AI coding tools. It sits
        between your tool and the LLM API, reducing token usage by 60&ndash;95%
        with zero changes to your workflow.
      </p>

      <h2>Requirements</h2>
      <ul>
        <li>
          <strong>Node.js 18+</strong> &mdash; Squeezr is built on Node and
          requires version 18 or later (compatible with Node.js 24). Check with{" "}
          <code>node --version</code>.
        </li>
        <li>
          <strong>macOS, Linux, WSL, or Windows</strong> &mdash; all platforms
          are fully supported. Native Windows works out of the box.
        </li>
        <li>
          <strong>An API key</strong> for at least one supported provider
          (Anthropic, Google, or a local model via Ollama). Codex users authenticate
          via their ChatGPT subscription &mdash; no extra API key needed.
        </li>
      </ul>

      <h2>Install via npm</h2>
      <p>Install Squeezr globally so the CLI is available everywhere:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`npm install -g squeezr-ai`}</code>
      </pre>

      <p>Or with your preferred package manager:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# pnpm
pnpm add -g squeezr-ai

# yarn
yarn global add squeezr-ai`}</code>
      </pre>

      <h2>Verify the installation</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr version`}</code>
      </pre>

      <h2>Run setup</h2>
      <p>
        Run the one-time setup command. It configures everything automatically &mdash; no manual env var
        editing required:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup`}</code>
      </pre>
      <p>This command will:</p>
      <ol>
        <li>
          Set <code>ANTHROPIC_BASE_URL</code> and <code>GEMINI_API_BASE_URL</code> to point at the
          proxy (saved to your user environment, not just the current session).
        </li>
        <li>
          Install a shell wrapper in your PowerShell <code>$PROFILE</code> (Windows) or{" "}
          <code>~/.bashrc</code> / <code>~/.zshrc</code> (Linux/macOS/WSL) that auto-refreshes env
          vars after <code>squeezr start</code>, <code>squeezr setup</code>, or{" "}
          <code>squeezr update</code> &mdash; no terminal restart needed.
        </li>
        <li>
          Register auto-start so the proxy restarts after a reboot (Task Scheduler on Windows,
          systemd on Linux, launchd on macOS).
        </li>
        <li>
          <strong>Windows:</strong> import the MITM CA into the Windows Certificate Store (user-level,
          no admin required) so Rust-based CLIs like Codex trust the proxy&apos;s TLS certificates.
        </li>
        <li>
          <strong>macOS/Linux/WSL:</strong> generate a CA bundle at{" "}
          <code>~/.squeezr/mitm-ca/bundle.crt</code> and set <code>NODE_EXTRA_CA_CERTS</code>.
        </li>
      </ol>

      <h2>Updating</h2>
      <p>
        Use the built-in update command &mdash; it kills the running proxy, installs the latest
        version from npm, and restarts automatically:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr update`}</code>
      </pre>

      <h2>Uninstalling</h2>
      <p>
        Remove Squeezr completely including env vars, CA certificates, auto-start registration,
        and log files:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr uninstall`}</code>
      </pre>
      <p>
        Then uninstall the package:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`npm uninstall -g squeezr-ai`}</code>
      </pre>

      <h2>Next steps</h2>
      <p>
        Head to the <a href="/docs/quick-start">Quick Start</a> for an end-to-end walkthrough, or
        jump straight to the guide for your specific tool:{" "}
        <a href="/docs/claude-code">Claude Code</a>,{" "}
        <a href="/docs/codex">Codex</a>,{" "}
        <a href="/docs/aider">Aider</a>,{" "}
        <a href="/docs/gemini-cli">Gemini CLI</a>.
      </p>
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        Squeezr es un proxy de compresion transparente para herramientas de programacion con IA.
        Se situa entre tu herramienta y la API del LLM, reduciendo el uso de tokens entre un
        60&ndash;95% sin cambios en tu flujo de trabajo.
      </p>

      <h2>Requisitos</h2>
      <ul>
        <li>
          <strong>Node.js 18+</strong> &mdash; Squeezr esta construido sobre Node y
          requiere la version 18 o posterior (compatible con Node.js 24). Compruebalo con{" "}
          <code>node --version</code>.
        </li>
        <li>
          <strong>macOS, Linux, WSL o Windows</strong> &mdash; todas las plataformas
          estan completamente soportadas. Windows nativo funciona directamente.
        </li>
        <li>
          <strong>Una API key</strong> de al menos un proveedor soportado
          (Anthropic, Google, o un modelo local via Ollama). Los usuarios de Codex se autentican
          a traves de su suscripcion de ChatGPT &mdash; no se necesita una API key adicional.
        </li>
      </ul>

      <h2>Instalar via npm</h2>
      <p>Instala Squeezr globalmente para que el CLI este disponible en todas partes:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`npm install -g squeezr-ai`}</code>
      </pre>

      <p>O con tu gestor de paquetes preferido:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# pnpm
pnpm add -g squeezr-ai

# yarn
yarn global add squeezr-ai`}</code>
      </pre>

      <h2>Verificar la instalacion</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr version`}</code>
      </pre>

      <h2>Ejecutar setup</h2>
      <p>
        Ejecuta el comando de configuracion inicial. Configura todo automaticamente &mdash; no es necesario
        editar variables de entorno manualmente:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr setup`}</code>
      </pre>
      <p>Este comando:</p>
      <ol>
        <li>
          Establece <code>ANTHROPIC_BASE_URL</code> y <code>GEMINI_API_BASE_URL</code> para apuntar al
          proxy (guardado en tu entorno de usuario, no solo en la sesion actual).
        </li>
        <li>
          Instala un wrapper de shell en tu <code>$PROFILE</code> de PowerShell (Windows) o{" "}
          <code>~/.bashrc</code> / <code>~/.zshrc</code> (Linux/macOS/WSL) que actualiza automaticamente
          las variables de entorno despues de <code>squeezr start</code>, <code>squeezr setup</code>, o{" "}
          <code>squeezr update</code> &mdash; no es necesario reiniciar la terminal.
        </li>
        <li>
          Registra el auto-inicio para que el proxy se reinicie tras un reinicio del sistema (Task Scheduler en Windows,
          systemd en Linux, launchd en macOS).
        </li>
        <li>
          <strong>Windows:</strong> importa la CA MITM en el almacen de certificados de Windows (nivel de usuario,
          sin necesidad de admin) para que los CLIs basados en Rust como Codex confien en los certificados TLS del proxy.
        </li>
        <li>
          <strong>macOS/Linux/WSL:</strong> genera un bundle de CA en{" "}
          <code>~/.squeezr/mitm-ca/bundle.crt</code> y establece <code>NODE_EXTRA_CA_CERTS</code>.
        </li>
      </ol>

      <h2>Actualizar</h2>
      <p>
        Usa el comando de actualizacion integrado &mdash; detiene el proxy en ejecucion, instala la ultima
        version desde npm y reinicia automaticamente:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr update`}</code>
      </pre>

      <h2>Desinstalar</h2>
      <p>
        Elimina Squeezr completamente incluyendo variables de entorno, certificados CA, registro de auto-inicio
        y archivos de log:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr uninstall`}</code>
      </pre>
      <p>
        Luego desinstala el paquete:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`npm uninstall -g squeezr-ai`}</code>
      </pre>

      <h2>Siguientes pasos</h2>
      <p>
        Ve a la <a href="/docs/quick-start">Guia rapida</a> para un recorrido completo, o
        salta directamente a la guia de tu herramienta especifica:{" "}
        <a href="/docs/claude-code">Claude Code</a>,{" "}
        <a href="/docs/codex">Codex</a>,{" "}
        <a href="/docs/aider">Aider</a>,{" "}
        <a href="/docs/gemini-cli">Gemini CLI</a>.
      </p>
    </>
  );
}

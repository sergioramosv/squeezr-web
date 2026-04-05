"use client";
import { DocPage } from "@/components/DocPage";
import { useI18n } from "@/lib/i18n";

export default function AiderPage() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return (
    <DocPage title="Aider">
      {isEs ? <Es /> : <En />}
    </DocPage>
  );
}

function En() {
  return (
    <>
      <p>
        Aider is an AI pair programming tool that works in the terminal. Squeezr supports both
        Aider with Anthropic models and Aider with OpenAI models.
      </p>

      <h2>Setup</h2>
      <p>
        Run <code>squeezr setup</code> first. It automatically sets{" "}
        <code>ANTHROPIC_BASE_URL=http://localhost:8080</code>.
      </p>

      <h3>Aider with Anthropic models (Claude)</h3>
      <p>
        <code>ANTHROPIC_BASE_URL</code> is already set by <code>squeezr setup</code>. Just
        run Aider as normal:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`aider --model claude-sonnet-4-5`}</code>
      </pre>

      <h3>Aider with OpenAI models</h3>
      <p>
        Set <code>openai_base_url</code> in your <code>.aider.conf.yml</code>:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# .aider.conf.yml
openai_base_url: http://localhost:8080`}</code>
      </pre>
      <p>Or via environment variable:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`OPENAI_BASE_URL=http://localhost:8080 aider --model gpt-4o`}</code>
      </pre>

      <h2>What gets compressed</h2>
      <p>
        Aider sends file contents, git diffs, and command outputs as part of its prompts.
        Squeezr compresses:
      </p>
      <ul>
        <li>
          <strong>Repository map</strong> &mdash; Aider&apos;s repo map can be very large.
          Squeezr deduplicates it across turns and summarizes the structure for large repos.
        </li>
        <li>
          <strong>File contents</strong> &mdash; Files added to the chat are compressed with
          cross-turn dedup (files read again in later turns are replaced with references).
        </li>
        <li>
          <strong>Git diffs</strong> &mdash; Diff output is compressed using the git-specific
          pattern matcher (1-line context, cap on log output).
        </li>
        <li>
          <strong>Command output</strong> &mdash; Test results, lint output, and build logs
          are pattern-matched and compressed.
        </li>
      </ul>

      <h2>Project-level configuration</h2>
      <p>
        Create a <code>.squeezr.toml</code> alongside your <code>.aider.conf.yml</code> to
        tune compression for that project:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# .squeezr.toml (in project root)
[compression]
threshold = 600
compress_conversation = true`}</code>
      </pre>

      <h2>Tips</h2>
      <ul>
        <li>
          Aider sessions can be very long. Squeezr&apos;s cross-turn dedup is especially
          valuable here &mdash; the same files are often re-sent many times.
        </li>
        <li>
          Use <code>squeezr status</code> to verify the proxy is running before starting
          an Aider session.
        </li>
        <li>
          If you use <code>/add</code> to add many large files, Squeezr will compress
          them more aggressively once the context window starts filling up.
        </li>
      </ul>
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        Aider es una herramienta de programación en pareja con IA que funciona en la terminal.
        Squeezr soporta tanto Aider con modelos de Anthropic como Aider con modelos de OpenAI.
      </p>

      <h2>Configuración</h2>
      <p>
        Ejecuta <code>squeezr setup</code> primero. Configura automáticamente{" "}
        <code>ANTHROPIC_BASE_URL=http://localhost:8080</code>.
      </p>

      <h3>Aider con modelos de Anthropic (Claude)</h3>
      <p>
        <code>ANTHROPIC_BASE_URL</code> ya está configurado por <code>squeezr setup</code>.
        Simplemente ejecuta Aider como siempre:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`aider --model claude-sonnet-4-5`}</code>
      </pre>

      <h3>Aider con modelos de OpenAI</h3>
      <p>
        Configura <code>openai_base_url</code> en tu <code>.aider.conf.yml</code>:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# .aider.conf.yml
openai_base_url: http://localhost:8080`}</code>
      </pre>
      <p>O mediante variable de entorno:</p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`OPENAI_BASE_URL=http://localhost:8080 aider --model gpt-4o`}</code>
      </pre>

      <h2>Qué se comprime</h2>
      <p>
        Aider envía contenido de archivos, diffs de git y salidas de comandos como parte de sus
        prompts. Squeezr comprime:
      </p>
      <ul>
        <li>
          <strong>Mapa del repositorio</strong> &mdash; El mapa de repositorio de Aider puede ser
          muy grande. Squeezr lo deduplica entre turnos y resume la estructura para repos grandes.
        </li>
        <li>
          <strong>Contenido de archivos</strong> &mdash; Los archivos añadidos al chat se comprimen
          con deduplicación entre turnos (los archivos leídos de nuevo en turnos posteriores se
          reemplazan con referencias).
        </li>
        <li>
          <strong>Diffs de git</strong> &mdash; La salida de diff se comprime usando el matcher
          de patrones específico de git (1 línea de contexto, límite en la salida de log).
        </li>
        <li>
          <strong>Salida de comandos</strong> &mdash; Resultados de tests, salida de lint y logs
          de build se procesan con reconocimiento de patrones y se comprimen.
        </li>
      </ul>

      <h2>Configuración a nivel de proyecto</h2>
      <p>
        Crea un <code>.squeezr.toml</code> junto a tu <code>.aider.conf.yml</code> para
        ajustar la compresión para ese proyecto:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# .squeezr.toml (in project root)
[compression]
threshold = 600
compress_conversation = true`}</code>
      </pre>

      <h2>Consejos</h2>
      <ul>
        <li>
          Las sesiones de Aider pueden ser muy largas. La deduplicación entre turnos de Squeezr
          es especialmente valiosa aquí &mdash; los mismos archivos se reenvían muchas veces.
        </li>
        <li>
          Usa <code>squeezr status</code> para verificar que el proxy está ejecutándose antes
          de iniciar una sesión de Aider.
        </li>
        <li>
          Si usas <code>/add</code> para añadir muchos archivos grandes, Squeezr los comprimirá
          más agresivamente una vez que la ventana de contexto empiece a llenarse.
        </li>
      </ul>
    </>
  );
}

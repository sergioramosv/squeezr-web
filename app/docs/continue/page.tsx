"use client";
import { DocPage } from "@/components/DocPage";
import { useI18n } from "@/lib/i18n";

export default function ContinuePage() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return (
    <DocPage title={isEs ? "Extension Continue" : "Continue Extension"}>
      {isEs ? <Es /> : <En />}
    </DocPage>
  );
}

function En() {
  return (
    <>
      <p>
        The <a href="https://www.continue.dev" target="_blank" rel="noopener noreferrer">Continue</a>{" "}
        extension for VS Code and JetBrains calls the AI API directly from the editor process, which
        runs on your machine. No tunnel is needed — <code>http://localhost:8080</code> works directly.
      </p>

      <h2>Setup</h2>
      <p>
        Make sure Squeezr is running first:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr start
squeezr status   # must say "running"`}</code>
      </pre>
      <p>
        Then edit <code>~/.continue/config.json</code> and add Squeezr as a model:
      </p>

      <h3>With an Anthropic key (Claude models)</h3>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "models": [
    {
      "title": "Claude via Squeezr",
      "provider": "openai",
      "model": "claude-sonnet-4-5",
      "apiKey": "sk-ant-YOUR_ANTHROPIC_KEY",
      "apiBase": "http://localhost:8080/v1"
    }
  ]
}`}</code>
      </pre>

      <h3>With an OpenAI key</h3>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "models": [
    {
      "title": "GPT-4o via Squeezr",
      "provider": "openai",
      "model": "gpt-4o",
      "apiKey": "sk-YOUR_OPENAI_KEY",
      "apiBase": "http://localhost:8080/v1"
    }
  ]
}`}</code>
      </pre>

      <h3>With a local model (Ollama)</h3>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "models": [
    {
      "title": "Llama via Squeezr",
      "provider": "openai",
      "model": "llama3.2",
      "apiKey": "local",
      "apiBase": "http://localhost:8080/v1"
    }
  ]
}`}</code>
      </pre>
      <p>
        Make sure your <code>squeezr.toml</code> has <code>upstream_url</code> pointing to Ollama:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`upstream_url = "http://localhost:11434"
compression_model = "llama3.2"`}</code>
      </pre>

      <h2>Restart VS Code</h2>
      <p>
        After editing <code>config.json</code>, reload or restart VS Code. The Continue panel will
        show your new model in the model selector.
      </p>

      <h2>Verifying compression is working</h2>
      <p>
        Open a long conversation in Continue, then check your savings:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr gain`}</code>
      </pre>

      <h2>JetBrains</h2>
      <p>
        The Continue plugin for JetBrains uses the same <code>~/.continue/config.json</code> file.
        The same config works — no additional changes needed.
      </p>

      <h2>Troubleshooting</h2>

      <h3>Connection refused on localhost:8080</h3>
      <p>
        Squeezr is not running. Start it with <code>squeezr start</code>.
      </p>

      <h3>401 Unauthorized</h3>
      <p>
        The <code>apiKey</code> in <code>config.json</code> is forwarded to the API as-is. Make sure
        it is a valid key for the model you selected.
      </p>

      <h3>Model not found / 404</h3>
      <p>
        The <code>model</code> field must match a model name that your API key has access to. For
        Anthropic, use the exact API model ID (e.g. <code>claude-sonnet-4-5</code>, not{" "}
        <code>Claude 3.5 Sonnet</code>).
      </p>
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        La extension <a href="https://www.continue.dev" target="_blank" rel="noopener noreferrer">Continue</a>{" "}
        para VS Code y JetBrains llama a la API de IA directamente desde el proceso del editor, que
        se ejecuta en tu maquina. No se necesita tunnel — <code>http://localhost:8080</code> funciona directamente.
      </p>

      <h2>Configuracion</h2>
      <p>
        Asegurate de que Squeezr este en ejecucion primero:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr start
squeezr status   # must say "running"`}</code>
      </pre>
      <p>
        Luego edita <code>~/.continue/config.json</code> y agrega Squeezr como modelo:
      </p>

      <h3>Con una key de Anthropic (modelos Claude)</h3>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "models": [
    {
      "title": "Claude via Squeezr",
      "provider": "openai",
      "model": "claude-sonnet-4-5",
      "apiKey": "sk-ant-YOUR_ANTHROPIC_KEY",
      "apiBase": "http://localhost:8080/v1"
    }
  ]
}`}</code>
      </pre>

      <h3>Con una key de OpenAI</h3>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "models": [
    {
      "title": "GPT-4o via Squeezr",
      "provider": "openai",
      "model": "gpt-4o",
      "apiKey": "sk-YOUR_OPENAI_KEY",
      "apiBase": "http://localhost:8080/v1"
    }
  ]
}`}</code>
      </pre>

      <h3>Con un modelo local (Ollama)</h3>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "models": [
    {
      "title": "Llama via Squeezr",
      "provider": "openai",
      "model": "llama3.2",
      "apiKey": "local",
      "apiBase": "http://localhost:8080/v1"
    }
  ]
}`}</code>
      </pre>
      <p>
        Asegurate de que tu <code>squeezr.toml</code> tenga <code>upstream_url</code> apuntando a Ollama:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`upstream_url = "http://localhost:11434"
compression_model = "llama3.2"`}</code>
      </pre>

      <h2>Reiniciar VS Code</h2>
      <p>
        Despues de editar <code>config.json</code>, recarga o reinicia VS Code. El panel de Continue
        mostrara tu nuevo modelo en el selector de modelos.
      </p>

      <h2>Verificar que la compresion funciona</h2>
      <p>
        Abre una conversacion larga en Continue, luego verifica tus ahorros:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr gain`}</code>
      </pre>

      <h2>JetBrains</h2>
      <p>
        El plugin de Continue para JetBrains usa el mismo archivo <code>~/.continue/config.json</code>.
        La misma configuracion funciona — no se necesitan cambios adicionales.
      </p>

      <h2>Solucion de problemas</h2>

      <h3>Conexion rechazada en localhost:8080</h3>
      <p>
        Squeezr no esta en ejecucion. Inicialo con <code>squeezr start</code>.
      </p>

      <h3>401 Unauthorized</h3>
      <p>
        El <code>apiKey</code> en <code>config.json</code> se reenvía a la API tal cual. Asegurate
        de que sea una key valida para el modelo que seleccionaste.
      </p>

      <h3>Modelo no encontrado / 404</h3>
      <p>
        El campo <code>model</code> debe coincidir con un nombre de modelo al que tu API key tenga acceso. Para
        Anthropic, usa el ID exacto del modelo de la API (por ejemplo, <code>claude-sonnet-4-5</code>, no{" "}
        <code>Claude 3.5 Sonnet</code>).
      </p>
    </>
  );
}

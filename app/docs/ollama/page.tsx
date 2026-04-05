"use client";
import { DocPage } from "@/components/DocPage";
import { useI18n } from "@/lib/i18n";

export default function OllamaPage() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return (
    <DocPage title="Ollama & LM Studio">
      {isEs ? <Es /> : <En />}
    </DocPage>
  );
}

function En() {
  return (
    <>
      <p>
        Ollama lets you run LLMs locally. While local models are free, they
        still benefit from Squeezr&apos;s compression &mdash; smaller prompts
        mean faster inference, lower memory usage, and better results within
        the model&apos;s context window.
      </p>

      <h2>How Squeezr detects Ollama</h2>
      <p>
        Squeezr detects Ollama automatically via transparent proxy &mdash; when it sees a
        dummy API key (e.g. <code>ollama</code> as the value of the{" "}
        <code>Authorization: Bearer</code> header) or a request targeting a local upstream,
        it routes through the local model server without requiring a real API key.
      </p>

      <h2>Setup</h2>
      <p>
        Configure the local upstream in <code>squeezr.toml</code> (next to the binary):
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[local]
enabled = true
upstream_url = "http://localhost:11434"
compression_model = "qwen2.5-coder:1.5b"`}</code>
      </pre>
      <p>
        Then start both services:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Start Ollama
ollama serve

# Start Squeezr
squeezr start`}</code>
      </pre>

      <h2>Using Ollama as the compression backend</h2>
      <p>
        With <code>compression_model</code> set, Squeezr uses the local Ollama model to compress
        large content blocks instead of calling an external API. This makes compression completely
        free when using Ollama for your main coding tool.
      </p>
      <p>
        Pull the compression model first:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`ollama pull qwen2.5-coder:1.5b`}</code>
      </pre>

      <h2>Why compress local model requests?</h2>
      <p>
        Even though local models are free, compression helps in several ways:
      </p>
      <ul>
        <li>
          <strong>Faster inference</strong> &mdash; Fewer input tokens means the model processes
          the prompt faster. This is especially noticeable with larger models.
        </li>
        <li>
          <strong>Context window</strong> &mdash; Local models often have smaller context windows
          (4K&ndash;32K). Compression lets you fit more conversation history within the limit.
        </li>
        <li>
          <strong>Memory usage</strong> &mdash; KV cache memory scales with input length. Shorter
          prompts reduce VRAM pressure.
        </li>
        <li>
          <strong>Quality</strong> &mdash; Removing noise and duplication helps the model focus
          on what matters, improving response quality.
        </li>
      </ul>
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        Ollama te permite ejecutar LLMs localmente. Aunque los modelos locales son gratuitos,
        aún se benefician de la compresión de Squeezr &mdash; prompts más pequeños significan
        inferencia más rápida, menor uso de memoria y mejores resultados dentro de la ventana
        de contexto del modelo.
      </p>

      <h2>Cómo Squeezr detecta Ollama</h2>
      <p>
        Squeezr detecta Ollama automáticamente mediante proxy transparente &mdash; cuando detecta
        una API key ficticia (ej. <code>ollama</code> como valor del header{" "}
        <code>Authorization: Bearer</code>) o una petición dirigida a un upstream local,
        la enruta a través del servidor de modelos local sin requerir una API key real.
      </p>

      <h2>Configuración</h2>
      <p>
        Configura el upstream local en <code>squeezr.toml</code> (junto al binario):
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[local]
enabled = true
upstream_url = "http://localhost:11434"
compression_model = "qwen2.5-coder:1.5b"`}</code>
      </pre>
      <p>
        Luego inicia ambos servicios:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Start Ollama
ollama serve

# Start Squeezr
squeezr start`}</code>
      </pre>

      <h2>Usar Ollama como backend de compresión</h2>
      <p>
        Con <code>compression_model</code> configurado, Squeezr usa el modelo local de Ollama para
        comprimir bloques de contenido grandes en lugar de llamar a una API externa. Esto hace que
        la compresión sea completamente gratuita al usar Ollama como tu herramienta de codificación
        principal.
      </p>
      <p>
        Descarga el modelo de compresión primero:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`ollama pull qwen2.5-coder:1.5b`}</code>
      </pre>

      <h2>Por qué comprimir peticiones de modelos locales?</h2>
      <p>
        Aunque los modelos locales son gratuitos, la compresión ayuda de varias formas:
      </p>
      <ul>
        <li>
          <strong>Inferencia más rápida</strong> &mdash; Menos tokens de entrada significa que el
          modelo procesa el prompt más rápido. Esto es especialmente notable con modelos más grandes.
        </li>
        <li>
          <strong>Ventana de contexto</strong> &mdash; Los modelos locales suelen tener ventanas de
          contexto más pequeñas (4K&ndash;32K). La compresión permite incluir más historial de
          conversación dentro del límite.
        </li>
        <li>
          <strong>Uso de memoria</strong> &mdash; La memoria de la KV cache escala con la longitud
          de entrada. Prompts más cortos reducen la presión sobre la VRAM.
        </li>
        <li>
          <strong>Calidad</strong> &mdash; Eliminar ruido y duplicación ayuda al modelo a enfocarse
          en lo importante, mejorando la calidad de las respuestas.
        </li>
      </ul>
    </>
  );
}

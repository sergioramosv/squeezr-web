"use client";
import { DocPage } from "@/components/DocPage";
import { useI18n } from "@/lib/i18n";

export default function CachingPage() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return (
    <DocPage title={isEs ? "Caché" : "Caching"}>
      {isEs ? <Es /> : <En />}
    </DocPage>
  );
}

function En() {
  return (
    <>
      <p>
        Squeezr uses an in-process cache to avoid re-compressing content it has already seen,
        plus a session-level expand store that holds original content for lossless retrieval.
      </p>

      <h2>Compression cache</h2>
      <p>
        Compressed results are stored in an LRU cache keyed by a deterministic MD5 hash of the
        original content. When the same tool result appears again (within the same session or
        across sessions), the cached compressed version is returned instantly without re-running
        the pipeline.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[cache]
enabled = true
max_entries = 1000`}</code>
      </pre>
      <p>
        The cache survives as long as the proxy process is running. It resets on{" "}
        <code>squeezr stop</code> / <code>squeezr start</code>.
      </p>

      <h2>KV cache warming</h2>
      <p>
        Squeezr uses deterministic MD5-based content IDs to keep compressed content prefix-stable
        across requests. This means the LLM&apos;s KV (key-value) cache &mdash; which stores
        attention computation results &mdash; can be reused across turns when the compressed prefix
        is identical, reducing compute at the API level.
      </p>

      <h2>Expand store</h2>
      <p>
        When content is compressed, the full original is stored in an in-memory expand store
        keyed by a short ID. When the model calls <code>squeezr_expand(id)</code>, the original
        is retrieved in under 5ms without any API call.
      </p>
      <ul>
        <li>Scoped to the current proxy session.</li>
        <li>Cleared on proxy restart.</li>
        <li>No explicit size limit &mdash; scales with number of compressed blocks in session.</li>
      </ul>

      <h2>Session cache summarization</h2>
      <p>
        After approximately 50 tool results in a session, older results are batch-summarized into
        a single compact block. This prevents the expand store from growing unbounded in very long
        sessions while keeping the most recent results fully accessible.
      </p>

      <h2>Cache accuracy</h2>
      <p>
        The cache is keyed on content hashes, so it will never serve stale compressed content.
        If a file changes between reads, the hash changes and the pipeline runs fresh. This makes
        the cache safe for use in active development where files change frequently.
      </p>

      <h2>Checking cache stats</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`curl http://localhost:8080/squeezr/stats`}</code>
      </pre>
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        Squeezr usa una caché en proceso para evitar re-comprimir contenido que ya ha visto,
        además de un almacén de expansión a nivel de sesión que guarda el contenido original
        para recuperación sin pérdida.
      </p>

      <h2>Caché de compresión</h2>
      <p>
        Los resultados comprimidos se almacenan en una caché LRU indexada por un hash MD5
        determinista del contenido original. Cuando el mismo resultado de herramienta aparece
        de nuevo (dentro de la misma sesión o entre sesiones), la versión comprimida cacheada
        se devuelve instantáneamente sin re-ejecutar el pipeline.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[cache]
enabled = true
max_entries = 1000`}</code>
      </pre>
      <p>
        La caché sobrevive mientras el proceso del proxy esté ejecutándose. Se reinicia con{" "}
        <code>squeezr stop</code> / <code>squeezr start</code>.
      </p>

      <h2>Calentamiento de caché KV</h2>
      <p>
        Squeezr usa IDs de contenido deterministas basados en MD5 para mantener el contenido
        comprimido estable en prefijo entre solicitudes. Esto significa que la caché KV (key-value)
        del LLM &mdash; que almacena resultados de cómputo de atención &mdash; puede reutilizarse
        entre turnos cuando el prefijo comprimido es idéntico, reduciendo el cómputo a nivel de API.
      </p>

      <h2>Almacén de expansión</h2>
      <p>
        Cuando el contenido se comprime, el original completo se almacena en un almacén de
        expansión en memoria indexado por un ID corto. Cuando el modelo llama a{" "}
        <code>squeezr_expand(id)</code>, el original se recupera en menos de 5ms sin ninguna
        llamada a API.
      </p>
      <ul>
        <li>Limitado a la sesión actual del proxy.</li>
        <li>Se limpia al reiniciar el proxy.</li>
        <li>Sin límite explícito de tamaño &mdash; escala con el número de bloques comprimidos en la sesión.</li>
      </ul>

      <h2>Resumen de caché de sesión</h2>
      <p>
        Después de aproximadamente 50 resultados de herramientas en una sesión, los resultados
        más antiguos se resumen en lote en un solo bloque compacto. Esto evita que el almacén
        de expansión crezca sin límite en sesiones muy largas mientras mantiene los resultados
        más recientes completamente accesibles.
      </p>

      <h2>Precisión de la caché</h2>
      <p>
        La caché se indexa por hashes de contenido, por lo que nunca servirá contenido comprimido
        obsoleto. Si un archivo cambia entre lecturas, el hash cambia y el pipeline se ejecuta
        desde cero. Esto hace que la caché sea segura para uso en desarrollo activo donde los
        archivos cambian frecuentemente.
      </p>

      <h2>Consultar estadísticas de caché</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`curl http://localhost:8080/squeezr/stats`}</code>
      </pre>
    </>
  );
}

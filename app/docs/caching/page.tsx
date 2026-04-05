import { DocPage } from "@/components/DocPage";

export default function CachingPage() {
  return (
    <DocPage title="Caching">
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
    </DocPage>
  );
}

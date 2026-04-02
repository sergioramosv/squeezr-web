import { DocPage } from "@/components/DocPage";

export default function CachingPage() {
  return (
    <DocPage title="Caching">
      <p>
        Squeezr uses a three-layer caching system to avoid re-compressing
        content it has already seen. This reduces latency and CPU usage while
        ensuring the expand store always has access to original content.
      </p>

      <h2>Cache architecture</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`Request
  |
  v
+-------------------+
| Layer 1: Session  |  In-memory KV store per session
| Cache (KV)        |  Fastest, cleared on session end
+-------------------+
  |  miss
  v
+-------------------+
| Layer 2: Compress |  Disk-based LRU cache
| Cache (Disk)      |  Persists across sessions
+-------------------+
  |  miss
  v
+-------------------+
| Layer 3: Expand   |  In-memory store for full
| Store             |  original content (per session)
+-------------------+
  |
  v
Run compression pipeline`}</code>
      </pre>

      <h2>Layer 1: Session cache (KV warming)</h2>
      <p>
        Each proxy session maintains an in-memory key-value store that maps
        content hashes to their compressed versions. When a tool result is
        compressed, the result is stored here.
      </p>
      <ul>
        <li>
          <strong>Key</strong>: SHA-256 hash of the original content.
        </li>
        <li>
          <strong>Value</strong>: The compressed output plus metadata (squeezr
          ID, compression ratio, pattern used).
        </li>
        <li>
          <strong>Lifetime</strong>: Lives for the duration of the coding
          session. Cleared when the conversation ends or the proxy restarts.
        </li>
        <li>
          <strong>Purpose</strong>: Instant lookups for content seen earlier in
          the same conversation. This is the main driver of cross-turn
          deduplication.
        </li>
      </ul>
      <p>
        The session cache is also used for &quot;KV warming&quot; &mdash; when
        content from a previous turn reappears, the compressed version is
        served immediately without re-running the pipeline.
      </p>

      <h2>Layer 2: Compression cache (disk LRU)</h2>
      <p>
        The disk cache persists compressed results across sessions. If you
        read the same file in two different conversations, the second
        conversation gets the cached compression instantly.
      </p>
      <ul>
        <li>
          <strong>Location</strong>: <code>~/.cache/squeezr/</code> (configurable
          via <code>[cache].dir</code>).
        </li>
        <li>
          <strong>Eviction</strong>: LRU (Least Recently Used). When the cache
          exceeds <code>max_size_mb</code>, the oldest entries are evicted.
        </li>
        <li>
          <strong>TTL</strong>: Entries expire after <code>ttl</code> seconds
          (default: 24 hours). Expired entries are evicted on next access.
        </li>
        <li>
          <strong>Format</strong>: Each entry is a JSON file containing the
          compressed content, metadata, and the original content hash.
        </li>
      </ul>

      <h3>Configuration</h3>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[cache]
enabled = true
dir = "~/.cache/squeezr"
max_size_mb = 500
ttl = 86400
eviction = "lru"`}</code>
      </pre>

      <h2>Layer 3: Expand store (in-memory)</h2>
      <p>
        The expand store holds the full original content for every compressed
        block in the current session. When the model calls{" "}
        <code>squeezr_expand</code> with a block ID, the original content is
        served from this store.
      </p>
      <ul>
        <li>
          <strong>Key</strong>: The 6-character squeezr ID (e.g.,{" "}
          <code>a3f2b1</code>).
        </li>
        <li>
          <strong>Value</strong>: The full original content before compression.
        </li>
        <li>
          <strong>Lifetime</strong>: Lives for the duration of the session.
          IDs are unique per session to prevent collisions.
        </li>
        <li>
          <strong>Size limit</strong>: No explicit limit. In practice, this
          scales with the number of unique tool results compressed in the
          session.
        </li>
      </ul>

      <h2>Cache statistics</h2>
      <p>
        The <code>/squeezr/stats</code> endpoint includes cache metrics:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`curl http://localhost:8080/squeezr/stats`}</code>
      </pre>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`{
  "cache": {
    "sessionHits": 142,
    "sessionMisses": 38,
    "diskHits": 23,
    "diskMisses": 15,
    "diskSizeMb": 12.4,
    "expandStoreEntries": 67,
    "hitRate": "82.1%"
  }
}`}</code>
      </pre>

      <h2>Clearing the cache</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Clear disk cache
rm -rf ~/.cache/squeezr

# Session cache and expand store clear automatically
# when the proxy restarts
squeezr stop && squeezr start`}</code>
      </pre>

      <h2>Cache and accuracy</h2>
      <p>
        The cache is keyed on content hashes, so it will never serve stale
        compressed content. If a file changes between reads, the hash changes
        and the pipeline runs fresh. This makes the cache safe for use in
        active development where files change frequently.
      </p>
    </DocPage>
  );
}

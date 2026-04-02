import { DocPage } from "@/components/DocPage";

export default function CompressionPipelinePage() {
  return (
    <DocPage title="Compression Pipeline">
      <p>
        Squeezr processes each API request through a 7-layer compression
        pipeline. Each layer is independent and additive &mdash; content flows
        through all applicable layers in order.
      </p>

      <h2>Pipeline flow</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`Request from coding tool
         |
         v
  +------------------+
  | 1. System Prompt |  Cache & dedup system prompt across turns
  +------------------+
         |
         v
  +------------------+
  | 2. Cross-Turn    |  Dedup content seen in previous turns
  |    Dedup         |  (file reads, repeated tool results)
  +------------------+
         |
         v
  +------------------+
  | 3. ANSI Strip    |  Remove terminal color codes, escape
  |                  |  sequences, and control characters
  +------------------+
         |
         v
  +------------------+
  | 4. Tool Patterns |  Match against 30+ domain-specific
  |                  |  patterns (git, test, build, etc.)
  +------------------+
         |
         v
  +------------------+
  | 5. Line Dedup    |  Remove duplicate/near-duplicate lines
  |                  |  within a single content block
  +------------------+
         |
         v
  +------------------+
  | 6. AI Compress   |  For large unrecognized content, use a
  |                  |  small model to summarize preserving
  |                  |  actionable information
  +------------------+
         |
         v
  +------------------+
  | 7. Session Cache |  Cache compressed results for reuse
  |                  |  within the same session
  +------------------+
         |
         v
  Forward to LLM API`}</code>
      </pre>

      <h2>Layer 1: System prompt caching</h2>
      <p>
        AI coding tools include a large system prompt in every API request.
        For Claude Code, this can be 4,000+ tokens. Squeezr hashes the system
        prompt on the first request and replaces it with a compact reference
        on subsequent requests. The hash is included in a{" "}
        <code>[squeezr:cached-system-prompt]</code> marker so the behavior is
        transparent.
      </p>
      <p>
        This layer alone saves 4,000&ndash;8,000 tokens per turn after the
        first.
      </p>

      <h2>Layer 2: Cross-turn deduplication</h2>
      <p>
        Squeezr maintains a session-level content index. When a tool result
        contains content that was already sent in a previous turn (e.g., the
        same file read twice), the duplicate is replaced with a reference:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`[squeezr:dedup] Content already in context from turn 3
(file: src/auth.ts, 247 lines)`}</code>
      </pre>
      <p>
        The model can use the <code>squeezr_expand</code> tool to retrieve the
        full content if needed.
      </p>

      <h2>Layer 3: ANSI stripping</h2>
      <p>
        Terminal output often contains ANSI escape codes for colors, cursor
        movement, and formatting. These waste tokens and confuse models.
        Squeezr strips all ANSI sequences while preserving the text content.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Before (with ANSI codes)
\x1b[31mERROR\x1b[0m: Cannot find module \x1b[33m'./auth'\x1b[0m

# After (clean text)
ERROR: Cannot find module './auth'`}</code>
      </pre>

      <h2>Layer 4: Tool pattern matching</h2>
      <p>
        This is the core of Squeezr&apos;s compression. Over 30 patterns
        recognize common tool outputs and apply domain-specific compression:
      </p>
      <ul>
        <li>
          <strong>Git patterns</strong> &mdash; diff, log, status, blame. Diffs
          are compressed by keeping only changed lines and minimal context.
        </li>
        <li>
          <strong>Test runners</strong> &mdash; vitest, jest, pytest, cargo
          test, go test, playwright. Pass/fail summaries replace verbose output;
          only failures are preserved in full.
        </li>
        <li>
          <strong>Build tools</strong> &mdash; tsc, eslint, next build, webpack.
          Warning/error counts replace full listings.
        </li>
        <li>
          <strong>And more</strong> &mdash; See the{" "}
          <a href="/docs/patterns">full patterns reference</a>.
        </li>
      </ul>

      <h2>Layer 5: Line deduplication</h2>
      <p>
        Within a single content block, Squeezr identifies and collapses
        duplicate or near-duplicate lines. This is common in:
      </p>
      <ul>
        <li>Repeated import statements across file listings</li>
        <li>Log output with repeated patterns</li>
        <li>Directory listings with similar file structures</li>
      </ul>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Before: 50 similar lines
PASS src/tests/auth.test.ts
PASS src/tests/user.test.ts
PASS src/tests/api.test.ts
... (47 more)

# After: collapsed
PASS src/tests/auth.test.ts
... (49 more PASS results)`}</code>
      </pre>

      <h2>Layer 6: AI compression</h2>
      <p>
        For large content blocks that don&apos;t match any known pattern,
        Squeezr uses a small, fast model (e.g., Claude 3 Haiku) to generate a
        summary. The AI is instructed to:
      </p>
      <ul>
        <li>Preserve all errors, warnings, and actionable information.</li>
        <li>Keep file paths, line numbers, and identifiers.</li>
        <li>Remove boilerplate, verbose formatting, and repetition.</li>
        <li>Add a <code>[squeezr:ID]</code> marker for expand retrieval.</li>
      </ul>
      <p>
        AI compression is only triggered for content above{" "}
        <code>min_size</code> characters that wasn&apos;t already handled by
        pattern matching. The target output is capped at{" "}
        <code>max_output</code> characters.
      </p>

      <h2>Layer 7: Session caching</h2>
      <p>
        Compressed results are cached in a session-level key-value store keyed
        by a hash of the original content. If the same content appears again
        (within the same session or across sessions via the disk cache), the
        cached compressed version is returned instantly without re-running the
        pipeline.
      </p>
      <p>
        The cache also serves as the expand store &mdash; when the model calls{" "}
        <code>squeezr_expand</code>, the original content is retrieved from
        this cache.
      </p>

      <h2>Pipeline metrics</h2>
      <p>
        The <code>/squeezr/stats</code> endpoint reports per-layer metrics so
        you can see which layers contribute the most savings in your workflow.
      </p>
    </DocPage>
  );
}

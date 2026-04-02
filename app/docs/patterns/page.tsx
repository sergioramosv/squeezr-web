import { DocPage } from "@/components/DocPage";

export default function PatternsPage() {
  return (
    <DocPage title="Patterns">
      <p>
        Squeezr ships with 30+ built-in patterns that recognize common tool
        outputs and apply domain-specific compression. Each pattern knows what
        information is critical (errors, changed lines, actionable data) and
        what can be safely removed (boilerplate, verbose formatting,
        repetition).
      </p>

      <h2>Git patterns</h2>

      <h3>git diff</h3>
      <p>
        Compresses diff output by keeping only changed lines (+/-) with
        minimal context. File headers and unchanged context lines are trimmed.
        Binary file diffs are replaced with a one-line summary.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`# Before: 200 lines of diff with full context
# After:  45 lines with just changes and 1 line of context`}</code>
      </pre>

      <h3>git log</h3>
      <p>
        Collapses verbose log output into a compact format: hash (short),
        author, date, and first line of message. Full commit bodies and
        signatures are removed.
      </p>

      <h3>git status</h3>
      <p>
        Groups files by status (modified, added, deleted, untracked) and
        removes verbose help text. The branch/tracking info line is preserved.
      </p>

      <h3>git blame</h3>
      <p>
        Deduplicates repeated author/date prefixes and collapses contiguous
        blocks by the same author.
      </p>

      <h2>Test runner patterns</h2>

      <h3>Vitest / Jest</h3>
      <p>
        Replaces full test output with a pass/fail summary. Only failed tests
        are preserved in full with their error messages and stack traces.
        Pass counts, durations, and suite names are kept as a summary line.
      </p>

      <h3>Pytest</h3>
      <p>
        Compresses pytest output similarly: the summary line (X passed, Y
        failed) is kept, and only failure details are preserved. Verbose
        collection output and fixture setup are removed.
      </p>

      <h3>Cargo test (Rust)</h3>
      <p>
        Handles Rust test output format. Passing tests are collapsed; failing
        tests with their panic messages and backtraces are preserved.
      </p>

      <h3>Go test</h3>
      <p>
        Compresses <code>go test</code> output. PASS lines are collapsed; FAIL
        lines with their output are preserved. Build errors are always kept in
        full.
      </p>

      <h3>Playwright</h3>
      <p>
        E2E test output is compressed by keeping the test name and
        result (pass/fail). For failures, the error message, expected/received
        values, and screenshot paths are preserved.
      </p>

      <h2>Build tool patterns</h2>

      <h3>TypeScript (tsc)</h3>
      <p>
        Compresses TypeScript compiler output. Error messages with file/line
        references are preserved. &quot;Found N errors&quot; summary is kept.
        Verbose declaration output is removed.
      </p>

      <h3>ESLint</h3>
      <p>
        Groups ESLint output by rule. Error-level issues are preserved in
        full. Warning-level issues are collapsed into a count per rule.
        The summary line with totals is kept.
      </p>

      <h3>Next.js build</h3>
      <p>
        Compresses Next.js build output by removing the route manifest table
        (replaced with a count), keeping error/warning messages, and preserving
        the build timing summary.
      </p>

      <h2>Infrastructure patterns</h2>

      <h3>Docker</h3>
      <p>
        Compresses <code>docker build</code>, <code>docker compose</code>, and{" "}
        <code>docker ps</code> output. Build step progress and layer caching
        messages are collapsed. Error output is preserved.
      </p>

      <h3>Kubernetes (kubectl)</h3>
      <p>
        Compresses <code>kubectl get</code>, <code>kubectl describe</code>,
        and <code>kubectl logs</code> output. Pod lists are collapsed; only
        non-Running pods are shown in full. Describe output keeps events and
        conditions.
      </p>

      <h3>Terraform</h3>
      <p>
        Compresses <code>terraform plan</code> and <code>terraform apply</code>{" "}
        output. The resource change summary is kept. Individual resource
        details are collapsed unless they contain errors.
      </p>

      <h2>Package manager patterns</h2>
      <p>
        npm, yarn, pnpm, pip, cargo, and go module output is compressed by
        collapsing the dependency tree and keeping only version conflicts,
        security warnings, and error messages.
      </p>

      <h2>HTTP patterns</h2>

      <h3>curl / wget</h3>
      <p>
        HTTP response output is compressed by keeping the status code, key
        headers (content-type, content-length), and truncating large response
        bodies. JSON responses are pretty-printed then truncated with a size
        indicator.
      </p>

      <h3>GitHub CLI (gh)</h3>
      <p>
        Output from <code>gh pr</code>, <code>gh issue</code>, and{" "}
        <code>gh api</code> is compressed by keeping structured data (title,
        status, author) and removing verbose formatting and help text.
      </p>

      <h2>Stack trace deduplication</h2>
      <p>
        When tool output contains stack traces (JavaScript, Python, Java, Rust,
        Go), Squeezr deduplicates common framework frames, keeping only:
      </p>
      <ul>
        <li>The error message and type</li>
        <li>Frames in user code (non-node_modules, non-stdlib)</li>
        <li>The first and last framework frames for context</li>
      </ul>

      <h2>File read patterns</h2>
      <p>
        Large file reads are compressed using a combination of strategies:
      </p>
      <ul>
        <li>
          <strong>Cross-turn dedup</strong> &mdash; Files read before are
          replaced with a reference.
        </li>
        <li>
          <strong>Line number stripping</strong> &mdash; Cat-style line number
          prefixes are removed (the model can infer line numbers from context).
        </li>
        <li>
          <strong>Blank line collapsing</strong> &mdash; Multiple consecutive
          blank lines are collapsed to one.
        </li>
        <li>
          <strong>Comment density</strong> &mdash; In high-comment files, doc
          comments are trimmed to their first line.
        </li>
      </ul>

      <h2>Pattern summary table</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Patterns</th>
            <th>Typical savings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Git</td>
            <td>diff, log, status, blame</td>
            <td>40&ndash;70%</td>
          </tr>
          <tr>
            <td>Test runners</td>
            <td>vitest, jest, pytest, cargo, go, playwright</td>
            <td>50&ndash;85%</td>
          </tr>
          <tr>
            <td>Build tools</td>
            <td>tsc, eslint, next build, webpack</td>
            <td>40&ndash;70%</td>
          </tr>
          <tr>
            <td>Infrastructure</td>
            <td>docker, kubectl, terraform</td>
            <td>50&ndash;75%</td>
          </tr>
          <tr>
            <td>Package managers</td>
            <td>npm, yarn, pnpm, pip, cargo, go mod</td>
            <td>60&ndash;80%</td>
          </tr>
          <tr>
            <td>HTTP</td>
            <td>curl, wget, gh cli</td>
            <td>40&ndash;70%</td>
          </tr>
          <tr>
            <td>Stack traces</td>
            <td>JS, Python, Java, Rust, Go</td>
            <td>50&ndash;70%</td>
          </tr>
          <tr>
            <td>File reads</td>
            <td>Cross-turn dedup, comment trim</td>
            <td>30&ndash;90%</td>
          </tr>
        </tbody>
      </table>
    </DocPage>
  );
}

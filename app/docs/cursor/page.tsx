import { DocPage } from "@/components/DocPage";

export default function CursorPage() {
  return (
    <DocPage title="Cursor IDE">
      <p>
        Squeezr can compress the context sent by Cursor&apos;s chat and agent modes, reducing token usage on every request.
        Tab completions (cursor-small) always go to Cursor&apos;s own infrastructure and cannot be intercepted.
      </p>

      <h2>Requirements</h2>
      <ul>
        <li>
          <strong>BYOK (Bring Your Own Key)</strong> — you must have your own OpenAI or Anthropic API key configured in
          Cursor. Cursor&apos;s built-in plan routes calls through Cursor&apos;s servers, not your machine, so{" "}
          <code>localhost</code> is unreachable.
        </li>
        <li>
          <strong>Override Base URL</strong> — Cursor must be set to call your endpoint instead of the default API.
        </li>
      </ul>

      <h2>What gets intercepted</h2>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th>Intercepted</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Chat (Ask mode, Cmd+L)</td>
            <td>✅ Yes</td>
          </tr>
          <tr>
            <td>Agent mode</td>
            <td>✅ Yes</td>
          </tr>
          <tr>
            <td>Cmd+K (inline edit)</td>
            <td>✅ Yes</td>
          </tr>
          <tr>
            <td>Tab completions</td>
            <td>❌ No — always go to Cursor&apos;s infra</td>
          </tr>
        </tbody>
      </table>

      <h2>Step 1 — Start Squeezr</h2>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr start
squeezr status   # must say "running"`}</code>
      </pre>

      <h2>Step 2 — Try localhost first</h2>
      <p>
        Open Cursor → <code>Cmd+Shift+J</code> (Settings) → <strong>Models</strong>.
      </p>
      <ol>
        <li>
          Add your API key — OpenAI (<code>sk-...</code>) or Anthropic (<code>sk-ant-...</code>).
        </li>
        <li>
          Enable <strong>Override OpenAI Base URL</strong> and set it to:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto mt-2">
            <code>{`http://localhost:8080/v1`}</code>
          </pre>
        </li>
        <li>
          <strong>Disable all built-in Cursor models</strong> — toggle off{" "}
          <code>cursor-small</code>, <code>cursor-fast</code>, and any other Cursor-branded models.
          This is required because of a Cursor bug: the Override Base URL applies to all models,
          including built-in ones that can&apos;t authenticate with your key.
        </li>
        <li>
          Click <strong>Add model</strong> and add a model name matching your API key (e.g.{" "}
          <code>gpt-4o</code> or <code>claude-sonnet-4-5</code>).
        </li>
      </ol>
      <p>
        Open a Cursor chat (Cmd+L) and send a message. If it works — you&apos;re done.
      </p>
      <p>
        If you see a network error or CORS error, proceed to Step 3.
      </p>

      <h2>Step 3 — Use the tunnel (if localhost fails)</h2>
      <p>
        Some versions of Cursor route BYOK calls through their servers even when Override Base URL is
        set, making <code>localhost</code> unreachable. The tunnel exposes your local proxy as a public
        HTTPS URL.
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr tunnel`}</code>
      </pre>
      <p>
        The command will print a panel like this:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`╔══════════════════════════════════════════════════════════════════╗
║  Tunnel active:  https://abc123.trycloudflare.com               ║
╠══════════════════════════════════════════════════════════════════╣
║  CURSOR SETUP                                                    ║
║                                                                  ║
║  Override OpenAI Base URL →  https://abc123.trycloudflare.com/v1║
╚══════════════════════════════════════════════════════════════════╝`}</code>
      </pre>
      <p>
        Replace <code>http://localhost:8080/v1</code> with the tunnel URL in Cursor Settings.
      </p>

      <h3>Tunnel notes</h3>
      <ul>
        <li>
          The tunnel URL changes every time you restart <code>squeezr tunnel</code>. You&apos;ll need to
          update Cursor Settings each time.
        </li>
        <li>
          The tunnel uses <strong>Cloudflare Quick Tunnel</strong> — free, no account required. It
          uses the <code>cloudflared</code> binary if installed, or falls back to{" "}
          <code>npx cloudflared@latest</code>.
        </li>
        <li>
          If <code>cloudflared</code> is not installed and <code>npx</code> fails, install it
          manually:
          <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto mt-2">
            <code>{`# macOS
brew install cloudflared

# Windows
winget install Cloudflare.cloudflared

# Linux
# See https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/`}</code>
          </pre>
        </li>
      </ul>

      <h2>Troubleshooting</h2>

      <h3>&quot;Failed to fetch&quot; or network error</h3>
      <p>
        Verify <code>squeezr status</code> shows running. If using localhost, check that no firewall
        is blocking port 8080.
      </p>

      <h3>Built-in Cursor models stop working</h3>
      <p>
        This is a known Cursor bug — the Override Base URL applies to all models. Disable the
        built-in Cursor models (<code>cursor-small</code>, <code>cursor-fast</code>, etc.) in
        Settings → Models and use only your own model.
      </p>

      <h3>Anthropic Override activates automatically</h3>
      <p>
        When you add an Anthropic BYOK key, Cursor may automatically enable the Anthropic override
        URL. This is normal — just make sure the URL points to Squeezr (localhost or tunnel).
      </p>

      <h3>401 Unauthorized</h3>
      <p>
        The API key from Cursor is forwarded as-is. Check that your key is correct in Cursor
        Settings. Use <code>squeezr logs</code> to see incoming requests.
      </p>
    </DocPage>
  );
}

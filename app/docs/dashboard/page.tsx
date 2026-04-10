"use client";
import { DocPage } from "@/components/DocPage";
import { useI18n } from "@/lib/i18n";

export default function DashboardPage() {
  const { locale } = useI18n();
  const isEs = locale === "es";

  return (
    <DocPage title="Dashboard">
      {isEs ? <Es /> : <En />}
    </DocPage>
  );
}

function En() {
  return (
    <>
      <p>
        Squeezr includes a built-in web dashboard that provides real-time visibility into
        compression activity, project stats, rate limits, and configuration. No extra installation
        needed &mdash; it&apos;s served directly by the proxy.
      </p>

      <h2>Accessing the dashboard</h2>
      <p>
        Open your browser and navigate to:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`http://localhost:8080/squeezr/dashboard`}</code>
      </pre>
      <p>
        The dashboard is available whenever the proxy is running. It uses Server-Sent Events (SSE)
        via the <code>/squeezr/events</code> endpoint to update in real time.
      </p>

      <h2>Pages</h2>
      <p>The dashboard has five pages, accessible from the sidebar navigation:</p>

      <h3>Overview</h3>
      <p>
        The landing page shows a high-level summary of your current session: total requests proxied,
        tokens saved, compression ratio, cache hit rate, and uptime. A live activity feed shows
        compression events as they happen.
      </p>

      <h3>Projects</h3>
      <p>
        Lists all projects Squeezr has seen, with per-project compression stats. Each project is
        auto-detected from the working directory of incoming requests. Click a project to see its
        detailed history and per-tool breakdown.
      </p>

      <h3>History</h3>
      <p>
        A paginated log of all compressed requests with timestamps, tool names, original size,
        compressed size, compression ratio, and which pipeline layers were applied. Useful for
        debugging why a specific request was or wasn&apos;t compressed.
      </p>

      <h3>Limits</h3>
      <p>
        Displays rate limit status for each configured provider (Anthropic, Google, OpenAI, etc.).
        Shows remaining requests, token budgets, and when limits reset. Helps you understand
        when you&apos;re approaching provider rate limits.
      </p>

      <h3>Settings</h3>
      <p>
        View and modify Squeezr configuration without editing TOML files. Changes are saved to{" "}
        <code>squeezr.toml</code> and take effect immediately. Includes toggles for compression
        mode, AI fallback, threshold, skip/only tools, and more.
      </p>

      <h2>CLI shortcut</h2>
      <p>
        You can also open the dashboard from the terminal:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr status`}</code>
      </pre>
      <p>
        The <code>squeezr status</code> output includes the dashboard URL for quick access.
      </p>
    </>
  );
}

function Es() {
  return (
    <>
      <p>
        Squeezr incluye un dashboard web integrado que proporciona visibilidad en tiempo real
        de la actividad de compresion, estadisticas de proyectos, limites de tasa y configuracion.
        No necesita instalacion adicional &mdash; se sirve directamente desde el proxy.
      </p>

      <h2>Acceder al dashboard</h2>
      <p>
        Abre tu navegador y navega a:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`http://localhost:8080/squeezr/dashboard`}</code>
      </pre>
      <p>
        El dashboard esta disponible mientras el proxy este en ejecucion. Usa Server-Sent Events (SSE)
        via el endpoint <code>/squeezr/events</code> para actualizarse en tiempo real.
      </p>

      <h2>Paginas</h2>
      <p>El dashboard tiene cinco paginas, accesibles desde la navegacion lateral:</p>

      <h3>Overview</h3>
      <p>
        La pagina principal muestra un resumen de alto nivel de tu sesion actual: total de peticiones
        proxiadas, tokens ahorrados, ratio de compresion, tasa de aciertos de cache y tiempo de
        actividad. Un feed de actividad en vivo muestra los eventos de compresion mientras ocurren.
      </p>

      <h3>Projects</h3>
      <p>
        Lista todos los proyectos que Squeezr ha detectado, con estadisticas de compresion por proyecto.
        Cada proyecto se auto-detecta desde el directorio de trabajo de las peticiones entrantes.
        Haz clic en un proyecto para ver su historial detallado y desglose por herramienta.
      </p>

      <h3>History</h3>
      <p>
        Un log paginado de todas las peticiones comprimidas con timestamps, nombres de herramientas,
        tamano original, tamano comprimido, ratio de compresion y que capas del pipeline se aplicaron.
        Util para depurar por que una peticion especifica fue o no fue comprimida.
      </p>

      <h3>Limits</h3>
      <p>
        Muestra el estado de limites de tasa para cada proveedor configurado (Anthropic, Google, OpenAI, etc.).
        Muestra peticiones restantes, presupuestos de tokens y cuando se reinician los limites.
        Te ayuda a entender cuando te estas acercando a los limites de tasa del proveedor.
      </p>

      <h3>Settings</h3>
      <p>
        Ver y modificar la configuracion de Squeezr sin editar archivos TOML. Los cambios se guardan en{" "}
        <code>squeezr.toml</code> y toman efecto inmediatamente. Incluye toggles para modo de compresion,
        fallback IA, umbral, herramientas skip/only, y mas.
      </p>

      <h2>Atajo CLI</h2>
      <p>
        Tambien puedes abrir el dashboard desde la terminal:
      </p>
      <pre className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
        <code>{`squeezr status`}</code>
      </pre>
      <p>
        La salida de <code>squeezr status</code> incluye la URL del dashboard para acceso rapido.
      </p>
    </>
  );
}

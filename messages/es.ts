import type { Messages } from "./en";

const es: Messages = {
  nav: {
    docs: "Docs",
    github: "GitHub",
    npm: "npm",
  },
  hero: {
    badge: "v1.17.1 · 219 tests · MIT",
    title1: "Menos tokens.",
    title2: "Misma inteligencia.",
    desc: "Proxy local que comprime salidas de herramientas, deduplica lecturas de archivos y elimina ruido.",
    descHighlight: "Ahorra miles de tokens",
    descEnd: "por sesion sin cambiar tu flujo de trabajo.",
    cta: "Empezar",
    stats: {
      patterns: "patrones",
      layers: "capas de compresion",
      compression: "compresion maxima",
    },
  },
  logoCloud: {
    title: "Compatible con 8+ herramientas de IA",
  },
  compression: {
    label: "Ganancias de Compresion",
    title: "Mira la diferencia",
    desc: "Resultados reales de compresion en sesiones de desarrollo. Cada byte cuenta.",
    layers: "Capas",
    patterns: "Patrones",
    saved: "Ahorro",
    avgCompressed: "compresion media",
    items: {
      test: { label: "Output de Tests", sub: "vitest · 188 tests" },
      file: { label: "Lectura de Archivo", sub: "server.ts · 3200 lineas" },
      diff: { label: "Git Diff", sub: "rama feature · 47 archivos" },
      system: { label: "System Prompt", sub: "Claude Code · 13KB" },
    },
  },
  pipeline: {
    label: "Arquitectura",
    title: "Pipeline de 7 Capas",
    desc: "Cada peticion pasa por siete etapas independientes. Cada capa captura lo que la anterior no pudo.",
    steps: {
      system: { title: "System Prompt", desc: "~13KB → 600 tokens" },
      dedup: { title: "Dedup de Lecturas", desc: "Colapsa lecturas duplicadas" },
      noise: { title: "Limpieza de Ruido", desc: "ANSI, barras de progreso, spinners" },
      patterns: { title: "Patrones", desc: "30+ compresores especificos" },
      lineDedup: { title: "Dedup de Lineas", desc: "Lineas repetidas y stacks" },
      ai: { title: "Compresion IA", desc: "Haiku / GPT-mini / Flash" },
      cache: { title: "Cache de Sesion", desc: "Calentamiento de KV cache" },
    },
  },
  features: {
    patterns: {
      title: "30+ Patrones",
      desc: "Git diffs, test runners, build tools, Docker, Terraform, gestores de paquetes — cada uno tiene un compresor dedicado que sabe exactamente que mantener.",
      tag: "Deterministico",
    },
    ai: {
      title: "Fallback IA",
      desc: "Cuando no hay patron, Haiku, GPT-4o-mini o Gemini Flash comprimen a menos de 150 tokens. El mejor modelo gana.",
      tag: "Inteligente",
    },
    dedup: {
      title: "Dedup de Archivos",
      desc: "Lees el mismo archivo 5 veces? Solo la ultima se mantiene completa. Las anteriores se convierten en referencias ligeras.",
      tag: "Dedup",
    },
    cache: {
      title: "Cache de Sesion",
      desc: "Strings comprimidos identicos reutilizan el KV cache del proveedor — hasta 90% de reduccion de coste en cache hits.",
      tag: "Cache",
    },
    expand: {
      title: "Herramienta Expand",
      desc: "La IA puede llamar squeezr_expand() para recuperar cualquier contenido original. Nada se pierde permanentemente.",
      tag: "Sin perdida",
    },
    zero: {
      title: "Zero Config",
      desc: "Un install, un comando, funciona inmediatamente. Config TOML opcional para control fino.",
      tag: "Simple",
    },
  },
  examples: {
    label: "Ejemplos Reales",
    title: "Mira la compresion",
    desc: "Antes y despues de sesiones reales de desarrollo. Haz clic para alternar.",
    tabs: { test: "Output de Tests", file: "Lectura de Archivo", diff: "Git Diff" },
    before: "Antes",
    after: "Despues",
    showOriginal: "Ver original",
    compressIt: "Comprimir",
  },
  howItWorks: {
    label: "Como funciona",
    title: "Tres pasos. Treinta segundos.",
    desc: "De la instalacion al ahorro en menos de un minuto. Sin configuracion necesaria.",
    steps: {
      install: { title: "Instalar y Configurar", desc: "Un npm install, un comando de setup. Detecta tu SO, configura variables de entorno e inicia el daemon." },
      proxy: { title: "El Proxy Intercepta", desc: "Tu herramienta IA envia peticiones por localhost. Squeezr intercepta de forma transparente — sin cambios en tu codigo." },
      savings: { title: "Empieza el Ahorro", desc: "Las peticiones comprimidas van a la API. Tu IA recibe toda la info esencial con una fraccion de los tokens." },
    },
  },
  calculator: {
    label: "Calculadora",
    title: "Estima tu ahorro",
    desc: "Mira cuanto podrias ahorrar segun tu uso.",
    requestsPerSession: "Peticiones por sesion",
    avgTokens: "Tokens medios por peticion",
    provider: "Proveedor de IA",
    tokensSavedSession: "Tokens ahorrados / sesion",
    tokensSavedMonth: "Tokens ahorrados / mes",
    costSavedMonth: "Coste ahorrado / mes",
    sessionsNote: "~3 sesiones/dia × 22 dias",
    basedOn: "Basado en precio input de {provider}",
  },
  cta: {
    title: "Listo para comprimir?",
    desc: "Tres comandos. Treinta segundos. Eso es todo.",
    readDocs: "Leer la documentacion",
    viewGithub: "Ver en GitHub",
    badges: { mit: "Licencia MIT", zero: "Zero Config", setup: "< 30s Setup" },
  },
  footer: {
    tagline: "Compresion de ventana de contexto IA. Ahorra miles de tokens por sesion.",
    product: "Producto",
    documentation: "Documentacion",
    installation: "Instalacion",
    configuration: "Configuracion",
    integrations: "Integraciones",
    community: "Comunidad",
    copyright: "Licencia MIT · Hecho para el developer AI-native",
  },
};

export default es;

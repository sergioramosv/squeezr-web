export default function LogosPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white mb-2">Logo Proposals</h1>
        <p className="text-neutral-500 mb-12">Cada propuesta en fondo oscuro y claro, a diferentes tamaños.</p>

        <div className="grid md:grid-cols-2 gap-8">

          {/* 1. Compression Brackets */}
          <LogoCard
            title="1. Compression Brackets"
            desc="Dos chevrones apuntando al centro, comprimiendo."
          >
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <rect width="80" height="80" rx="16" fill="#2563eb" />
              <path d="M28 24L16 40L28 56" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M52 24L64 40L52 56" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <rect x="36" y="30" width="8" height="20" rx="2" fill="white" opacity="0.6" />
            </svg>
          </LogoCard>

          {/* 2. Stacked Squeeze */}
          <LogoCard
            title="2. Stacked Squeeze"
            desc="Lineas que se acortan progresivamente, las de arriba desvanecidas."
          >
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <rect width="80" height="80" rx="16" fill="#2563eb" />
              <rect x="14" y="18" width="52" height="5" rx="2.5" fill="white" opacity="0.2" />
              <rect x="18" y="28" width="44" height="5" rx="2.5" fill="white" opacity="0.35" />
              <rect x="22" y="38" width="36" height="5" rx="2.5" fill="white" opacity="0.55" />
              <rect x="26" y="48" width="28" height="5" rx="2.5" fill="white" opacity="0.8" />
              <rect x="30" y="58" width="20" height="5" rx="2.5" fill="white" opacity="1" />
            </svg>
          </LogoCard>

          {/* 3. The Funnel */}
          <LogoCard
            title="3. The Funnel"
            desc="Embudo abstracto: entra ancho, sale estrecho."
          >
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <rect width="80" height="80" rx="16" fill="#2563eb" />
              <path d="M18 20L36 60" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M62 20L44 60" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none" />
              <circle cx="40" cy="60" r="3" fill="white" />
              {/* Dots entering */}
              <circle cx="24" cy="20" r="2" fill="white" opacity="0.4" />
              <circle cx="34" cy="20" r="2" fill="white" opacity="0.4" />
              <circle cx="46" cy="20" r="2" fill="white" opacity="0.4" />
              <circle cx="56" cy="20" r="2" fill="white" opacity="0.4" />
            </svg>
          </LogoCard>

          {/* 4. Before/After Block */}
          <LogoCard
            title="4. Before / After Block"
            desc="Mitad izquierda densa, mitad derecha limpia. Division diagonal."
          >
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <rect width="80" height="80" rx="16" fill="#2563eb" />
              {/* Diagonal clip */}
              <clipPath id="leftClip"><polygon points="12,12 44,12 36,68 12,68" /></clipPath>
              <clipPath id="rightClip"><polygon points="44,12 68,12 68,68 36,68" /></clipPath>
              {/* Left: dense lines */}
              <g clipPath="url(#leftClip)">
                {[18, 24, 30, 36, 42, 48, 54, 60].map((y) => (
                  <rect key={y} x="12" y={y} width="36" height="2.5" rx="1" fill="white" opacity="0.3" />
                ))}
              </g>
              {/* Right: few lines */}
              <g clipPath="url(#rightClip)">
                <rect x="40" y="30" width="24" height="3" rx="1.5" fill="white" opacity="0.9" />
                <rect x="40" y="40" width="18" height="3" rx="1.5" fill="white" opacity="0.9" />
                <rect x="40" y="50" width="12" height="3" rx="1.5" fill="white" opacity="0.9" />
              </g>
              {/* Divider line */}
              <line x1="44" y1="12" x2="36" y2="68" stroke="white" strokeWidth="1" opacity="0.3" />
            </svg>
          </LogoCard>

          {/* 5. The Squeeze S */}
          <LogoCard
            title="5. The Squeeze S"
            desc="Letra S que se estrecha en el centro — compresion visual."
          >
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <rect width="80" height="80" rx="16" fill="#2563eb" />
              <path
                d="M50 22C50 22 54 22 54 28C54 34 26 32 26 40C26 48 54 46 54 52C54 58 50 58 50 58"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              {/* Squeeze indicators */}
              <path d="M22 38L28 40L22 42" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
              <path d="M58 38L52 40L58 42" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5" />
            </svg>
          </LogoCard>

          {/* 6. Chevron Stack */}
          <LogoCard
            title="6. Chevron Stack"
            desc="Tres chevrones decrecientes — colapso progresivo."
          >
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <rect width="80" height="80" rx="16" fill="#2563eb" />
              <path d="M20 26L40 38L60 26" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4" />
              <path d="M24 38L40 48L56 38" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
              <path d="M28 50L40 58L52 50" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="1" />
            </svg>
          </LogoCard>

          {/* 7. Token Counter */}
          <LogoCard
            title="7. Token Counter"
            desc="Badge que muestra reduccion de tokens directamente."
          >
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <rect width="80" height="80" rx="16" fill="#2563eb" />
              {/* Strikethrough old number */}
              <text x="40" y="34" textAnchor="middle" fill="white" opacity="0.3" fontSize="14" fontWeight="bold" fontFamily="system-ui">12K</text>
              <line x1="24" y1="32" x2="56" y2="32" stroke="white" strokeWidth="1.5" opacity="0.4" />
              {/* New number */}
              <text x="40" y="56" textAnchor="middle" fill="white" fontSize="20" fontWeight="900" fontFamily="system-ui">2K</text>
              {/* Arrow down */}
              <path d="M40 38L40 42" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            </svg>
          </LogoCard>

          {/* 8. The Vise / Prensa */}
          <LogoCard
            title="8. The Vise (Prensa)"
            desc="Dos barras con flechas comprimiendo contenido entre ellas."
          >
            <svg viewBox="0 0 80 80" className="w-full h-full">
              <rect width="80" height="80" rx="16" fill="#2563eb" />
              {/* Top bar */}
              <rect x="18" y="20" width="44" height="6" rx="3" fill="white" />
              {/* Bottom bar */}
              <rect x="18" y="54" width="44" height="6" rx="3" fill="white" />
              {/* Arrows pointing inward */}
              <path d="M40 28L40 34M36 31L40 35L44 31" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
              <path d="M40 52L40 46M36 49L40 45L44 49" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
              {/* Compressed content */}
              <rect x="28" y="38" width="24" height="4" rx="2" fill="white" opacity="0.5" />
            </svg>
          </LogoCard>

        </div>

        {/* Size comparison */}
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mt-16 mb-6">Comparacion de tamaños</h2>
        <div className="flex flex-wrap items-end gap-8">
          {[64, 40, 28, 16].map((size) => (
            <div key={size} className="text-center">
              <div className="mb-2 inline-block" style={{ width: size, height: size }}>
                {/* Using proposal 2 as example */}
                <svg viewBox="0 0 80 80" className="w-full h-full">
                  <rect width="80" height="80" rx="16" fill="#2563eb" />
                  <rect x="14" y="18" width="52" height="5" rx="2.5" fill="white" opacity="0.2" />
                  <rect x="18" y="28" width="44" height="5" rx="2.5" fill="white" opacity="0.35" />
                  <rect x="22" y="38" width="36" height="5" rx="2.5" fill="white" opacity="0.55" />
                  <rect x="26" y="48" width="28" height="5" rx="2.5" fill="white" opacity="0.8" />
                  <rect x="30" y="58" width="20" height="5" rx="2.5" fill="white" opacity="1" />
                </svg>
              </div>
              <div className="text-xs text-neutral-500">{size}px</div>
            </div>
          ))}
        </div>

        {/* All logos at navbar size on white/dark strips */}
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mt-16 mb-6">Todas a tamaño navbar (28px)</h2>
        <div className="flex gap-4 flex-wrap">
          {allLogos.map((logo, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <div className="w-7 h-7 shrink-0">{logo.svg}</div>
              <span className="text-sm font-bold text-neutral-900 dark:text-white">Squeezr</span>
              <span className="text-[10px] text-neutral-400 ml-1">#{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LogoCard({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-[#141414]">
      <div className="p-6">
        <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1">{title}</h3>
        <p className="text-xs text-neutral-500 mb-4">{desc}</p>
        <div className="flex items-center gap-6">
          {/* Dark bg */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 p-2 rounded-xl bg-neutral-900 flex items-center justify-center">
              <div className="w-16 h-16">{children}</div>
            </div>
            <span className="text-[10px] text-neutral-400">Dark</span>
          </div>
          {/* Light bg */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 p-2 rounded-xl bg-white border border-neutral-200 flex items-center justify-center">
              <div className="w-16 h-16">{children}</div>
            </div>
            <span className="text-[10px] text-neutral-400">Light</span>
          </div>
          {/* Small sizes */}
          <div className="flex items-end gap-3">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10">{children}</div>
              <span className="text-[10px] text-neutral-400">40</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-7 h-7">{children}</div>
              <span className="text-[10px] text-neutral-400">28</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-4 h-4">{children}</div>
              <span className="text-[10px] text-neutral-400">16</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Mini versions for navbar comparison */
const allLogos = [
  { svg: <svg viewBox="0 0 80 80" className="w-full h-full"><rect width="80" height="80" rx="16" fill="#2563eb"/><path d="M28 24L16 40L28 56" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M52 24L64 40L52 56" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/><rect x="36" y="30" width="8" height="20" rx="2" fill="white" opacity="0.6"/></svg> },
  { svg: <svg viewBox="0 0 80 80" className="w-full h-full"><rect width="80" height="80" rx="16" fill="#2563eb"/><rect x="14" y="18" width="52" height="5" rx="2.5" fill="white" opacity="0.2"/><rect x="18" y="28" width="44" height="5" rx="2.5" fill="white" opacity="0.35"/><rect x="22" y="38" width="36" height="5" rx="2.5" fill="white" opacity="0.55"/><rect x="26" y="48" width="28" height="5" rx="2.5" fill="white" opacity="0.8"/><rect x="30" y="58" width="20" height="5" rx="2.5" fill="white" opacity="1"/></svg> },
  { svg: <svg viewBox="0 0 80 80" className="w-full h-full"><rect width="80" height="80" rx="16" fill="#2563eb"/><path d="M18 20L36 60" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none"/><path d="M62 20L44 60" stroke="white" strokeWidth="5" strokeLinecap="round" fill="none"/><circle cx="40" cy="60" r="3" fill="white"/></svg> },
  { svg: <svg viewBox="0 0 80 80" className="w-full h-full"><rect width="80" height="80" rx="16" fill="#2563eb"/><clipPath id="lc"><polygon points="12,12 44,12 36,68 12,68"/></clipPath><clipPath id="rc"><polygon points="44,12 68,12 68,68 36,68"/></clipPath><g clipPath="url(#lc)">{[18,24,30,36,42,48,54,60].map(y=><rect key={y} x="12" y={y} width="36" height="2.5" rx="1" fill="white" opacity="0.3"/>)}</g><g clipPath="url(#rc)"><rect x="40" y="30" width="24" height="3" rx="1.5" fill="white" opacity="0.9"/><rect x="40" y="40" width="18" height="3" rx="1.5" fill="white" opacity="0.9"/><rect x="40" y="50" width="12" height="3" rx="1.5" fill="white" opacity="0.9"/></g></svg> },
  { svg: <svg viewBox="0 0 80 80" className="w-full h-full"><rect width="80" height="80" rx="16" fill="#2563eb"/><path d="M50 22C50 22 54 22 54 28C54 34 26 32 26 40C26 48 54 46 54 52C54 58 50 58 50 58" stroke="white" strokeWidth="6" strokeLinecap="round" fill="none"/><path d="M22 38L28 40L22 42" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/><path d="M58 38L52 40L58 42" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.5"/></svg> },
  { svg: <svg viewBox="0 0 80 80" className="w-full h-full"><rect width="80" height="80" rx="16" fill="#2563eb"/><path d="M20 26L40 38L60 26" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.4"/><path d="M24 38L40 48L56 38" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/><path d="M28 50L40 58L52 50" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="1"/></svg> },
  { svg: <svg viewBox="0 0 80 80" className="w-full h-full"><rect width="80" height="80" rx="16" fill="#2563eb"/><text x="40" y="34" textAnchor="middle" fill="white" opacity="0.3" fontSize="14" fontWeight="bold" fontFamily="system-ui">12K</text><line x1="24" y1="32" x2="56" y2="32" stroke="white" strokeWidth="1.5" opacity="0.4"/><text x="40" y="56" textAnchor="middle" fill="white" fontSize="20" fontWeight="900" fontFamily="system-ui">2K</text></svg> },
  { svg: <svg viewBox="0 0 80 80" className="w-full h-full"><rect width="80" height="80" rx="16" fill="#2563eb"/><rect x="18" y="20" width="44" height="6" rx="3" fill="white"/><rect x="18" y="54" width="44" height="6" rx="3" fill="white"/><path d="M40 28L40 34M36 31L40 35L44 31" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6"/><path d="M40 52L40 46M36 49L40 45L44 49" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6"/><rect x="28" y="38" width="24" height="4" rx="2" fill="white" opacity="0.5"/></svg> },
];

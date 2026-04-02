export function WaveDivider({ flip, className }: { flip?: boolean; className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className || ""}`}>
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[40px] md:h-[60px]" preserveAspectRatio="none">
        <path
          d="M0 40C240 10 480 50 720 30C960 10 1200 50 1440 25V60H0V40Z"
          className="fill-slate-50 dark:fill-[#0d0e14]"
        />
      </svg>
    </div>
  );
}

export function WaveDividerAlt({ flip, className }: { flip?: boolean; className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""} ${className || ""}`}>
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[40px] md:h-[60px]" preserveAspectRatio="none">
        <path
          d="M0 40C240 10 480 50 720 30C960 10 1200 50 1440 25V60H0V40Z"
          className="fill-white dark:fill-[#0a0b0f]"
        />
      </svg>
    </div>
  );
}

export function GradientLine() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
    </div>
  );
}

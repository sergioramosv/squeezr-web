"use client";

export function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          color: "#a3a3a3",
        }}
      />
      {/* Radial fade from center — dark */}
      <div className="absolute inset-0 hidden dark:block" style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 40%, transparent 0%, #0a0a0a 100%)",
      }} />
      {/* Radial fade from center — light */}
      <div className="absolute inset-0 dark:hidden" style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 40%, transparent 0%, #fafafa 100%)",
      }} />
      {/* Soft color accent — dark only */}
      <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] rounded-full hidden dark:block"
        style={{ background: "#2563eb", opacity: 0.04, filter: "blur(120px)" }}
      />
      <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] rounded-full hidden dark:block"
        style={{ background: "#7c3aed", opacity: 0.03, filter: "blur(120px)" }}
      />
    </div>
  );
}

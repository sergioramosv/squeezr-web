export function Terminal({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`terminal ${className || ""}`}>
      <div className="terminal-bar">
        <div className="terminal-dot bg-[#ff5f57]" />
        <div className="terminal-dot bg-[#febc2e]" />
        <div className="terminal-dot bg-[#28c840]" />
        {title && <span className="ml-3 text-[11px] text-slate-500 font-mono">{title}</span>}
      </div>
      <div className="terminal-body text-slate-300">{children}</div>
    </div>
  );
}

export function TerminalLine({ prompt, command, output, dim }: { prompt?: string; command?: string; output?: string; dim?: boolean }) {
  return (
    <div className={`mb-0.5 last:mb-0 ${dim ? "opacity-50" : ""}`}>
      {command && (
        <div>
          <span className="text-brand-400">{prompt || "$"}</span>{" "}
          <span className="text-slate-100">{command}</span>
        </div>
      )}
      {output && <div className="text-slate-500">{output}</div>}
    </div>
  );
}

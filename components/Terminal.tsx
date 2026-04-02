export function Terminal({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="terminal">
      <div className="terminal-bar">
        <div className="terminal-dot bg-red-500/80" />
        <div className="terminal-dot bg-amber-500/80" />
        <div className="terminal-dot bg-green-500/80" />
        {title && <span className="ml-2 text-xs text-slate-500 font-mono">{title}</span>}
      </div>
      <div className="terminal-body text-slate-300">{children}</div>
    </div>
  );
}

export function TerminalLine({ prompt, command, output }: { prompt?: string; command?: string; output?: string }) {
  return (
    <div className="mb-1 last:mb-0">
      {command && (
        <div>
          <span className="text-teal-400">{prompt || "$"}</span>{" "}
          <span className="text-slate-100">{command}</span>
        </div>
      )}
      {output && <div className="text-slate-500">{output}</div>}
    </div>
  );
}

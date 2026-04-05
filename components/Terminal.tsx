"use client";

import { useEffect, useState } from "react";

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

interface TypingLine {
  prompt?: string;
  command?: string;
  output?: string;
  outputColor?: string;
  delay?: number;
}

export function TypingTerminal({ title, lines, className }: { title?: string; lines: TypingLine[]; className?: string }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typedChars, setTypedChars] = useState<number>(0);
  const [phase, setPhase] = useState<"typing" | "done">("typing");

  useEffect(() => {
    if (visibleLines >= lines.length) {
      setPhase("done");
      return;
    }

    const line = lines[visibleLines];
    const text = line.command || "";

    if (line.output || !text) {
      // Output lines appear instantly after delay
      const t = setTimeout(() => {
        setVisibleLines((v) => v + 1);
        setTypedChars(0);
      }, line.delay || 200);
      return () => clearTimeout(t);
    }

    if (typedChars < text.length) {
      const t = setTimeout(() => setTypedChars((c) => c + 1), 30 + Math.random() * 30);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines((v) => v + 1);
        setTypedChars(0);
      }, line.delay || 300);
      return () => clearTimeout(t);
    }
  }, [visibleLines, typedChars, lines]);

  return (
    <Terminal title={title} className={className}>
      {lines.slice(0, visibleLines + 1).map((line, i) => {
        const isCurrentLine = i === visibleLines;

        if (line.output) {
          if (i > visibleLines) return null;
          return (
            <div key={i} className={`text-xs mb-0.5 ${line.outputColor || "text-slate-500"}`}>
              {line.output}
            </div>
          );
        }

        const text = line.command || "";
        const chars = isCurrentLine && phase === "typing" ? text.slice(0, typedChars) : text;

        return (
          <div key={i} className="mb-0.5 text-xs">
            <span className="text-brand-400">{line.prompt || "$"}</span>{" "}
            <span className="text-slate-100">{chars}</span>
            {isCurrentLine && phase === "typing" && typedChars < text.length && (
              <span className="animate-blink text-brand-400">▌</span>
            )}
          </div>
        );
      })}
    </Terminal>
  );
}

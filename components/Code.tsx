export function Code({ children, title }: { children: string; title?: string }) {
  return (
    <div className="not-prose my-4">
      {title && (
        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 border border-b-0 border-gray-200 dark:border-gray-800 rounded-t-lg px-4 py-2">
          {title}
        </div>
      )}
      <pre className={`bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 ${title ? "rounded-b-lg" : "rounded-lg"} p-4 font-mono text-sm overflow-x-auto text-gray-700 dark:text-gray-300`}>
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-4 flex gap-3 p-4 rounded-lg border border-accent-500/20 bg-accent-50 dark:bg-accent-900/10">
      <span className="text-accent-500 shrink-0">&#x1F4A1;</span>
      <div className="text-sm text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  );
}

export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose my-4 flex gap-3 p-4 rounded-lg border border-amber-500/20 bg-amber-50 dark:bg-amber-900/10">
      <span className="text-amber-500 shrink-0">&#x26A0;&#xFE0F;</span>
      <div className="text-sm text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  );
}

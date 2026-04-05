"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 py-12 px-6 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo size={22} className="text-neutral-900 dark:text-white" />
              <span className="font-extrabold text-neutral-900 dark:text-white uppercase tracking-[0.08em] text-sm">Squeezr</span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">{t.footer.tagline}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">{t.footer.product}</h4>
            <div className="space-y-2">
              <Link href="/docs" className="block text-sm text-neutral-500 hover:text-green-700 dark:hover:text-green-500 transition-colors">{t.footer.documentation}</Link>
              <Link href="/docs/installation" className="block text-sm text-neutral-500 hover:text-green-700 dark:hover:text-green-500 transition-colors">{t.footer.installation}</Link>
              <Link href="/docs/configuration" className="block text-sm text-neutral-500 hover:text-green-700 dark:hover:text-green-500 transition-colors">{t.footer.configuration}</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">{t.footer.integrations}</h4>
            <div className="space-y-2">
              <Link href="/docs/claude-code" className="block text-sm text-neutral-500 hover:text-green-700 dark:hover:text-green-500 transition-colors">Claude Code</Link>
              <Link href="/docs/codex" className="block text-sm text-neutral-500 hover:text-green-700 dark:hover:text-green-500 transition-colors">OpenAI Codex</Link>
              <Link href="/docs/aider" className="block text-sm text-neutral-500 hover:text-green-700 dark:hover:text-green-500 transition-colors">Aider</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">{t.footer.community}</h4>
            <div className="space-y-2">
              <a href="https://github.com/sergioramosv/Squeezr" className="block text-sm text-neutral-500 hover:text-green-700 dark:hover:text-green-500 transition-colors">GitHub</a>
              <a href="https://www.npmjs.com/package/squeezr-ai" className="block text-sm text-neutral-500 hover:text-green-700 dark:hover:text-green-500 transition-colors">npm</a>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <span>{t.footer.copyright}</span>
          <span>v1.17.1</span>
        </div>
      </div>
    </footer>
  );
}

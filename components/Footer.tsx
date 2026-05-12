"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-white/[0.06] py-12 px-6 bg-[#050505]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo size={20} className="text-white" />
              <span className="font-extrabold text-white uppercase tracking-[0.08em] text-sm">Squeezr</span>
            </div>
            <p className="text-xs text-white/30 leading-relaxed">{t.footer.tagline}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/25 mb-3">{t.footer.product}</h4>
            <div className="space-y-2">
              <Link href="/docs"                  className="block text-sm text-white/40 hover:text-green-400 transition-colors">{t.footer.documentation}</Link>
              <Link href="/docs/installation"     className="block text-sm text-white/40 hover:text-green-400 transition-colors">{t.footer.installation}</Link>
              <Link href="/docs/configuration"    className="block text-sm text-white/40 hover:text-green-400 transition-colors">{t.footer.configuration}</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/25 mb-3">{t.footer.integrations}</h4>
            <div className="space-y-2">
              <Link href="/docs/claude-code" className="block text-sm text-white/40 hover:text-green-400 transition-colors">Claude Code</Link>
              <Link href="/docs/codex"       className="block text-sm text-white/40 hover:text-green-400 transition-colors">OpenAI Codex</Link>
              <Link href="/docs/aider"       className="block text-sm text-white/40 hover:text-green-400 transition-colors">Aider</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/25 mb-3">{t.footer.community}</h4>
            <div className="space-y-2">
              <a href="https://github.com/sergioramosv/Squeezr"       className="block text-sm text-white/40 hover:text-green-400 transition-colors">GitHub</a>
              <a href="https://www.npmjs.com/package/squeezr-ai" className="block text-sm text-white/40 hover:text-green-400 transition-colors">npm</a>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/20">
          <span>{t.footer.copyright}</span>
          <span className="font-mono">v1.24.0</span>
        </div>
      </div>
    </footer>
  );
}

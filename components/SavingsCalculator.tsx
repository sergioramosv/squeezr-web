"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { useI18n } from "@/lib/i18n";

const providers = [
  { name: "Claude (Sonnet)", inputCost: 3, outputCost: 15 },
  { name: "Claude (Opus)", inputCost: 15, outputCost: 75 },
  { name: "GPT-4o", inputCost: 2.5, outputCost: 10 },
  { name: "Gemini Pro", inputCost: 1.25, outputCost: 5 },
];

export function SavingsCalculator() {
  const [requests, setRequests] = useState(60);
  const [tokensPerReq, setTokensPerReq] = useState(8000);
  const [providerIdx, setProviderIdx] = useState(0);
  const { t } = useI18n();

  const provider = providers[providerIdx];
  const compressionRate = 0.78;

  const savings = useMemo(() => {
    const totalTokens = requests * tokensPerReq;
    const tokensSaved = totalTokens * compressionRate;
    const sessionsPerDay = 3;
    const daysPerMonth = 22;
    const monthlySaved = tokensSaved * sessionsPerDay * daysPerMonth;
    const costPerToken = provider.inputCost / 1_000_000;
    const moneySaved = monthlySaved * costPerToken;
    return {
      tokensPerSession: Math.round(tokensSaved),
      tokensPerMonth: Math.round(monthlySaved),
      costPerMonth: moneySaved,
    };
  }, [requests, tokensPerReq, providerIdx, provider.inputCost]);

  return (
    <section className="px-6 py-24 md:py-32 bg-neutral-50 dark:bg-[#0f0f0f]">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-3 block">{t.calculator.label}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4">{t.calculator.title}</h2>
            <p className="text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">{t.calculator.desc}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t.calculator.requestsPerSession}</label>
                  <span className="text-sm font-bold text-neutral-900 dark:text-white">{requests}</span>
                </div>
                <input type="range" min={10} max={200} step={5} value={requests} onChange={(e) => setRequests(Number(e.target.value))}
                  className="w-full" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t.calculator.avgTokens}</label>
                  <span className="text-sm font-bold text-neutral-900 dark:text-white">{(tokensPerReq / 1000).toFixed(0)}K</span>
                </div>
                <input type="range" min={1000} max={50000} step={1000} value={tokensPerReq} onChange={(e) => setTokensPerReq(Number(e.target.value))}
                  className="w-full" />
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">{t.calculator.provider}</label>
                <div className="grid grid-cols-2 gap-2">
                  {providers.map((p, i) => (
                    <button key={p.name} onClick={() => setProviderIdx(i)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all border ${
                        providerIdx === i
                          ? "bg-blue-600/10 text-blue-600 dark:text-blue-500 border-blue-600/30"
                          : "text-neutral-500 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                      }`}>
                      {p.name}
                      <div className="text-[10px] mt-0.5 opacity-60">${p.inputCost}/MTok</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">{t.calculator.tokensSavedSession}</div>
                <motion.div key={savings.tokensPerSession} initial={{ opacity: 0.5, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold text-neutral-900 dark:text-white">
                  {savings.tokensPerSession.toLocaleString()}
                </motion.div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">{t.calculator.tokensSavedMonth}</div>
                <motion.div key={savings.tokensPerMonth} initial={{ opacity: 0.5, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-extrabold text-blue-600 dark:text-blue-500">
                  {(savings.tokensPerMonth / 1_000_000).toFixed(1)}M
                </motion.div>
                <div className="text-xs text-neutral-400 dark:text-neutral-600 mt-1">{t.calculator.sessionsNote}</div>
              </div>

              <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30">
                <div className="text-xs text-green-700 dark:text-green-600 uppercase tracking-wider mb-1">{t.calculator.costSavedMonth}</div>
                <motion.div key={savings.costPerMonth.toFixed(2)} initial={{ opacity: 0.5, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-4xl font-extrabold text-green-700 dark:text-green-600">
                  ${savings.costPerMonth.toFixed(2)}
                </motion.div>
                <div className="text-xs text-neutral-400 dark:text-neutral-600 mt-1">{t.calculator.basedOn.replace("{provider}", provider.name)}</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

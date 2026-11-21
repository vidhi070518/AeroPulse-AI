'use client';

import React from 'react';
import { SustainableAlternative } from '../types';
import { SUSTAINABLE_ALTERNATIVES } from '../data/mockData';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingDown, 
  HeartPulse, 
  CheckCircle,
  Leaf
} from 'lucide-react';

interface SustainableAlternativesMatrixProps {
  onOpenCopilot: (prompt: string) => void;
  onPledgeAlternative: (alt: SustainableAlternative) => void;
}

export const SustainableAlternativesMatrix: React.FC<SustainableAlternativesMatrixProps> = ({
  onOpenCopilot,
  onPledgeAlternative
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 lg:p-7 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Sustainable Alternatives Matrix
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Compare conventional high-emission habits with low-emission alternatives and their direct family ROI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-full">
            Up to 92% Personal Emission Cut
          </span>
        </div>
      </div>

      {/* Alternatives Cards Deck */}
      <div className="mt-6 space-y-4">
        {SUSTAINABLE_ALTERNATIVES.map((item) => (
          <div
            key={item.id}
            className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-2xl p-5 transition-all shadow-2xs group"
          >
            {/* Domain & Emission Tag */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/80 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Category: <strong className="text-slate-900 dark:text-white">{item.domain}</strong>
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  -{item.emissionsCutPercent}% Personal Emissions
                </span>
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full">
                  {item.costDeltaMonthly}
                </span>
              </div>
            </div>

            {/* Comparison Flow */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center mt-4">
              
              {/* Conventional Choice */}
              <div className="md:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 rounded-xl">
                <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                  Conventional / Current Choice
                </span>
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-1">
                  {item.conventionalChoice}
                </p>
              </div>

              {/* Arrow Connector */}
              <div className="md:col-span-1 flex items-center justify-center">
                <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Sustainable Alternative */}
              <div className="md:col-span-5 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-3.5 rounded-xl">
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
                  Recommended Sustainable Alternative
                </span>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                  {item.sustainableChoice}
                </p>
              </div>

            </div>

            {/* Impact & Health Bonus */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-sky-700 dark:text-sky-300 font-bold flex items-center gap-1.5 mb-1">
                  <HeartPulse className="w-3.5 h-3.5 text-sky-500" />
                  Direct Health Shield:
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  {item.healthBonus}
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-teal-700 dark:text-teal-300 font-bold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                  Atmospheric Impact:
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  {item.impactExplanation}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-600 dark:text-slate-400">
                ⚡ <strong>Immediate Next Step:</strong> {item.immediateAction}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenCopilot(`How do I switch from ${item.conventionalChoice} to ${item.sustainableChoice} step by step?`)}
                  className="text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline transition-colors"
                >
                  Consult Copilot
                </button>
                <button
                  onClick={() => onPledgeAlternative(item)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Adopt This Alternative</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

'use client';

import React from 'react';
import { SustainableAlternative } from '../types';
import { SUSTAINABLE_ALTERNATIVES } from '../data/mockData';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingDown, 
  DollarSign, 
  HeartPulse, 
  CheckCircle,
  Zap,
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
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 lg:p-6 backdrop-blur-md shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg lg:text-xl font-bold text-white tracking-tight">
              Sustainable Alternatives Matrix
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Compare conventional high-emission urban habits with low-emission alternatives and their direct family ROI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl">
            Up to 92% Emission Cut
          </span>
        </div>
      </div>

      {/* Alternatives Cards Grid */}
      <div className="mt-6 space-y-4">
        {SUSTAINABLE_ALTERNATIVES.map((item) => (
          <div
            key={item.id}
            className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-5 transition-all shadow-md group"
          >
            {/* Domain & Emission Tag */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/60">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Category: <strong className="text-white">{item.domain}</strong>
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5" />
                  -{item.emissionsCutPercent}% Personal Emissions
                </span>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                  {item.costDeltaMonthly}
                </span>
              </div>
            </div>

            {/* Comparison Flow: Conventional -> Green Alternative */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center mt-4">
              
              {/* Conventional Choice */}
              <div className="md:col-span-5 bg-rose-950/20 border border-rose-900/30 p-3.5 rounded-xl">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                  Conventional / Current Habit
                </span>
                <p className="text-xs font-medium text-slate-300 mt-1">
                  {item.conventionalChoice}
                </p>
              </div>

              {/* Arrow Connector */}
              <div className="md:col-span-1 flex items-center justify-center">
                <div className="p-2 rounded-full bg-slate-900 border border-slate-800 text-emerald-400">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Sustainable Alternative */}
              <div className="md:col-span-5 bg-emerald-950/20 border border-emerald-800/30 p-3.5 rounded-xl">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Recommended Sustainable Alternative
                </span>
                <p className="text-xs font-bold text-white mt-1">
                  {item.sustainableChoice}
                </p>
              </div>

            </div>

            {/* Direct Impact & Health Bonus */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80">
                <span className="text-sky-300 font-bold flex items-center gap-1.5 mb-1">
                  <HeartPulse className="w-3.5 h-3.5 text-sky-400" />
                  Direct Health Shield:
                </span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {item.healthBonus}
                </p>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80">
                <span className="text-teal-300 font-bold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  Atmospheric Chemistry Impact:
                </span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {item.impactExplanation}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                ⚡ <strong>Immediate Next Step:</strong> {item.immediateAction}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenCopilot(`How do I switch from ${item.conventionalChoice} to ${item.sustainableChoice} step by step?`)}
                  className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
                >
                  Consult Copilot
                </button>
                <button
                  onClick={() => onPledgeAlternative(item)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
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

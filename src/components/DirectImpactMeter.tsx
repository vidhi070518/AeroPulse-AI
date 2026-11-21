'use client';

import React from 'react';
import { DirectImpactMetrics } from '../types';
import { 
  HeartPulse, 
  Cigarette, 
  Leaf, 
  DollarSign, 
  ShieldCheck, 
  HelpCircle, 
  TrendingDown,
  Sparkles
} from 'lucide-react';

interface DirectImpactMeterProps {
  metrics: DirectImpactMetrics;
  onOpenCopilotWithContext: (prompt: string) => void;
}

export const DirectImpactMeter: React.FC<DirectImpactMeterProps> = ({
  metrics,
  onOpenCopilotWithContext
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 lg:p-6 shadow-2xl relative overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg lg:text-xl font-bold text-white tracking-tight">
              Direct Impact & Exposure Quantification
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Quantified personal health shield & environmental emissions reduction based on your current choices.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            Peer-Reviewed Models (Berkeley Earth & WHO)
          </span>
        </div>
      </div>

      {/* 4 Impact Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        
        {/* Metric 1: Cigarettes Inhaled Avoided */}
        <div className="bg-slate-950/80 border border-emerald-900/40 hover:border-emerald-500/40 p-4.5 rounded-xl transition-all shadow-md group">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold text-emerald-300">Toxic Inhalation Avoided</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <Cigarette className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl lg:text-4xl font-black text-white tracking-tight">
              {metrics.equivalentCigarettesAvoidedDay}
            </span>
            <span className="text-xs font-bold text-emerald-400 uppercase">Cigarettes / Person / Day</span>
          </div>

          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            Avoided fine particulate equivalent of {metrics.equivalentCigarettesAvoidedDay} cigarettes daily via window seals and targeted filtration.
          </p>

          <button
            onClick={() => onOpenCopilotWithContext('Explain the Berkeley Earth cigarette equivalent formula for PM2.5')}
            className="mt-3 text-[10px] text-emerald-400/90 hover:text-emerald-300 font-semibold flex items-center gap-1"
          >
            <HelpCircle className="w-3 h-3" />
            How is this calculated?
          </button>
        </div>

        {/* Metric 2: Lung Alveolar Deposition Drop */}
        <div className="bg-slate-950/80 border border-teal-900/40 hover:border-teal-500/40 p-4.5 rounded-xl transition-all shadow-md group">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold text-teal-300">Lung Deposition Cut</span>
            <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 group-hover:scale-110 transition-transform">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl lg:text-4xl font-black text-teal-400 tracking-tight">
              -{metrics.pm25DoseReductionPercent}%
            </span>
            <span className="text-xs font-bold text-slate-300">Peak Particulate</span>
          </div>

          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            Significant reduction in microscopic PM0.3–PM2.5 soot entering deep lung alveoli and the bloodstream.
          </p>

          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Lung Stress Score:</span>
            <span className="font-bold text-emerald-400">{metrics.lungDepositionIndexScore} / 100</span>
          </div>
        </div>

        {/* Metric 3: Local Carbon & Particulate Abated */}
        <div className="bg-slate-950/80 border border-sky-900/40 hover:border-sky-500/40 p-4.5 rounded-xl transition-all shadow-md group">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold text-sky-300">Community Carbon Prevented</span>
            <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 group-hover:scale-110 transition-transform">
              <Leaf className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl lg:text-4xl font-black text-white tracking-tight">
              {metrics.co2SavedKgMonth}
            </span>
            <span className="text-xs font-bold text-sky-400">kg CO₂e / Month</span>
          </div>

          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            Slashing tailpipe and cooking combustion prevents {metrics.pm25EmissionsPreventedGramsDay}g of direct ambient soot into your neighborhood daily.
          </p>

          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Local PM Prevented:</span>
            <span className="font-bold text-sky-400">{metrics.pm25EmissionsPreventedGramsDay} g/day</span>
          </div>
        </div>

        {/* Metric 4: Direct Financial & Energy Savings */}
        <div className="bg-slate-950/80 border border-amber-900/40 hover:border-amber-500/40 p-4.5 rounded-xl transition-all shadow-md group">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-semibold text-amber-300">Household Cost Saved</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl lg:text-4xl font-black text-amber-400 tracking-tight">
              ${metrics.energyCostSavedUsdMonth}
            </span>
            <span className="text-xs font-bold text-slate-300">/ Month</span>
          </div>

          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            Saved on fuel consumption, doctor clinic visits, and building DIY filter replacements over branded cartridges.
          </p>

          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Annualized Run Rate:</span>
            <span className="font-bold text-amber-400">${metrics.energyCostSavedUsdMonth * 12}/yr</span>
          </div>
        </div>

      </div>

      {/* Comparative Before / After Visual Bar */}
      <div className="mt-6 p-4 bg-slate-950/70 border border-slate-800 rounded-xl">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
            Overall Exposure Shield Progression
          </span>
          <span className="font-bold text-emerald-400">{metrics.pm25DoseReductionPercent}% Exposure Blocked</span>
        </div>

        <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden flex">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700 ease-out" 
            style={{ width: `${metrics.pm25DoseReductionPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
          <span>Unprotected Baseline (Drafty + Gas + Open Windows)</span>
          <span className="text-emerald-400 font-semibold">AeroPulse Optimal Defense</span>
        </div>
      </div>

    </div>
  );
};

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
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 lg:p-7 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Personal Exposure &amp; Emissions Shield
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Quantified personal health protection and community emissions averted based on your current routine.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Berkeley Earth &amp; WHO Standards
          </span>
        </div>
      </div>

      {/* 4 Impact Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        
        {/* Metric 1: Cigarettes Inhaled Avoided */}
        <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 p-4.5 rounded-2xl transition-all shadow-2xs hover:shadow-xs group">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Inhaled Toxic Dose Averted</span>
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400">
              <Cigarette className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {metrics.equivalentCigarettesAvoidedDay}
            </span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">Cigarettes / Person / Day</span>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Avoided particulate burden equivalent to {metrics.equivalentCigarettesAvoidedDay} cigarettes daily via window seals and targeted filtration.
          </p>

          <button
            onClick={() => onOpenCopilotWithContext('Explain the Berkeley Earth cigarette equivalent formula for PM2.5')}
            className="mt-3 text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1"
          >
            <HelpCircle className="w-3 h-3" />
            How is this calculated?
          </button>
        </div>

        {/* Metric 2: Lung Alveolar Deposition Drop */}
        <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 p-4.5 rounded-2xl transition-all shadow-2xs hover:shadow-xs group">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Lung Deposition Cut</span>
            <div className="p-1.5 rounded-lg bg-teal-100 dark:bg-teal-950/50 text-teal-700 dark:text-teal-400">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl lg:text-4xl font-black text-teal-700 dark:text-teal-400 tracking-tight">
              -{metrics.pm25DoseReductionPercent}%
            </span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Deep Lung Burden</span>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Significant reduction in fine sub-micron soot reaching deep alveoli sacs and entering the bloodstream.
          </p>

          <div className="mt-3 pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Lung Stress Index:</span>
            <span className="font-bold text-teal-700 dark:text-teal-400">{metrics.lungDepositionIndexScore} / 100</span>
          </div>
        </div>

        {/* Metric 3: Local Carbon & Particulate Abated */}
        <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 p-4.5 rounded-2xl transition-all shadow-2xs hover:shadow-xs group">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Community Carbon Prevented</span>
            <div className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-950/50 text-sky-700 dark:text-sky-400">
              <Leaf className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {metrics.co2SavedKgMonth}
            </span>
            <span className="text-xs font-bold text-sky-700 dark:text-sky-400">kg CO₂e / Month</span>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Slashing tailpipe and stove combustion prevents {metrics.pm25EmissionsPreventedGramsDay}g of direct ambient soot into your neighborhood daily.
          </p>

          <div className="mt-3 pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Neighborhood PM Saved:</span>
            <span className="font-bold text-sky-700 dark:text-sky-400">{metrics.pm25EmissionsPreventedGramsDay} g/day</span>
          </div>
        </div>

        {/* Metric 4: Direct Financial & Energy Savings */}
        <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 p-4.5 rounded-2xl transition-all shadow-2xs hover:shadow-xs group">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Household Cost Saved</span>
            <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl lg:text-4xl font-black text-amber-700 dark:text-amber-400 tracking-tight">
              ${metrics.energyCostSavedUsdMonth}
            </span>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">/ Month</span>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Saved on fuel consumption, respiratory doctor visits, and DIY filter replacements over expensive OEM cartridges.
          </p>

          <div className="mt-3 pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Annual Run Rate:</span>
            <span className="font-bold text-amber-700 dark:text-amber-400">${metrics.energyCostSavedUsdMonth * 12}/yr</span>
          </div>
        </div>

      </div>

      {/* Before / After Progress Bar */}
      <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <TrendingDown className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Personal Exposure Shield Progression
          </span>
          <span className="font-bold text-emerald-700 dark:text-emerald-400">{metrics.pm25DoseReductionPercent}% Exposure Blocked</span>
        </div>

        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
          <div 
            className="bg-emerald-600 dark:bg-emerald-500 h-full rounded-full transition-all duration-700 ease-out" 
            style={{ width: `${metrics.pm25DoseReductionPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mt-2">
          <span>Unprotected Baseline (Drafty + Open Windows + Dry Sweeping)</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">AeroPulse Optimal Defense</span>
        </div>
      </div>

    </div>
  );
};

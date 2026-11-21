'use client';

import React, { useState } from 'react';
import { DirectImpactMetrics } from '../types';
import { 
  HeartPulse, 
  Cigarette, 
  Leaf, 
  DollarSign, 
  ShieldCheck, 
  HelpCircle, 
  TrendingDown,
  Sparkles,
  ArrowRightLeft,
  CheckCircle2,
  AlertOctagon,
  Wind
} from 'lucide-react';

interface DirectImpactMeterProps {
  metrics: DirectImpactMetrics;
  onOpenCopilotWithContext: (prompt: string) => void;
}

export const DirectImpactMeter: React.FC<DirectImpactMeterProps> = ({
  metrics,
  onOpenCopilotWithContext
}) => {
  const [viewMode, setViewMode] = useState<'metrics' | 'comparison'>('metrics');
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
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => setViewMode('metrics')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                viewMode === 'metrics'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Key Metrics
            </button>
            <button
              type="button"
              onClick={() => setViewMode('comparison')}
              className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'comparison'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ArrowRightLeft className="w-3 h-3" />
              <span>Before vs. After Delta</span>
            </button>
          </div>
          <span className="hidden lg:flex text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Berkeley Earth
          </span>
        </div>
      </div>

      {viewMode === 'comparison' ? (
        /* Side-by-Side Impact Comparison Table */
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Unprotected Baseline */}
            <div className="p-5 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-rose-200/80 dark:border-rose-900/60">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300">
                    <AlertOctagon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">Unmitigated Conventional Baseline</h3>
                    <span className="text-[11px] text-rose-700 dark:text-rose-400">Habitual exposure during winter smog</span>
                  </div>
                </div>
                <span className="text-xs font-black text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/80 px-2 py-0.5 rounded-md">
                  High Risk
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 dark:bg-slate-900/60">
                  <span className="text-slate-500">Avg. 24h Inhaled PM2.5:</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">~245 µg/m³</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 dark:bg-slate-900/60">
                  <span className="text-slate-500">Cigarettes Inhaled Equivalent:</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">~11.1 cigs / person / day</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 dark:bg-slate-900/60">
                  <span className="text-slate-500">Deep Lung Alveolar Inflow:</span>
                  <span className="font-bold text-rose-600 dark:text-rose-400">1.4 Billion particles / hr</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 dark:bg-slate-900/60">
                  <span className="text-slate-500">Kitchen Combustion:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">Gas stove without intake makeup</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 dark:bg-slate-900/60">
                  <span className="text-slate-500">Indoor Cleaning:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">Dry broom sweeping (resuspension)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 dark:bg-slate-900/60">
                  <span className="text-slate-500">Outdoor Commute &amp; Exercise:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">Morning run at 7:00 AM (peak inversion)</span>
                </div>
              </div>
            </div>

            {/* AeroPulse Protected */}
            <div className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-200/80 dark:border-emerald-900/60">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">AeroPulse Shielded Defense</h3>
                    <span className="text-[11px] text-emerald-700 dark:text-emerald-400">Inversion-synchronized protective routine</span>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/80 px-2 py-0.5 rounded-md">
                  Optimal Shield
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 dark:bg-slate-900/60">
                  <span className="text-slate-500">Avg. 24h Inhaled PM2.5:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">~14 µg/m³ (WHO Compliant)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 dark:bg-slate-900/60">
                  <span className="text-slate-500">Cigarettes Inhaled Equivalent:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">~0.6 cigs / person / day</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 dark:bg-slate-900/60">
                  <span className="text-slate-500">Deep Lung Alveolar Inflow:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">&lt;80 Million particles / hr (-94%)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 dark:bg-slate-900/60">
                  <span className="text-slate-500">Kitchen Combustion:</span>
                  <span className="font-medium text-emerald-700 dark:text-emerald-300">Induction stove + cracked intake window</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 dark:bg-slate-900/60">
                  <span className="text-slate-500">Indoor Cleaning:</span>
                  <span className="font-medium text-emerald-700 dark:text-emerald-300">Damp microfiber mopping (zero dust)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white/70 dark:bg-slate-900/60">
                  <span className="text-slate-500">Ventilation Strategy:</span>
                  <span className="font-medium text-emerald-700 dark:text-emerald-300">12:30 PM - 2:30 PM solar window flush</span>
                </div>
              </div>
            </div>

          </div>

          {/* Delta Summary Highlight */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-sm block">
                  Net Impact of Your Choices: {metrics.pm25DoseReductionPercent}% Exposure Cut
                </span>
                <span className="text-slate-600 dark:text-slate-300">
                  Averts ~{metrics.equivalentCigarettesAvoidedDay} cigarettes of particulate damage per family member daily, saves {metrics.co2SavedKgMonth} kg CO₂e, and cuts \${metrics.energyCostSavedUsdMonth}/mo in costs.
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenCopilotWithContext('Explain the full direct impact calculation comparing baseline vs shielded home.')}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shrink-0 cursor-pointer self-start sm:self-auto"
            >
              Analyze with Copilot
            </button>
          </div>
        </div>
      ) : (
        <>
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
                type="button"
                onClick={() => onOpenCopilotWithContext('Explain the Berkeley Earth cigarette equivalent formula for PM2.5')}
                className="mt-3 text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
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
        </>
      )}

    </div>
  );
};

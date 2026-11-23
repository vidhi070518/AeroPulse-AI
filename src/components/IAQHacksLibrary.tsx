'use client';

import React, { useState } from 'react';
import { IAQ_HACKS_CATALOG } from '../data/mockData';
import { 
  Wrench, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Lightbulb, 
  Calculator,
  Sparkles
} from 'lucide-react';

interface IAQHacksLibraryProps {
  onOpenCopilot: (prompt: string) => void;
}

export const IAQHacksLibrary: React.FC<IAQHacksLibraryProps> = ({ onOpenCopilot }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('corsi-rosenthal-box');
  
  // Interactive Corsi-Rosenthal Sizing Calculator
  const [roomLength, setRoomLength] = useState<number>(15);
  const [roomWidth, setRoomWidth] = useState<number>(12);
  const [roomHeight, setRoomHeight] = useState<number>(9);
  const [targetACH, setTargetACH] = useState<number>(5);

  const roomVolumeCuFt = roomLength * roomWidth * roomHeight;
  const neededCFM = Math.round((roomVolumeCuFt * targetACH) / 60);

  const categories = [
    { id: 'all', label: 'All IAQ Hacks' },
    { id: 'diy-filtration', label: 'DIY Air Filtration' },
    { id: 'ventilation-timing', label: 'Ventilation Physics' },
    { id: 'kitchen-source', label: 'Kitchen & Combustion' },
    { id: 'wet-cleaning', label: 'Surface Resuspension' },
    { id: 'plants-truth', label: 'Debunked Myths' },
    { id: 'mask-seals', label: 'N95 Respirator Seals' }
  ];

  const filteredHacks = selectedCategory === 'all'
    ? IAQ_HACKS_CATALOG
    : IAQ_HACKS_CATALOG.filter(h => h.category === selectedCategory);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 lg:p-7 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Indoor Air Quality (IAQ) Masterclass Hacks
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Zero-cost adjustments, physics-backed DIY air cleaners, and scientifically debunked urban smog myths.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-full font-medium">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>ASHRAE &amp; EPA Validated</span>
        </div>
      </div>

      {/* Interactive Tool: Corsi-Rosenthal CADR / CFM Sizer */}
      <div className="mt-6 p-5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Interactive Clean Air Delivery (CADR) Room Sizer</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Calculate exact CFM required to achieve 5 Air Changes Per Hour (ACH) during winter smog:
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400">Dimensions:</span>
              <input 
                type="number" 
                value={roomLength} 
                onChange={(e) => setRoomLength(Number(e.target.value) || 1)}
                className="w-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded px-1 py-0.5 text-center text-xs"
              />
              <span className="text-slate-400">×</span>
              <input 
                type="number" 
                value={roomWidth} 
                onChange={(e) => setRoomWidth(Number(e.target.value) || 1)}
                className="w-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded px-1 py-0.5 text-center text-xs"
              />
              <span className="text-slate-400">×</span>
              <input 
                type="number" 
                value={roomHeight} 
                onChange={(e) => setRoomHeight(Number(e.target.value) || 1)}
                className="w-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded px-1 py-0.5 text-center text-xs"
              />
              <span className="text-slate-500 dark:text-slate-400">ft</span>
            </div>

            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400">Target ACH:</span>
              <select
                aria-label="Target Air Changes per Hour"
                value={targetACH}
                onChange={(e) => setTargetACH(Number(e.target.value) || 5)}
                className="bg-transparent text-slate-900 dark:text-white font-bold text-xs focus:outline-none cursor-pointer"
              >
                <option value={4} className="bg-white dark:bg-slate-900">4 ACH (Standard)</option>
                <option value={5} className="bg-white dark:bg-slate-900">5 ACH (Optimal)</option>
                <option value={6} className="bg-white dark:bg-slate-900">6 ACH (Severe Smog / Asthma)</option>
              </select>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3.5 py-1.5 rounded-xl text-emerald-800 dark:text-emerald-300 font-bold">
              Needed CADR: <span className="text-slate-900 dark:text-white text-sm">{neededCFM} CFM</span>
            </div>
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          💡 A 4-filter Corsi-Rosenthal Box delivers ~550 CFM—providing clean air for rooms up to <strong>{(550 * 60 / 5 / roomHeight).toFixed(0)} sq. ft.</strong> at ~1/5th the cost of commercial purifiers!
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mt-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Hack Cards List */}
      <div className="mt-5 space-y-3.5">
        {filteredHacks.map((hack) => {
          const isExpanded = expandedId === hack.id;

          return (
            <div
              key={hack.id}
              className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-2xs"
            >
              {/* Accordion Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : hack.id)}
                className="w-full p-5 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 focus:outline-none"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                      {hack.difficulty}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {hack.costLevel}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                      -{hack.pm25ReductionPercent}% Infiltration
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">
                    {hack.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {hack.summary}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold block">
                      {hack.impactVerdict}
                    </span>
                  </div>
                  <div className="p-1 rounded-lg bg-white dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Accordion Expanded Content */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-slate-200/80 dark:border-slate-800 mt-2 space-y-4">
                  
                  {/* Step by Step */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Step-by-Step Instructions:
                    </h4>
                    <ol className="space-y-2 text-xs text-slate-700 dark:text-slate-300 pl-1">
                      {hack.stepByStep.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="font-bold text-emerald-700 dark:text-emerald-400 shrink-0 w-4">{idx + 1}.</span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Scientific Mechanism */}
                  <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400 font-bold mb-1">
                      <Lightbulb className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Scientific Mechanism (Aerodynamics &amp; Chemistry):</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {hack.scientificMechanism}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="flex items-center justify-between text-xs pt-2">
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                      Impact: {hack.impactVerdict}
                    </span>
                    <button
                      onClick={() => onOpenCopilot(`Give me deeper technical details and troubleshooting for ${hack.title}`)}
                      className="text-teal-700 dark:text-teal-400 hover:underline font-semibold flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      Consult Copilot on this Hack
                    </button>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

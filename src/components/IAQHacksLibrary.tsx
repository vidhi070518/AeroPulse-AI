'use client';

import React, { useState } from 'react';
import { IAQHack } from '../types';
import { IAQ_HACKS_CATALOG } from '../data/mockData';
import { 
  Wrench, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Lightbulb, 
  Percent, 
  Calculator,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface IAQHacksLibraryProps {
  onOpenCopilot: (prompt: string) => void;
}

export const IAQHacksLibrary: React.FC<IAQHacksLibraryProps> = ({ onOpenCopilot }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('corsi-rosenthal-box');
  
  // Interactive Corsi-Rosenthal CFM Sizing Calculator State
  const [roomLength, setRoomLength] = useState<number>(15);
  const [roomWidth, setRoomWidth] = useState<number>(12);
  const [roomHeight, setRoomHeight] = useState<number>(9);
  const [targetACH, setTargetACH] = useState<number>(5); // 5 air changes/hr for severe smog

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
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 lg:p-6 backdrop-blur-md shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg lg:text-xl font-bold text-white tracking-tight">
              Indoor Air Quality (IAQ) Masterclass Hacks
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Zero-cost adjustments, physics-backed DIY air cleaners, and scientifically debunked urban smog myths.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ASHRAE & EPA Validated</span>
        </div>
      </div>

      {/* Interactive Tool: Corsi-Rosenthal CADR / CFM Sizer */}
      <div className="mt-5 p-4 bg-gradient-to-r from-emerald-950/30 to-slate-950/70 border border-emerald-800/40 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>Interactive Clean Air Delivery (CADR) Room Sizer</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Calculate exact CFM required to achieve 5 Air Changes Per Hour (ACH) during winter smog:
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-800">
              <span className="text-slate-400">Dimensions:</span>
              <input 
                type="number" 
                value={roomLength} 
                onChange={(e) => setRoomLength(Number(e.target.value) || 1)}
                className="w-10 bg-slate-800 text-white rounded px-1 py-0.5 text-center text-xs"
              />
              <span className="text-slate-500">×</span>
              <input 
                type="number" 
                value={roomWidth} 
                onChange={(e) => setRoomWidth(Number(e.target.value) || 1)}
                className="w-10 bg-slate-800 text-white rounded px-1 py-0.5 text-center text-xs"
              />
              <span className="text-slate-500">×</span>
              <input 
                type="number" 
                value={roomHeight} 
                onChange={(e) => setRoomHeight(Number(e.target.value) || 1)}
                className="w-10 bg-slate-800 text-white rounded px-1 py-0.5 text-center text-xs"
              />
              <span className="text-slate-400">ft</span>
            </div>

            <div className="bg-emerald-900/40 border border-emerald-600/40 px-3 py-1.5 rounded-lg text-emerald-300 font-bold">
              Needed CADR: <span className="text-white text-sm">{neededCFM} CFM</span>
            </div>
          </div>
        </div>

        <div className="mt-2.5 text-[11px] text-slate-400">
          💡 <em>A 4-filter Corsi-Rosenthal Box outputs ~550 CFM—providing clean air for rooms up to <strong>{(550 * 60 / 5 / roomHeight).toFixed(0)} sq. ft.</strong> with ease!</em>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mt-5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                : 'bg-slate-950/70 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Hack Cards Grid */}
      <div className="mt-5 space-y-4">
        {filteredHacks.map((hack) => {
          const isExpanded = expandedId === hack.id;

          return (
            <div
              key={hack.id}
              className="bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all"
            >
              {/* Accordion Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : hack.id)}
                className="w-full p-4.5 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 focus:outline-none"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                      {hack.difficulty}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {hack.costLevel}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-300">
                      -{hack.pm25ReductionPercent}% PM2.5 Infiltration
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-1.5">
                    {hack.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {hack.summary}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] text-emerald-400 font-semibold block">
                      {hack.impactVerdict}
                    </span>
                  </div>
                  <div className="p-1 rounded-lg bg-slate-800 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Accordion Expanded Content */}
              {isExpanded && (
                <div className="p-4.5 pt-0 border-t border-slate-800/80 mt-2 space-y-4">
                  
                  {/* Step by Step list */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Step-by-Step Implementation:
                    </h4>
                    <ol className="space-y-2 text-xs text-slate-300 pl-2">
                      {hack.stepByStep.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="font-bold text-emerald-400 shrink-0">{idx + 1}.</span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Scientific Mechanism */}
                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
                    <div className="flex items-center gap-1.5 text-indigo-300 font-bold mb-1">
                      <Lightbulb className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Scientific Mechanism (Aerodynamics & Chemistry):</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      {hack.scientificMechanism}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="flex items-center justify-between text-xs pt-2">
                    <span className="text-emerald-400 font-semibold">
                      Impact: {hack.impactVerdict}
                    </span>
                    <button
                      onClick={() => onOpenCopilot(`Give me deeper technical details and troubleshooting for ${hack.title}`)}
                      className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
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

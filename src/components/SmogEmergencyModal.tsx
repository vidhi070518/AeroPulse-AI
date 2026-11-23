'use client';

import React, { useEffect } from 'react';
import { LocationCity } from '../types';
import { 
  X, 
  CheckCircle2, 
  Radio
} from 'lucide-react';

interface SmogEmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: LocationCity;
  onExecuteProtocol: () => void;
}

export const SmogEmergencyModal: React.FC<SmogEmergencyModalProps> = ({
  isOpen,
  onClose,
  location,
  onExecuteProtocol
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 dark:bg-slate-950/70 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Hazardous Winter Smog Crisis Protocol"
        className="relative w-full max-w-xl bg-white dark:bg-slate-950 border border-rose-300 dark:border-rose-800 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col"
      >
        
        {/* Header */}
        <div className="bg-rose-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Radio className="w-5 h-5 animate-pulse" />
            <div>
              <span className="text-xs font-black uppercase tracking-wider block">
                HAZARDOUS WINTER SMOG CRISIS PROTOCOL
              </span>
              <span className="text-[11px] opacity-90">
                {location.name} Ambient AQI: {location.aqi} • PM2.5: {location.pm25} µg/m³
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close emergency smog protocol modal"
            className="p-1 rounded-lg hover:bg-rose-700 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Protocol Checklist Body */}
        <div className="p-5 overflow-y-auto space-y-3.5 text-xs">
          <p className="text-slate-700 dark:text-slate-300 font-medium">
            Immediate 4-step emergency triage to shield your household from severe alveolar toxic damage:
          </p>

          {/* Action 1 */}
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-2xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </span>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Establish a Single &quot;Clean Room Haven&quot;
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Choose the most interior bedroom with the fewest windows. Move all family members and pets inside. Place a damp rolled towel tightly under the door sill and run your highest CADR purifier on Turbo mode.
              </p>
            </div>
          </div>

          {/* Action 2 */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </span>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Cancel All Outdoor Exposure &amp; Morning Exercise
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Stagnant thermal inversion is trapping diesel exhaust within 100m of the ground. Inhaling air during outdoor exercise at this AQI deposits over 800 million sub-micron particles per minute into deep lung tissue.
              </p>
            </div>
          </div>

          {/* Action 3 */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </span>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Cease All Indoor Combustion Sources
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Do NOT ignite incense sticks, candles, mosquito coils, or unvented flame gas heaters. Avoid deep frying with oil. Shift boiling and cooking to microwave or electric induction.
              </p>
            </div>
          </div>

          {/* Action 4 */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center shrink-0 text-xs">
              4
            </span>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                Respiratory &amp; Medical Safeguard
              </h4>
              <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                For asthmatic children or elderly members, keep salbutamol rescue inhalers and pulse oximeter accessible. If SpO2 drops below 93% or persistent stridor occurs, seek immediate oxygen support.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Automates purifier boost and seals home simulation.
          </span>
          <button
            onClick={() => {
              onExecuteProtocol();
              onClose();
            }}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Execute Crisis Protocol</span>
          </button>
        </div>

      </div>
    </div>
  );
};

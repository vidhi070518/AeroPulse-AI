'use client';

import React, { useEffect } from 'react';
import { LocationCity, DirectImpactMetrics } from '../types';
import { 
  FileText, 
  X, 
  Copy, 
  Printer, 
  Download 
} from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: LocationCity;
  airShieldScore: number;
  impactMetrics: DirectImpactMetrics;
  onCopyPlan: () => void;
}

/**
 * Executive Clean Air Action Brief Modal.
 * Generates print-ready and exportable certified household environmental defenses.
 */
export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  airShieldScore,
  impactMetrics,
  onCopyPlan
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
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-xs" 
      />
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Household Clean Air Action Brief"
        id="printable-action-brief" 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl z-10 max-h-[88vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Household Clean Air Action Brief</h3>
              <p className="text-xs text-slate-500">Certified Environmental Defense Summary for {currentLocation.name}</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white no-print cursor-pointer"
            aria-label="Close Action Brief Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Location Air Status</span>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {currentLocation.name} — AQI {currentLocation.aqi} (PM2.5: {currentLocation.pm25} µg/m³)
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Overall Air Shield</span>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                {airShieldScore}% Optimal
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Key Exposure Metrics:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Inhaled Cigarettes Averted</span>
                <span className="text-lg font-black text-slate-900 dark:text-white mt-1 block">{impactMetrics.equivalentCigarettesAvoidedDay} / day</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Lung Deposition Cut</span>
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-1 block">-{impactMetrics.pm25DoseReductionPercent}%</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">CO₂ Prevented</span>
                <span className="text-lg font-black text-sky-600 dark:text-sky-400 mt-1 block">{impactMetrics.co2SavedKgMonth} kg/mo</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Monthly Cost Saved</span>
                <span className="text-lg font-black text-amber-600 dark:text-amber-400 mt-1 block">${impactMetrics.energyCostSavedUsdMonth}/mo</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Prescribed Daily Actions:</h4>
            <ul className="space-y-1.5 list-disc pl-4 text-slate-600 dark:text-slate-300">
              <li><strong>Thermal Inversion Window:</strong> Restrict home cross-ventilation strictly to <strong>12:30 PM - 2:30 PM</strong>. Keep all windows sealed between 6:00 PM and 11:30 AM.</li>
              <li><strong>Indoor Filtration:</strong> Maintain clean sleep bedroom haven below 15 µg/m³ with dedicated purifier running on quiet/boost.</li>
              <li><strong>Kitchen Combustion Mitigation:</strong> Cook with induction or run range hood with a 1-inch cracked intake window to prevent apartment depressurization.</li>
              <li><strong>Cleaning Protocol:</strong> Damp microfiber mopping twice weekly to prevent fine lead and tire rubber resuspension.</li>
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between no-print">
          <span className="text-[11px] text-slate-400">Generated by AeroPulse AI Health Science Engine</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCopyPlan}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy formatted markdown plan"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Plan</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Brief</span>
            </button>
            <button
              type="button"
              onClick={() => {
                window.print();
                onClose();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


'use client';

import React from 'react';
import { LocationCity } from '../types';
import { 
  AlertTriangle, 
  X, 
  ShieldAlert, 
  CheckCircle2, 
  Flame, 
  Wind, 
  HeartPulse, 
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Red Hazard Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-rose-950/80 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-slate-950 border-2 border-rose-600/80 rounded-3xl shadow-2xl shadow-rose-950/80 overflow-hidden z-10 flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Flashing Red Emergency Banner */}
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
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-rose-700 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Protocol Checklist Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <p className="text-slate-300 font-medium">
            Immediate 4-step emergency triage to shield your household from severe alveolar toxic damage:
          </p>

          {/* Action 1 */}
          <div className="p-3.5 bg-rose-950/30 border border-rose-900/50 rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </span>
            <div>
              <h4 className="font-bold text-white text-sm">
                Establish a Single &quot;Clean Room Haven&quot;
              </h4>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Choose the most interior bedroom with the fewest windows. Move all family members and pets inside. Place a damp rolled towel tightly under the door sill and run your highest CADR purifier on Turbo mode.
              </p>
            </div>
          </div>

          {/* Action 2 */}
          <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </span>
            <div>
              <h4 className="font-bold text-white text-sm">
                Cancel All Outdoor Exposure &amp; Morning Exercise
              </h4>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Stagnant thermal inversion is trapping diesel exhaust within 100m of the ground. Inhaling air during outdoor exercise at this AQI deposits over 800 million sub-micron particles per minute into deep lung tissue.
              </p>
            </div>
          </div>

          {/* Action 3 */}
          <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </span>
            <div>
              <h4 className="font-bold text-white text-sm">
                Cease All Indoor Combustion Sources
              </h4>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Do NOT ignite incense sticks, candles, mosquito coils, or unvented flame gas heaters. Avoid deep frying with oil. Shift boiling and cooking to microwave or electric induction.
              </p>
            </div>
          </div>

          {/* Action 4 */}
          <div className="p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-bold flex items-center justify-center shrink-0 text-xs">
              4
            </span>
            <div>
              <h4 className="font-bold text-white text-sm">
                Respiratory &amp; Medical Safeguard
              </h4>
              <p className="text-slate-300 mt-1 leading-relaxed">
                For asthmatic children or elderly members, keep salbutamol rescue inhalers and pulse oximeter accessible. If SpO2 drops below 93% or persistent stridor occurs, seek immediate oxygen support.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Execution Button */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Automates purifier boost and seals home simulation.
          </span>
          <button
            onClick={() => {
              onExecuteProtocol();
              onClose();
            }}
            className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-lg shadow-rose-950"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Execute Crisis Protocol</span>
          </button>
        </div>

      </div>
    </div>
  );
};

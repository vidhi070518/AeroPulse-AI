'use client';

import React from 'react';
import { LocationCity, HouseholdProfile } from '../types';
import { LOCATION_PRESETS } from '../data/mockData';
import { 
  Wind, 
  MapPin, 
  AlertTriangle, 
  Sliders, 
  Sparkles, 
  ShieldCheck,
  Layers,
  Thermometer,
  Sun,
  Moon,
  FileText
} from 'lucide-react';

interface HeaderProps {
  currentLocation: LocationCity;
  onSelectLocation: (loc: LocationCity) => void;
  household: HouseholdProfile;
  onOpenHouseholdModal: () => void;
  onOpenCopilot: () => void;
  emergencyMode: boolean;
  onToggleEmergencyMode: () => void;
  airShieldScore: number;
  onExportReport: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenCustomLocationModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onSelectLocation,
  household,
  onOpenHouseholdModal,
  onOpenCopilot,
  emergencyMode,
  onToggleEmergencyMode,
  airShieldScore,
  onExportReport,
  darkMode,
  onToggleDarkMode,
  onOpenCustomLocationModal
}) => {
  const getSeverityBadge = () => {
    switch (currentLocation.severity) {
      case 'hazardous':
        return { 
          bg: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800', 
          dot: 'bg-rose-500', 
          text: 'Hazardous Smog' 
        };
      case 'very-unhealthy':
        return { 
          bg: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800', 
          dot: 'bg-purple-500', 
          text: 'Very Unhealthy' 
        };
      case 'unhealthy':
        return { 
          bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800', 
          dot: 'bg-amber-500', 
          text: 'Unhealthy' 
        };
      case 'unhealthy-sensitive':
        return { 
          bg: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/40 dark:text-orange-300 dark:border-orange-800', 
          dot: 'bg-orange-500', 
          text: 'Sensitive Alert' 
        };
      default:
        return { 
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800', 
          dot: 'bg-emerald-500', 
          text: 'Moderate Air' 
        };
    }
  };

  const badge = getSeverityBadge();

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-200 ${
      emergencyMode
        ? 'bg-rose-50/95 dark:bg-rose-950/90 border-rose-200 dark:border-rose-900/60'
        : 'bg-white/95 dark:bg-slate-950/90 border-slate-200/80 dark:border-slate-800 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center justify-between gap-3">
          
          {/* Left: Brand Identity & Status */}
          <div className="flex items-center gap-3 shrink-0">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all shadow-xs ${
              emergencyMode 
                ? 'bg-rose-600 text-white' 
                : 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-emerald-500/10'
            }`}>
              <Wind className="w-4 h-4" />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                AeroPulse
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
                  AI
                </span>
              </span>

              <span className={`hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                {badge.text}
              </span>
            </div>
          </div>

          {/* Center: Integrated Environmental Capsule */}
          <div className="flex items-center bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-1 text-xs shadow-2xs">
            {/* City Select */}
            <div className="flex items-center gap-1.5 px-2 py-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <select
                aria-label="Select City and Air Basin"
                value={currentLocation.id}
                onChange={(e) => {
                  if (e.target.value === '__custom__') {
                    onOpenCustomLocationModal();
                    return;
                  }
                  const found = LOCATION_PRESETS.find(l => l.id === e.target.value);
                  if (found) onSelectLocation(found);
                }}
                className="bg-transparent text-slate-900 dark:text-slate-100 font-semibold focus:outline-none cursor-pointer max-w-[130px] sm:max-w-[180px] md:max-w-[210px] truncate pr-1"
              >
                {!LOCATION_PRESETS.some(l => l.id === currentLocation.id) && (
                  <option value={currentLocation.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-bold">
                    {currentLocation.name} (AQI {currentLocation.aqi})
                  </option>
                )}
                {LOCATION_PRESETS.map((loc) => (
                  <option key={loc.id} value={loc.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                    {loc.name} — AQI {loc.aqi}
                  </option>
                ))}
                <option value="__custom__" className="bg-emerald-50 dark:bg-emerald-950 font-bold text-emerald-700 dark:text-emerald-300">
                  + Custom City / Air Sim...
                </option>
              </select>

              <button
                type="button"
                onClick={onOpenCustomLocationModal}
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer shrink-0"
                title="Simulate Custom Atmospheric Environment"
              >
                + Sim
              </button>
            </div>

            {/* Inversion Cap */}
            <div className="hidden lg:flex items-center gap-1.5 border-l border-slate-200 dark:border-slate-800 pl-2.5 pr-2 py-0.5 text-slate-600 dark:text-slate-300" title="Thermal Inversion Boundary Layer Ceiling">
              <Layers className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
              <span>Cap:</span>
              <span className="font-bold text-slate-900 dark:text-white">{currentLocation.inversionCeilingMeters}m</span>
              <span className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold bg-amber-100/80 dark:bg-amber-950/80 px-1 py-0.2 rounded">Trapped</span>
            </div>

            {/* Weather & Wind */}
            <div className="hidden xl:flex items-center gap-1.5 border-l border-slate-200 dark:border-slate-800 pl-2.5 pr-2 py-0.5 text-slate-600 dark:text-slate-300">
              <Thermometer className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span>{currentLocation.temperatureC}°C</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span>{currentLocation.windSpeedKmh} km/h</span>
            </div>
          </div>

          {/* Right: Actions Cluster */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Household Shield Score */}
            <div 
              className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl px-2.5 py-1.5 text-xs text-emerald-800 dark:text-emerald-300 font-semibold shadow-2xs"
              title="Overall Household Air Shield Rating"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Shield:</span>
              <span className="text-slate-900 dark:text-white font-bold">{airShieldScore}%</span>
            </div>

            {/* Profile Config */}
            <button
              type="button"
              onClick={onOpenHouseholdModal}
              className="hidden md:flex items-center gap-1.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs cursor-pointer"
              title="Configure Family Profile & Home Envelope"
            >
              <Sliders className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span className="truncate max-w-[85px]">{household.name}</span>
            </button>

            {/* Smog Emergency Protocol */}
            <button
              type="button"
              onClick={onToggleEmergencyMode}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                emergencyMode
                  ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-900/60'
              }`}
              title="Smog Crisis Emergency Protocol"
            >
              <AlertTriangle className={`w-3.5 h-3.5 ${emergencyMode ? 'text-white' : 'text-rose-500'}`} />
              <span className="hidden sm:inline">{emergencyMode ? 'Emergency' : 'Smog Protocol'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Report Export */}
            <button
              type="button"
              onClick={onExportReport}
              className="hidden 2xl:flex items-center gap-1.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-medium transition-colors cursor-pointer shadow-2xs"
              title="Export Clean Air Brief"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Report</span>
            </button>

            {/* Ask Copilot */}
            <button
              type="button"
              onClick={onOpenCopilot}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Copilot</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};

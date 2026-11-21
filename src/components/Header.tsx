'use client';

import React from 'react';
import { LocationCity, HouseholdProfile } from '../types';
import { LOCATION_PRESETS } from '../data/mockData';
import { 
  Wind, 
  MapPin, 
  AlertTriangle, 
  ShieldCheck, 
  Sliders, 
  Sparkles, 
  Award,
  Layers,
  Thermometer,
  Compass
} from 'lucide-react';

interface HeaderProps {
  currentLocation: LocationCity;
  onSelectLocation: (loc: LocationCity) => void;
  household: HouseholdProfile;
  onOpenHouseholdModal: () => void;
  onOpenCopilot: () => void;
  emergencyMode: boolean;
  onToggleEmergencyMode: () => void;
  promptCredits: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onSelectLocation,
  household,
  onOpenHouseholdModal,
  onOpenCopilot,
  emergencyMode,
  onToggleEmergencyMode,
  promptCredits
}) => {
  const getSeverityBadge = () => {
    switch (currentLocation.severity) {
      case 'hazardous':
        return { bg: 'bg-rose-500/20 text-rose-400 border-rose-500/40', text: 'HAZARDOUS SMOG' };
      case 'very-unhealthy':
        return { bg: 'bg-purple-500/20 text-purple-400 border-purple-500/40', text: 'VERY UNHEALTHY' };
      case 'unhealthy':
        return { bg: 'bg-amber-500/20 text-amber-400 border-amber-500/40', text: 'UNHEALTHY' };
      case 'unhealthy-sensitive':
        return { bg: 'bg-orange-500/20 text-orange-400 border-orange-500/40', text: 'SENSITIVE ALERT' };
      default:
        return { bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40', text: 'MODERATE' };
    }
  };

  const badge = getSeverityBadge();

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
      emergencyMode 
        ? 'bg-rose-950/80 border-rose-800/60 shadow-lg shadow-rose-950/50' 
        : 'bg-slate-950/80 border-slate-800/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Brand & Live Alert Pill */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${
                emergencyMode 
                  ? 'bg-rose-600 text-white border-rose-400 animate-pulse' 
                  : 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white border-emerald-400/40 shadow-md shadow-emerald-950'
              }`}>
                <Wind className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                    AeroPulse <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">AI</span>
                  </h1>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
                    {badge.text}
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  Winter Smog Defense & Community Air Copilot
                </p>
              </div>
            </div>

            {/* Mobile Emergency Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onToggleEmergencyMode}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                  emergencyMode
                    ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-900'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-rose-950 hover:text-rose-400'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                {emergencyMode ? 'Emergency Active' : 'Smog Protocol'}
              </button>
            </div>
          </div>

          {/* Environmental Conditions HUD & Location Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Location Selector */}
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <select
                aria-label="Select City and Air Basin"
                value={currentLocation.id}
                onChange={(e) => {
                  const found = LOCATION_PRESETS.find(l => l.id === e.target.value);
                  if (found) onSelectLocation(found);
                }}
                className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer pr-2"
              >
                {LOCATION_PRESETS.map((loc) => (
                  <option key={loc.id} value={loc.id} className="bg-slate-900 text-slate-100">
                    {loc.name} — AQI {loc.aqi} ({loc.country})
                  </option>
                ))}
              </select>
            </div>

            {/* Inversion Ceiling Badge */}
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300" title="Thermal Inversion Boundary Layer Altitude">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Inversion Cap:</span>
              <span className="font-bold text-indigo-300">{currentLocation.inversionCeilingMeters}m</span>
              <span className="text-[10px] text-amber-400 font-medium bg-amber-400/10 px-1 rounded">Trapped</span>
            </div>

            {/* Temperature & Wind */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300">
              <Thermometer className="w-3.5 h-3.5 text-sky-400" />
              <span>{currentLocation.temperatureC}°C</span>
              <span className="text-slate-600">|</span>
              <Compass className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentLocation.windSpeedKmh} km/h</span>
            </div>

            {/* Actions: Household Profile, Emergency Button, Copilot */}
            <div className="flex items-center gap-2 ml-auto lg:ml-0">
              
              {/* Household Config Button */}
              <button
                onClick={onOpenHouseholdModal}
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm"
                title="Configure Family Members & Home Setup"
              >
                <Sliders className="w-3.5 h-3.5 text-teal-400" />
                <span className="hidden md:inline">Profile:</span>
                <span className="font-semibold text-teal-300 truncate max-w-[110px]">{household.name}</span>
              </button>

              {/* Desktop Smog Protocol Button */}
              <button
                onClick={onToggleEmergencyMode}
                className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  emergencyMode
                    ? 'bg-rose-600 text-white border-rose-400 shadow-md shadow-rose-900 animate-pulse'
                    : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-rose-950/60 hover:text-rose-300 hover:border-rose-800'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{emergencyMode ? 'Emergency Active' : 'Smog Protocol'}</span>
              </button>

              {/* PromptWars Credits Badge */}
              <div 
                className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/40 rounded-xl px-2.5 py-1.5 text-xs text-amber-300 font-semibold cursor-pointer hover:border-amber-400 transition-all"
                title="PromptWars Leaderboard Credits accumulated from smart clean actions!"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>{promptCredits.toLocaleString()}</span>
                <span className="text-[10px] text-amber-400/80 font-normal">CR</span>
              </div>

              {/* Ask Copilot Button */}
              <button
                onClick={onOpenCopilot}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-950"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask Copilot</span>
              </button>

            </div>

          </div>

        </div>
      </div>
    </header>
  );
};

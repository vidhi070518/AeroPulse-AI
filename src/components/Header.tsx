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
  Award,
  Layers,
  Thermometer,
  Compass,
  Sun,
  Moon
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
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  onSelectLocation,
  household,
  onOpenHouseholdModal,
  onOpenCopilot,
  emergencyMode,
  onToggleEmergencyMode,
  promptCredits,
  darkMode,
  onToggleDarkMode
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
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-200 ${
      emergencyMode
        ? 'bg-rose-50/95 dark:bg-rose-950/90 border-rose-200 dark:border-rose-900/60'
        : 'bg-white/95 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3.5">
          
          {/* Logo & Category Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shadow-xs ${
                emergencyMode 
                  ? 'bg-rose-600 text-white' 
                  : 'bg-emerald-600 text-white dark:bg-emerald-500'
              }`}>
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                    AeroPulse <span className="text-[11px] px-1.5 py-0.5 rounded-md font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">AI</span>
                  </h1>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                    {badge.text}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                  Urban Air Quality &amp; Winter Smog Defense Copilot
                </p>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                onClick={onToggleDarkMode}
                className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>
              <button
                onClick={onToggleEmergencyMode}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1 ${
                  emergencyMode
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Smog Protocol</span>
              </button>
            </div>
          </div>

          {/* Environmental Controls & Location Selector */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Location Selector */}
            <div className="flex items-center gap-2 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-1.5 text-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <select
                aria-label="Select City and Air Basin"
                value={currentLocation.id}
                onChange={(e) => {
                  const found = LOCATION_PRESETS.find(l => l.id === e.target.value);
                  if (found) onSelectLocation(found);
                }}
                className="bg-transparent text-slate-800 dark:text-slate-200 font-medium focus:outline-none cursor-pointer pr-1"
              >
                {LOCATION_PRESETS.map((loc) => (
                  <option key={loc.id} value={loc.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                    {loc.name} — AQI {loc.aqi} ({loc.country})
                  </option>
                ))}
              </select>
            </div>

            {/* Inversion Cap Badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300" title="Thermal Inversion Boundary Layer Ceiling">
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>Inversion Cap:</span>
              <span className="font-bold text-slate-900 dark:text-white">{currentLocation.inversionCeilingMeters}m</span>
              <span className="text-[10px] text-amber-700 dark:text-amber-300 font-medium bg-amber-100 dark:bg-amber-950/60 px-1.5 py-0.2 rounded">Trapped</span>
            </div>

            {/* Temp & Wind */}
            <div className="hidden md:flex items-center gap-2 bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300">
              <Thermometer className="w-3.5 h-3.5 text-sky-500" />
              <span>{currentLocation.temperatureC}°C</span>
              <span className="text-slate-300 dark:text-slate-600">|</span>
              <Compass className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentLocation.windSpeedKmh} km/h</span>
            </div>

            {/* Right Hand Controls: Profile, Theme, Credits, Copilot */}
            <div className="flex items-center gap-2 ml-auto lg:ml-0">
              
              {/* Profile Config */}
              <button
                onClick={onOpenHouseholdModal}
                className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-medium flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs"
                title="Configure Family Members & Home Construction"
              >
                <Sliders className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span className="hidden sm:inline">Profile:</span>
                <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[100px]">{household.name}</span>
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={onToggleDarkMode}
                className="hidden lg:flex p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors"
                title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                aria-label="Toggle Theme"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>

              {/* Desktop Smog Protocol Button */}
              <button
                onClick={onToggleEmergencyMode}
                className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  emergencyMode
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-rose-300 dark:hover:border-rose-800'
                }`}
              >
                <AlertTriangle className={`w-3.5 h-3.5 ${emergencyMode ? 'text-white' : 'text-rose-500'}`} />
                <span>{emergencyMode ? 'Emergency Active' : 'Smog Protocol'}</span>
              </button>

              {/* PromptWars Credits Badge */}
              <div 
                className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl px-2.5 py-1.5 text-xs text-amber-800 dark:text-amber-300 font-semibold cursor-pointer shadow-2xs"
                title="PromptWars Leaderboard Credits accumulated"
              >
                <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{promptCredits.toLocaleString()}</span>
                <span className="text-[10px] opacity-75 font-normal">CR</span>
              </div>

              {/* Ask Copilot Button */}
              <button
                onClick={onOpenCopilot}
                className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-xl px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
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

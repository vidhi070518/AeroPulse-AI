'use client';

import React from 'react';
import { LocationCity } from '../types';
import { 
  AlertOctagon, 
  Layers, 
  Info, 
  Sun, 
  Activity, 
  ShieldAlert, 
  TrendingUp, 
  Clock,
  Wind
} from 'lucide-react';

interface AirQualityOverviewProps {
  location: LocationCity;
  onSelectHour?: (hour: number) => void;
  selectedHour?: number;
}

export const AirQualityOverview: React.FC<AirQualityOverviewProps> = ({
  location,
  onSelectHour,
  selectedHour
}) => {
  const getAQIStyle = (aqi: number) => {
    if (aqi <= 50) return { 
      text: 'text-emerald-700 dark:text-emerald-400', 
      stroke: 'text-emerald-500',
      gradientFrom: '#10b981',
      gradientTo: '#059669',
      glow: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      bg: 'bg-emerald-50 dark:bg-emerald-950/40', 
      border: 'border-emerald-200 dark:border-emerald-800', 
      label: 'Good Air' 
    };
    if (aqi <= 100) return { 
      text: 'text-amber-700 dark:text-amber-400', 
      stroke: 'text-amber-500', 
      gradientFrom: '#f59e0b',
      gradientTo: '#d97706',
      glow: 'bg-amber-500/10 dark:bg-amber-500/20',
      bg: 'bg-amber-50 dark:bg-amber-950/40', 
      border: 'border-amber-200 dark:border-amber-800', 
      label: 'Moderate' 
    };
    if (aqi <= 150) return { 
      text: 'text-orange-700 dark:text-orange-400', 
      stroke: 'text-orange-500', 
      gradientFrom: '#f97316',
      gradientTo: '#ea580c',
      glow: 'bg-orange-500/10 dark:bg-orange-500/20',
      bg: 'bg-orange-50 dark:bg-orange-950/40', 
      border: 'border-orange-200 dark:border-orange-800', 
      label: 'Sensitive Alert' 
    };
    if (aqi <= 200) return { 
      text: 'text-rose-700 dark:text-rose-400', 
      stroke: 'text-rose-500', 
      gradientFrom: '#f43f5e',
      gradientTo: '#e11d48',
      glow: 'bg-rose-500/10 dark:bg-rose-500/20',
      bg: 'bg-rose-50 dark:bg-rose-950/40', 
      border: 'border-rose-200 dark:border-rose-800', 
      label: 'Unhealthy' 
    };
    if (aqi <= 300) return { 
      text: 'text-purple-700 dark:text-purple-400', 
      stroke: 'text-purple-500', 
      gradientFrom: '#a855f7',
      gradientTo: '#7e22ce',
      glow: 'bg-purple-500/10 dark:bg-purple-500/20',
      bg: 'bg-purple-50 dark:bg-purple-950/40', 
      border: 'border-purple-200 dark:border-purple-800', 
      label: 'Very Unhealthy' 
    };
    return { 
      text: 'text-rose-700 dark:text-rose-400', 
      stroke: 'text-rose-600', 
      gradientFrom: '#f43f5e',
      gradientTo: '#9f1239',
      glow: 'bg-rose-500/10 dark:bg-rose-500/25',
      bg: 'bg-rose-50 dark:bg-rose-950/50', 
      border: 'border-rose-300 dark:border-rose-800', 
      label: 'Severe / Hazardous Smog' 
    };
  };

  const aqiStyle = getAQIStyle(location.aqi);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 lg:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none">
      
      {/* Top Banner: Location Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {location.name}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              {location.neighborhood}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{location.weatherSummary}</span>
          </p>
        </div>

        {/* Dominant Hazard Pill */}
        <div className="bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/50 rounded-2xl px-4 py-2 flex items-center gap-2.5 self-start md:self-auto shadow-2xs">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shrink-0" />
          <div>
            <span className="text-[10px] text-rose-700 dark:text-rose-400 uppercase tracking-wider font-bold block leading-none">
              Dominant Toxic Hazard
            </span>
            <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5">
              {location.primaryPollutant}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Visual Gauge + Pollutants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-6 items-stretch">
        
        {/* Apple Weather Style Circular AQI Hero Card */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className={`absolute w-36 h-36 rounded-full blur-2xl ${aqiStyle.glow} pointer-events-none -top-6 -right-6`} />

          <div className="relative flex items-center justify-center w-44 h-44">
            <svg className="w-full h-full transform -rotate-90">
              <defs>
                <linearGradient id="aqiArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={aqiStyle.gradientFrom} />
                  <stop offset="100%" stopColor={aqiStyle.gradientTo} />
                </linearGradient>
              </defs>
              <circle
                cx="88"
                cy="88"
                r="72"
                stroke="currentColor"
                strokeWidth="11"
                className="text-slate-200/70 dark:text-slate-800"
                fill="transparent"
              />
              <circle
                cx="88"
                cy="88"
                r="72"
                stroke="url(#aqiArcGradient)"
                strokeWidth="11"
                strokeDasharray={452}
                strokeDashoffset={Math.max(0, 452 - (452 * Math.min(500, location.aqi)) / 500)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                fill="transparent"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">
                Air Quality Index
              </span>
              <span className="text-5xl font-black tracking-tight text-slate-900 dark:text-white mt-0.5">
                {location.aqi}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                CPCB / US EPA
              </span>
            </div>
          </div>

          <div className="mt-3 text-center space-y-1.5">
            <span className={`inline-block text-xs font-bold px-3.5 py-1 rounded-full border shadow-2xs ${aqiStyle.bg} ${aqiStyle.border} ${aqiStyle.text}`}>
              {aqiStyle.label}
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-[240px] leading-relaxed">
              {location.historicalComparison}
            </p>
          </div>
        </div>

        {/* 6 Pollutant Cards Bento Grid */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
          
          {/* PM2.5 Spotlight */}
          <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/90 dark:border-rose-900/60 p-4 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-700 dark:text-rose-400">PM₂.₅ (Fine Soot)</span>
                <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <div className="mt-2.5 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{location.pm25}</span>
                <span className="text-[11px] text-slate-500 font-medium">µg/m³</span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-rose-200/60 dark:border-rose-900/40">
              <div className="w-full bg-rose-200/60 dark:bg-rose-900/60 h-1.5 rounded-full overflow-hidden mb-1.5">
                <div 
                  className="bg-rose-600 h-full rounded-full" 
                  style={{ width: `${Math.min(100, (location.pm25 / 150) * 100)}%` }} 
                />
              </div>
              <span className="text-[10px] text-rose-700 dark:text-rose-400 font-bold block">
                {(location.pm25 / 15).toFixed(1)}× WHO Safe Limit
              </span>
            </div>
          </div>

          {/* PM10 */}
          <div className="bg-slate-50/80 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">PM₁₀ (Coarse Dust)</span>
                <Activity className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <div className="mt-2.5 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{location.pm10}</span>
                <span className="text-[11px] text-slate-500 font-medium">µg/m³</span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200/80 dark:border-slate-800">
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1.5">
                <div 
                  className="bg-amber-500 h-full rounded-full" 
                  style={{ width: `${Math.min(100, (location.pm10 / 250) * 100)}%` }} 
                />
              </div>
              <span className="text-[10px] text-slate-500 block">Road Silt &amp; Crustal Dust</span>
            </div>
          </div>

          {/* NO2 */}
          <div className="bg-slate-50/80 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">NO₂ (Combustion)</span>
                <TrendingUp className="w-3.5 h-3.5 text-sky-500" />
              </div>
              <div className="mt-2.5 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{location.no2}</span>
                <span className="text-[11px] text-slate-500 font-medium">ppb</span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200/80 dark:border-slate-800">
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1.5">
                <div 
                  className="bg-sky-500 h-full rounded-full" 
                  style={{ width: `${Math.min(100, (location.no2 / 100) * 100)}%` }} 
                />
              </div>
              <span className="text-[10px] text-sky-700 dark:text-sky-400 font-medium block">Diesel &amp; Gas Stoves</span>
            </div>
          </div>

          {/* CO */}
          <div className="bg-slate-50/80 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">CO (Monoxide)</span>
                <ShieldAlert className="w-3.5 h-3.5 text-indigo-500" />
              </div>
              <div className="mt-2.5 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{location.co}</span>
                <span className="text-[11px] text-slate-500 font-medium">mg/m³</span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200/80 dark:border-slate-800">
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1.5">
                <div 
                  className="bg-indigo-500 h-full rounded-full" 
                  style={{ width: `${Math.min(100, (location.co / 5) * 100)}%` }} 
                />
              </div>
              <span className="text-[10px] text-slate-500 block">Incomplete Biomass</span>
            </div>
          </div>

          {/* SO2 */}
          <div className="bg-slate-50/80 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">SO₂ (Sulfur)</span>
                <Activity className="w-3.5 h-3.5 text-teal-500" />
              </div>
              <div className="mt-2.5 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{location.so2}</span>
                <span className="text-[11px] text-slate-500 font-medium">µg/m³</span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200/80 dark:border-slate-800">
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1.5">
                <div 
                  className="bg-teal-500 h-full rounded-full" 
                  style={{ width: `${Math.min(100, (location.so2 / 50) * 100)}%` }} 
                />
              </div>
              <span className="text-[10px] text-slate-500 block">Heavy Fuel Oil &amp; Kilns</span>
            </div>
          </div>

          {/* O3 */}
          <div className="bg-slate-50/80 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">O₃ (Ozone)</span>
                <Sun className="w-3.5 h-3.5 text-yellow-500" />
              </div>
              <div className="mt-2.5 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{location.o3}</span>
                <span className="text-[11px] text-slate-500 font-medium">µg/m³</span>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200/80 dark:border-slate-800">
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1.5">
                <div 
                  className="bg-yellow-500 h-full rounded-full" 
                  style={{ width: `${Math.min(100, (location.o3 / 100) * 100)}%` }} 
                />
              </div>
              <span className="text-[10px] text-slate-500 block">Photochemical Factor</span>
            </div>
          </div>

        </div>

      </div>

      {/* 24-Hour Diurnal Inversion & AQI Timeline */}
      <div className="mt-7 pt-6 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">24-Hour Diurnal Inversion &amp; Particulate Profile</h3>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Severe Inversion Trap
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Solar Safe Ventilation
            </span>
          </div>
        </div>

        {/* Hourly Cards Deck */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
          {location.diurnalCurve.map((item, idx) => {
            const isSafeWindow = item.hour >= 12 && item.hour <= 15;
            const isMorningTrap = item.hour >= 6 && item.hour <= 9;
            const isSelected = selectedHour === item.hour;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectHour && onSelectHour(item.hour)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative group ${
                  isSelected
                    ? 'ring-2 ring-emerald-500 border-emerald-500 bg-white dark:bg-slate-800 shadow-md'
                    : isSafeWindow
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100/60'
                    : isMorningTrap
                    ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 hover:bg-rose-100/60'
                    : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{item.timeLabel}</span>
                  {isSafeWindow ? (
                    <Sun className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Layers className="w-3 h-3 text-slate-400" />
                  )}
                </div>

                <div className="mt-2.5">
                  <span className={`text-lg font-black tracking-tight ${
                    isSafeWindow ? 'text-emerald-700 dark:text-emerald-400' : isMorningTrap ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'
                  }`}>
                    {item.aqi}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium block">PM {item.pm25}</span>
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 font-semibold">
                    {item.inversionHeight}m
                  </span>
                  <span className={`text-[9px] font-bold px-1 rounded ${
                    isSafeWindow 
                      ? 'bg-emerald-200/70 text-emerald-900 dark:bg-emerald-900/80 dark:text-emerald-200' 
                      : isMorningTrap 
                      ? 'bg-rose-200/70 text-rose-900 dark:bg-rose-900/80 dark:text-rose-200' 
                      : 'text-slate-400'
                  }`}>
                    {isSafeWindow ? 'VENTILATE' : isMorningTrap ? 'TRAPPED' : 'SEAL'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Meteorological Tip */}
        <div className="mt-4 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-950 dark:text-emerald-200 shadow-2xs">
          <Sun className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Thermal Inversion Window:</strong> Winter smog is trapped closest to the ground between <strong>6:00 AM and 9:00 AM</strong> (boundary layer under 100m). The safest diurnal ventilation window is <strong>12:30 PM – 2:30 PM</strong> when solar heating expands the boundary layer to over 380m, diluting particulates by over 40%.
          </p>
        </div>

      </div>

    </div>
  );
};

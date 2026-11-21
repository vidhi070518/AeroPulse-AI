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
      bg: 'bg-emerald-50 dark:bg-emerald-950/30', 
      border: 'border-emerald-200 dark:border-emerald-800', 
      label: 'Good Air' 
    };
    if (aqi <= 100) return { 
      text: 'text-yellow-700 dark:text-yellow-400', 
      stroke: 'text-yellow-500', 
      bg: 'bg-yellow-50 dark:bg-yellow-950/30', 
      border: 'border-yellow-200 dark:border-yellow-800', 
      label: 'Moderate' 
    };
    if (aqi <= 150) return { 
      text: 'text-orange-700 dark:text-orange-400', 
      stroke: 'text-orange-500', 
      bg: 'bg-orange-50 dark:bg-orange-950/30', 
      border: 'border-orange-200 dark:border-orange-800', 
      label: 'Unhealthy for Sensitive Groups' 
    };
    if (aqi <= 200) return { 
      text: 'text-rose-700 dark:text-rose-400', 
      stroke: 'text-rose-500', 
      bg: 'bg-rose-50 dark:bg-rose-950/30', 
      border: 'border-rose-200 dark:border-rose-800', 
      label: 'Unhealthy' 
    };
    if (aqi <= 300) return { 
      text: 'text-purple-700 dark:text-purple-400', 
      stroke: 'text-purple-500', 
      bg: 'bg-purple-50 dark:bg-purple-950/30', 
      border: 'border-purple-200 dark:border-purple-800', 
      label: 'Very Unhealthy' 
    };
    return { 
      text: 'text-rose-700 dark:text-rose-400', 
      stroke: 'text-rose-600', 
      bg: 'bg-rose-50 dark:bg-rose-950/40', 
      border: 'border-rose-300 dark:border-rose-800', 
      label: 'Severe / Hazardous Smog' 
    };
  };

  const aqiStyle = getAQIStyle(location.aqi);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 lg:p-7 shadow-xs">
      
      {/* Top Banner: Location Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {location.name} <span className="text-slate-400 dark:text-slate-500 font-normal">({location.neighborhood})</span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            {location.weatherSummary}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl px-4 py-2 text-right">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold block">Primary Pollutant</span>
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400 truncate max-w-[240px] block">
              {location.primaryPollutant}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Visual Gauge + Pollutants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
        
        {/* Apple Weather Style Circular AQI Card */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl relative">
          <div className="relative flex items-center justify-center w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="66"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-200 dark:text-slate-800"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r="66"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={414}
                strokeDashoffset={Math.max(0, 414 - (414 * Math.min(500, location.aqi)) / 500)}
                strokeLinecap="round"
                className={`${aqiStyle.stroke} transition-all duration-1000 ease-out`}
                fill="transparent"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">Air Quality Index</span>
              <span className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                {location.aqi}
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">CPCB / US EPA</span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${aqiStyle.bg} ${aqiStyle.border} ${aqiStyle.text}`}>
              {aqiStyle.label}
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 max-w-[220px]">
              {location.historicalComparison}
            </p>
          </div>
        </div>

        {/* 6 Pollutant Cards Grid */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
          
          {/* PM2.5 */}
          <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-2xl hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-rose-600 dark:text-rose-400">PM2.5 (Fine Soot)</span>
              <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900 dark:text-white">{location.pm25}</span>
              <span className="text-[11px] text-slate-500">µg/m³</span>
            </div>
            <span className="text-[10px] text-rose-600 dark:text-rose-400 font-medium mt-1 block">
              {(location.pm25 / 15).toFixed(1)}× WHO Safe Limit
            </span>
          </div>

          {/* PM10 */}
          <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">PM10 (Coarse Dust)</span>
              <Activity className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{location.pm10}</span>
              <span className="text-[11px] text-slate-500">µg/m³</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Road Silt &amp; Dust
            </span>
          </div>

          {/* NO2 */}
          <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">NO₂ (Combustion)</span>
              <TrendingUp className="w-3.5 h-3.5 text-sky-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{location.no2}</span>
              <span className="text-[11px] text-slate-500">ppb</span>
            </div>
            <span className="text-[10px] text-sky-600 dark:text-sky-400 mt-1 block">
              Diesel &amp; Gas Burners
            </span>
          </div>

          {/* CO */}
          <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">CO (Monoxide)</span>
              <ShieldAlert className="w-3.5 h-3.5 text-indigo-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{location.co}</span>
              <span className="text-[11px] text-slate-500">mg/m³</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Incomplete Biomass
            </span>
          </div>

          {/* SO2 */}
          <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">SO₂ (Sulfur)</span>
              <Activity className="w-3.5 h-3.5 text-teal-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{location.so2}</span>
              <span className="text-[11px] text-slate-500">µg/m³</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Kilns &amp; Fuel Smog
            </span>
          </div>

          {/* O3 */}
          <div className="bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 p-3.5 rounded-2xl">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">O₃ (Ozone)</span>
              <Sun className="w-3.5 h-3.5 text-yellow-500" />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">{location.o3}</span>
              <span className="text-[11px] text-slate-500">µg/m³</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Photochemical Factor
            </span>
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
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Severe Inversion
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Solar Safe Window
            </span>
          </div>
        </div>

        {/* Hourly Cards Deck */}
        <div className="grid grid-cols-4 sm:grid-cols-9 gap-2">
          {location.diurnalCurve.map((item, idx) => {
            const isSafeWindow = item.hour >= 12 && item.hour <= 15;
            const isMorningTrap = item.hour >= 6 && item.hour <= 9;
            const isSelected = selectedHour === item.hour;

            return (
              <button
                key={idx}
                onClick={() => onSelectHour && onSelectHour(item.hour)}
                className={`p-2.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'ring-2 ring-emerald-500 border-emerald-500 bg-white dark:bg-slate-800 shadow-sm'
                    : isSafeWindow
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100/60'
                    : isMorningTrap
                    ? 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 hover:bg-rose-100/60'
                    : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">{item.timeLabel}</span>
                  {isSafeWindow && <Sun className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />}
                </div>

                <div className="mt-2">
                  <span className={`text-base font-black ${
                    isSafeWindow ? 'text-emerald-700 dark:text-emerald-400' : isMorningTrap ? 'text-rose-600 dark:text-rose-400' : 'text-slate-800 dark:text-slate-200'
                  }`}>
                    {item.aqi}
                  </span>
                  <span className="text-[10px] text-slate-500 block">PM {item.pm25}</span>
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Layers className="w-2.5 h-2.5 text-indigo-500" />
                    {item.inversionHeight}m
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Meteorological Tip */}
        <div className="mt-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-emerald-900 dark:text-emerald-200">
          <Sun className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Thermal Inversion Window:</strong> Winter smog is trapped closest to the ground between <strong>6:00 AM and 9:00 AM</strong> (boundary layer under 100m). The safest diurnal ventilation window is <strong>12:30 PM – 2:30 PM</strong> when solar heating expands the boundary layer to over 380m, diluting particulates by over 40%.
          </p>
        </div>

      </div>

    </div>
  );
};

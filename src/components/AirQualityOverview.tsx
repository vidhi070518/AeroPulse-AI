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
  Clock
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
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return { text: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500/40', label: 'Good' };
    if (aqi <= 100) return { text: 'text-yellow-400', bg: 'bg-yellow-500', border: 'border-yellow-500/40', label: 'Moderate' };
    if (aqi <= 150) return { text: 'text-orange-400', bg: 'bg-orange-500', border: 'border-orange-500/40', label: 'Unhealthy for Sensitive' };
    if (aqi <= 200) return { text: 'text-rose-400', bg: 'bg-rose-500', border: 'border-rose-500/40', label: 'Unhealthy' };
    if (aqi <= 300) return { text: 'text-purple-400', bg: 'bg-purple-500', border: 'border-purple-500/40', label: 'Very Unhealthy' };
    return { text: 'text-rose-500', bg: 'bg-rose-700', border: 'border-rose-600/60', label: 'Severe / Hazardous' };
  };

  const aqiTheme = getAQIColor(location.aqi);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 lg:p-6 backdrop-blur-md shadow-xl relative overflow-hidden">
      
      {/* Background ambient glow based on severity */}
      <div className={`absolute -right-24 -top-24 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none ${
        location.aqi > 300 ? 'bg-rose-600' : 'bg-amber-500'
      }`} />

      {/* Top Banner: Location & Ambient Warning */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
              {location.name} — <span className="text-slate-400 font-normal">{location.neighborhood}</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-500" />
            {location.weatherSummary}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl px-3.5 py-2 text-right">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Primary Hazard</span>
            <span className="text-xs font-semibold text-rose-300 truncate max-w-[220px] block">
              {location.primaryPollutant}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Gauge + Pollutants + Inversion Dynamics */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
        
        {/* AQI Score Dial & Category */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-950/60 border border-slate-800/90 rounded-2xl relative">
          <div className="relative flex items-center justify-center w-40 h-40">
            {/* SVG circular progress ring */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="68"
                stroke="currentColor"
                strokeWidth="10"
                className="text-slate-800"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r="68"
                stroke="currentColor"
                strokeWidth="10"
                strokeDasharray={427}
                strokeDashoffset={Math.max(0, 427 - (427 * Math.min(500, location.aqi)) / 500)}
                strokeLinecap="round"
                className={`${aqiTheme.text} transition-all duration-1000 ease-out`}
                fill="transparent"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">Air Quality Index</span>
              <span className={`text-4xl font-black tracking-tight ${aqiTheme.text}`}>
                {location.aqi}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">CPCB / US EPA</span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${aqiTheme.border} ${aqiTheme.text} bg-slate-900`}>
              {aqiTheme.label}
            </span>
            <p className="text-[11px] text-slate-400 mt-2 max-w-[200px]">
              {location.historicalComparison}
            </p>
          </div>
        </div>

        {/* Six-Gas Critical Pollutant Breakdown */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
          
          {/* PM2.5 */}
          <div className="bg-slate-950/70 border border-rose-900/40 p-3.5 rounded-xl hover:border-rose-500/50 transition-colors">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold text-rose-300">PM2.5 (Fine Soot)</span>
              <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-white">{location.pm25}</span>
              <span className="text-[11px] text-slate-400">µg/m³</span>
            </div>
            <span className="text-[10px] text-rose-400/90 font-medium mt-1 block">
              {(location.pm25 / 15).toFixed(1)}× WHO Safe Limit (15 µg)
            </span>
          </div>

          {/* PM10 */}
          <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold text-slate-300">PM10 (Coarse Dust)</span>
              <Activity className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-white">{location.pm10}</span>
              <span className="text-[11px] text-slate-400">µg/m³</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Construction & Road Silt
            </span>
          </div>

          {/* NO2 */}
          <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold text-slate-300">NO₂ (Combustion)</span>
              <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-white">{location.no2}</span>
              <span className="text-[11px] text-slate-400">ppb</span>
            </div>
            <span className="text-[10px] text-sky-400/90 mt-1 block">
              Diesel & Gas Stove Spikes
            </span>
          </div>

          {/* Carbon Monoxide */}
          <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold text-slate-300">CO (Carbon Monoxide)</span>
              <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-white">{location.co}</span>
              <span className="text-[11px] text-slate-400">mg/m³</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Incomplete Biomass Burn
            </span>
          </div>

          {/* SO2 */}
          <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold text-slate-300">SO₂ (Sulfur Dioxide)</span>
              <Activity className="w-3.5 h-3.5 text-teal-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-white">{location.so2}</span>
              <span className="text-[11px] text-slate-400">µg/m³</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Industrial / Kiln Emissions
            </span>
          </div>

          {/* Ozone (O3) */}
          <div className="bg-slate-950/70 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold text-slate-300">O₃ (Ground Ozone)</span>
              <Sun className="w-3.5 h-3.5 text-yellow-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-white">{location.o3}</span>
              <span className="text-[11px] text-slate-400">µg/m³</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Photochemical Smog Factor
            </span>
          </div>

        </div>

      </div>

      {/* 24-Hour Diurnal Inversion & AQI Timeline */}
      <div className="mt-7 pt-5 border-t border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">24-Hour Diurnal Inversion & Particulate Profile</h3>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-600 inline-block" /> Severe Inversion
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> Safe Solar Zenith Window
            </span>
          </div>
        </div>

        {/* Diurnal Bar Chart & Inversion Height */}
        <div className="grid grid-cols-4 sm:grid-cols-9 gap-2">
          {location.diurnalCurve.map((item, idx) => {
            const isSafeWindow = item.hour >= 12 && item.hour <= 15;
            const isMorningTrap = item.hour >= 6 && item.hour <= 9;
            const isSelected = selectedHour === item.hour;

            return (
              <button
                key={idx}
                onClick={() => onSelectHour && onSelectHour(item.hour)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'ring-2 ring-emerald-400 border-emerald-500 bg-slate-800'
                    : isSafeWindow
                    ? 'bg-emerald-950/30 border-emerald-700/50 hover:bg-emerald-900/40'
                    : isMorningTrap
                    ? 'bg-rose-950/30 border-rose-800/50 hover:bg-rose-900/40'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300">{item.timeLabel}</span>
                  {isSafeWindow && <Sun className="w-3 h-3 text-emerald-400" />}
                </div>

                <div className="mt-2">
                  <span className={`text-base font-black ${
                    isSafeWindow ? 'text-emerald-400' : isMorningTrap ? 'text-rose-400' : 'text-amber-400'
                  }`}>
                    {item.aqi}
                  </span>
                  <span className="text-[10px] text-slate-500 block">PM: {item.pm25}</span>
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Layers className="w-2.5 h-2.5 text-indigo-400" />
                    {item.inversionHeight}m
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Pro Tip on Diurnal Cycle */}
        <div className="mt-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-200">
          <Sun className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            <strong>Thermal Inversion Rule:</strong> Winter smog is trapped closest to the ground between <strong>6:00 AM and 9:00 AM</strong> (inversion ceiling ~90m). The safest diurnal window is <strong>12:30 PM – 2:30 PM</strong> when solar heating expands the boundary layer to over 380m, diluting particulates by over 40%.
          </p>
        </div>

      </div>

    </div>
  );
};

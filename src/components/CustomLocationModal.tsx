'use client';

import React, { useState, useEffect } from 'react';
import { LocationCity } from '../types';
import { createCustomLocation } from '../utils/airCalculations';
import { 
  X, 
  MapPin, 
  Flame, 
  Sparkles, 
  Layers, 
  Thermometer, 
  Navigation, 
  Trees, 
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface CustomLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyLocation: (loc: LocationCity) => void;
}

export const CustomLocationModal: React.FC<CustomLocationModalProps> = ({
  isOpen,
  onClose,
  onApplyLocation
}) => {
  const [cityName, setCityName] = useState('My City');
  const [country, setCountry] = useState('Local Air Basin');
  const [neighborhood, setNeighborhood] = useState('Urban Residential');
  const [pm25, setPm25] = useState(185);
  const [temperature, setTemperature] = useState(14);
  const [inversionCeiling, setInversionCeiling] = useState(140);
  const [geoLoading, setGeoLoading] = useState(false);

  // Keyboard accessibility: Close on Escape key
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

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const loc = createCustomLocation(
      cityName.trim() || 'Custom City',
      country.trim() || 'Custom Region',
      neighborhood.trim() || 'Central Basin',
      Number(pm25) || 120,
      Number(temperature) || 15,
      Number(inversionCeiling) || 150
    );
    onApplyLocation(loc);
    onClose();
  };

  const handleSelectScenario = (
    name: string,
    c: string,
    n: string,
    valPm25: number,
    temp: number,
    inv: number
  ) => {
    const loc = createCustomLocation(name, c, n, valPm25, temp, inv);
    onApplyLocation(loc);
    onClose();
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoLoading(false);
        const lat = pos.coords.latitude.toFixed(2);
        const lon = pos.coords.longitude.toFixed(2);
        // Realistic simulation based on location coordinates
        const loc = createCustomLocation(
          `Local Coordinates (${lat}°, ${lon}°)`,
          'GPS Detected Region',
          'Immediate Neighborhood',
          145,
          16,
          180
        );
        onApplyLocation(loc);
        onClose();
      },
      (err) => {
        setGeoLoading(false);
        // Fallback simulated local location
        const loc = createCustomLocation(
          'Current Station Area',
          'Local Met Station',
          'Station 01',
          160,
          15,
          160
        );
        onApplyLocation(loc);
        onClose();
      },
      { timeout: 6000 }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 dark:bg-slate-950/70 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Custom Location &amp; Atmospheric Simulator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Test any city, wildfire smoke event, or local monitoring station worldwide.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          
          {/* Quick Preset Scenarios */}
          <div>
            <label className="text-slate-700 dark:text-slate-300 font-bold block mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Instant Disaster &amp; Air Scenarios</span>
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleSelectScenario('Wildfire Smoke Front', 'Regional Air Basin', 'Valley Foothills', 410, 21, 90)}
                className="p-3 text-left rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 hover:bg-rose-100/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-bold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Wildfire Smoke Wave</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  PM2.5: <strong>410 µg/m³</strong> • Inv: <strong>90m</strong>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectScenario('Stubble Smog Trap', 'Northern Plains', 'Agricultural Belt', 330, 13, 110)}
                className="p-3 text-left rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/60 dark:bg-amber-950/30 hover:bg-amber-100/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Stubble Burning Peak</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  PM2.5: <strong>330 µg/m³</strong> • Inv: <strong>110m</strong>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectScenario('Post-Firework Smog', 'Metropolitan Center', 'High-Density Core', 560, 11, 70)}
                className="p-3 text-left rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/60 dark:bg-purple-950/30 hover:bg-purple-100/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-purple-700 dark:text-purple-400 font-bold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Winter Fireworks Inversion</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  PM2.5: <strong>560 µg/m³</strong> • Inv: <strong>70m</strong>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectScenario('Alpine Pine Basin', 'Mountain Haven', 'Valley Sanctuary', 7, 6, 1100)}
                className="p-3 text-left rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/60 dark:bg-emerald-950/30 hover:bg-emerald-100/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                  <Trees className="w-3.5 h-3.5" />
                  <span>Clean Mountain Reserve</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  PM2.5: <strong>7 µg/m³</strong> • Inv: <strong>1100m</strong>
                </div>
              </button>
            </div>
          </div>

          {/* Browser Geolocation Shortcut */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 dark:text-white block">GPS Geolocation Auto-Detect</span>
              <span className="text-[11px] text-slate-500">Detect your local latitude &amp; longitude coordinates</span>
            </div>
            <button
              type="button"
              onClick={handleDetectLocation}
              disabled={geoLoading}
              className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Navigation className={`w-3.5 h-3.5 ${geoLoading ? 'animate-spin' : ''}`} />
              <span>{geoLoading ? 'Detecting...' : 'Use My GPS'}</span>
            </button>
          </div>

          {/* Manual Input Form */}
          <form onSubmit={handleApplyCustom} className="space-y-3.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>Or Configure Any Custom City:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">City / Region Name</label>
                <input
                  type="text"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  placeholder="e.g. Chicago, Tokyo, Warsaw"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Country / Province</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. United States"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Neighborhood Zone</label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="e.g. Downtown Metro"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* PM2.5 Level Slider */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-bold text-slate-800 dark:text-slate-200">
                  Ambient PM2.5 Concentration:
                </label>
                <span className="font-black text-rose-600 dark:text-rose-400 text-sm">
                  {pm25} µg/m³
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="650"
                step="5"
                value={pm25}
                onChange={(e) => setPm25(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>5 µg/m³ (WHO Safe)</span>
                <span>150 (Unhealthy)</span>
                <span>350 (Hazardous)</span>
                <span>650 µg/m³ (Emergency)</span>
              </div>
            </div>

            {/* Inversion Ceiling & Temperature */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-indigo-500" />
                    Inversion Cap
                  </span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{inversionCeiling}m</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="800"
                  step="10"
                  value={inversionCeiling}
                  onChange={(e) => setInversionCeiling(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block mt-1">Lower = Smog trapped close to ground</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Thermometer className="w-3.5 h-3.5 text-sky-500" />
                    Temperature
                  </span>
                  <span className="font-bold text-sky-600 dark:text-sky-400">{temperature}°C</span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="35"
                  step="1"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block mt-1">Winter inversion strengthens in cold</span>
              </div>
            </div>

            {/* Apply Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulate &amp; Apply Environment</span>
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
};


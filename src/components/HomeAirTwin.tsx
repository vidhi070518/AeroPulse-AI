'use client';

import React from 'react';
import { HomeTwinState, HouseholdProfile } from '../types';
import { simulateHomeTwinRoomLevels } from '../utils/airCalculations';
import { 
  Home, 
  Flame, 
  Wind, 
  Fan, 
  Lock, 
  Sparkles, 
  Moon, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';

interface HomeAirTwinProps {
  outdoorPm25: number;
  household: HouseholdProfile;
  twinState: HomeTwinState;
  onUpdateState: (newState: HomeTwinState) => void;
}

export const HomeAirTwin: React.FC<HomeAirTwinProps> = ({
  outdoorPm25,
  household,
  twinState,
  onUpdateState
}) => {
  const roomLevels = simulateHomeTwinRoomLevels(outdoorPm25, twinState, household);

  const getStatusBadge = (status: 'safe' | 'moderate' | 'unhealthy' | 'hazardous') => {
    switch (status) {
      case 'safe':
        return { label: 'CLEAN HAVEN', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' };
      case 'moderate':
        return { label: 'ACCEPTABLE', bg: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' };
      case 'unhealthy':
        return { label: 'POOR AIR', bg: 'bg-amber-500/20 text-amber-400 border-amber-500/40' };
      default:
        return { label: 'SMOG INFILTRATION', bg: 'bg-rose-500/20 text-rose-400 border-rose-500/40' };
    }
  };

  const handleResetToOptimal = () => {
    onUpdateState({
      kitchen: {
        cookingActive: false,
        fuel: 'induction',
        exhaustOn: true,
        pm25: 18,
        no2: 8
      },
      livingRoom: {
        windowsState: 'sealed',
        purifierMode: 'boost',
        cleaningMethod: 'damp-microfiber',
        pm25: 15,
        no2: 12
      },
      bedroom: {
        doorClosed: true,
        purifierMode: 'quiet',
        bedtimeSeal: true,
        pm25: 9,
        no2: 6
      },
      balcony: {
        outdoorAmbientPm25: outdoorPm25,
        doorSealed: true
      }
    });
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 lg:p-6 backdrop-blur-md shadow-xl">
      
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg lg:text-xl font-bold text-white tracking-tight">
              Interactive Home Air Twin™
            </h2>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              PHYSICS ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Simulate real-time room particulate (PM2.5) & combustion gases (NO2) across your home envelope.
          </p>
        </div>

        <button
          onClick={handleResetToOptimal}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-teal-400" />
          <span>Set Optimal Shield</span>
        </button>
      </div>

      {/* Interactive Blueprint Floorplan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        
        {/* ROOM 1: Kitchen Zone */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4.5 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Flame className={`w-4 h-4 ${twinState.kitchen.fuel === 'gas' ? 'text-amber-400' : 'text-teal-400'}`} />
                <span className="text-sm font-bold text-white">Kitchen Zone</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getStatusBadge(roomLevels.kitchen.status).bg}`}>
                {getStatusBadge(roomLevels.kitchen.status).label}
              </span>
            </div>

            {/* Live PM & NO2 Readout */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">PM2.5 Particulate</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className={`text-xl font-black ${roomLevels.kitchen.pm25 > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {roomLevels.kitchen.pm25}
                  </span>
                  <span className="text-[10px] text-slate-500">µg/m³</span>
                </div>
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">NO₂ Toxic Gas</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className={`text-xl font-black ${roomLevels.kitchen.no2 > 40 ? 'text-amber-400' : 'text-teal-400'}`}>
                    {roomLevels.kitchen.no2}
                  </span>
                  <span className="text-[10px] text-slate-500">ppb</span>
                </div>
              </div>
            </div>

            {/* Interactive Toggles */}
            <div className="mt-4 space-y-3">
              {/* Cooking Active Toggle */}
              <div className="flex items-center justify-between text-xs bg-slate-900/50 p-2 rounded-xl border border-slate-800/60">
                <span className="text-slate-300">Stove Ignited</span>
                <button
                  onClick={() => onUpdateState({
                    ...twinState,
                    kitchen: { ...twinState.kitchen, cookingActive: !twinState.kitchen.cookingActive }
                  })}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    twinState.kitchen.cookingActive
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {twinState.kitchen.cookingActive ? 'ON (Cooking)' : 'OFF (Idle)'}
                </button>
              </div>

              {/* Fuel Type Switch */}
              <div className="flex items-center justify-between text-xs bg-slate-900/50 p-2 rounded-xl border border-slate-800/60">
                <span className="text-slate-300">Stove Fuel</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => onUpdateState({
                      ...twinState,
                      kitchen: { ...twinState.kitchen, fuel: 'gas' }
                    })}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                      twinState.kitchen.fuel === 'gas'
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    LPG Gas
                  </button>
                  <button
                    onClick={() => onUpdateState({
                      ...twinState,
                      kitchen: { ...twinState.kitchen, fuel: 'induction' }
                    })}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                      twinState.kitchen.fuel === 'induction'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Induction
                  </button>
                </div>
              </div>

              {/* Exhaust Fan Switch */}
              <div className="flex items-center justify-between text-xs bg-slate-900/50 p-2 rounded-xl border border-slate-800/60">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Fan className="w-3.5 h-3.5 text-indigo-400" />
                  Chimney Hood
                </span>
                <button
                  onClick={() => onUpdateState({
                    ...twinState,
                    kitchen: { ...twinState.kitchen, exhaustOn: !twinState.kitchen.exhaustOn }
                  })}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    twinState.kitchen.exhaustOn
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {twinState.kitchen.exhaustOn ? 'Exhaust ON' : 'OFF'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-start gap-1.5">
            <Info className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
            <span>
              {twinState.kitchen.fuel === 'gas' && twinState.kitchen.cookingActive
                ? 'Gas flame emits raw NO2 and carbon ultrafines.'
                : 'Induction creates zero flame combustion emissions.'}
            </span>
          </div>
        </div>

        {/* ROOM 2: Living Room (Main Infiltration & Filtration) */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4.5 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-white">Living Room Area</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getStatusBadge(roomLevels.livingRoom.status).bg}`}>
                {getStatusBadge(roomLevels.livingRoom.status).label}
              </span>
            </div>

            {/* Live PM Readout */}
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 mt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Indoor PM2.5</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className={`text-2xl font-black ${roomLevels.livingRoom.pm25 > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {roomLevels.livingRoom.pm25}
                  </span>
                  <span className="text-[11px] text-slate-500">µg/m³</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-medium">Outdoor Ambient</span>
                <span className="text-sm font-bold text-slate-400">{outdoorPm25} µg/m³</span>
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="mt-4 space-y-3">
              {/* Windows State */}
              <div className="flex items-center justify-between text-xs bg-slate-900/50 p-2 rounded-xl border border-slate-800/60">
                <span className="text-slate-300">Exterior Windows</span>
                <div className="flex gap-1">
                  {(['sealed', 'cracked', 'wide-open'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => onUpdateState({
                        ...twinState,
                        livingRoom: { ...twinState.livingRoom, windowsState: mode }
                      })}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold capitalize transition-all ${
                        twinState.livingRoom.windowsState === mode
                          ? mode === 'sealed' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Purifier / Corsi-Rosenthal Fan Speed */}
              <div className="flex items-center justify-between text-xs bg-slate-900/50 p-2 rounded-xl border border-slate-800/60">
                <span className="text-slate-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  Air Purifier
                </span>
                <div className="flex gap-1">
                  {(['off', 'quiet', 'boost', 'turbo'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => onUpdateState({
                        ...twinState,
                        livingRoom: { ...twinState.livingRoom, purifierMode: mode }
                      })}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold capitalize transition-all ${
                        twinState.livingRoom.purifierMode === mode
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cleaning Method (Resuspension!) */}
              <div className="flex items-center justify-between text-xs bg-slate-900/50 p-2 rounded-xl border border-slate-800/60">
                <span className="text-slate-300">Floor Cleaning</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => onUpdateState({
                      ...twinState,
                      livingRoom: { ...twinState.livingRoom, cleaningMethod: 'damp-microfiber' }
                    })}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                      twinState.livingRoom.cleaningMethod === 'damp-microfiber'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Damp Mop
                  </button>
                  <button
                    onClick={() => onUpdateState({
                      ...twinState,
                      livingRoom: { ...twinState.livingRoom, cleaningMethod: 'dry-broom-vacuum' }
                    })}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                      twinState.livingRoom.cleaningMethod === 'dry-broom-vacuum'
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Dry Broom
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-start gap-1.5">
            <Info className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
            <span>
              {twinState.livingRoom.cleaningMethod === 'dry-broom-vacuum'
                ? 'Dry sweeping resuspends heavy toxic floor dust!'
                : 'Damp microfiber traps sub-micron soot without resuspension.'}
            </span>
          </div>
        </div>

        {/* ROOM 3: Bedroom (Clean Sleep Haven) */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4.5 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-bold text-white">Clean Sleep Haven</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getStatusBadge(roomLevels.bedroom.status).bg}`}>
                {getStatusBadge(roomLevels.bedroom.status).label}
              </span>
            </div>

            {/* Live PM Readout */}
            <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 mt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Sleeping PM2.5 Exposure</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className={`text-2xl font-black ${roomLevels.bedroom.pm25 < 15 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {roomLevels.bedroom.pm25}
                  </span>
                  <span className="text-[11px] text-slate-500">µg/m³</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-medium">Target Sleep Goal</span>
                <span className="text-xs font-bold text-emerald-400">&lt; 15 µg/m³</span>
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="mt-4 space-y-3">
              {/* Door Isolation */}
              <div className="flex items-center justify-between text-xs bg-slate-900/50 p-2 rounded-xl border border-slate-800/60">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-indigo-400" />
                  Bedroom Door
                </span>
                <button
                  onClick={() => onUpdateState({
                    ...twinState,
                    bedroom: { ...twinState.bedroom, doorClosed: !twinState.bedroom.doorClosed }
                  })}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    twinState.bedroom.doorClosed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {twinState.bedroom.doorClosed ? 'Isolated (Closed)' : 'Open (Drafty)'}
                </button>
              </div>

              {/* Bedtime Door-Sill Seal */}
              <div className="flex items-center justify-between text-xs bg-slate-900/50 p-2 rounded-xl border border-slate-800/60">
                <span className="text-slate-300">Under-Door Draft Snake</span>
                <button
                  onClick={() => onUpdateState({
                    ...twinState,
                    bedroom: { ...twinState.bedroom, bedtimeSeal: !twinState.bedroom.bedtimeSeal }
                  })}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    twinState.bedroom.bedtimeSeal
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {twinState.bedroom.bedtimeSeal ? 'Sealed' : 'Unsealed'}
                </button>
              </div>

              {/* Dedicated Bedroom Purifier */}
              <div className="flex items-center justify-between text-xs bg-slate-900/50 p-2 rounded-xl border border-slate-800/60">
                <span className="text-slate-300">Night Purifier</span>
                <div className="flex gap-1">
                  {(['off', 'quiet', 'boost', 'turbo'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => onUpdateState({
                        ...twinState,
                        bedroom: { ...twinState.bedroom, purifierMode: mode }
                      })}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold capitalize transition-all ${
                        twinState.bedroom.purifierMode === mode
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/60 text-[11px] text-slate-400 flex items-start gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              {roomLevels.bedroom.pm25 < 15
                ? 'Ideal restorative haven for children and asthmatics.'
                : 'Smog infiltrating. Close door and turn purifier to Quiet.'}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

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
  CheckCircle2, 
  RotateCcw,
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
        return { label: 'Clean Haven', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' };
      case 'moderate':
        return { label: 'Moderate', bg: 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-300 dark:border-yellow-800' };
      case 'unhealthy':
        return { label: 'Elevated Air', bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800' };
      default:
        return { label: 'Smog Influx', bg: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800' };
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
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 lg:p-7 shadow-xs">
      
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Interactive Home Air Twin™
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Physics Model
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Simulate real-time room particulate (PM2.5) &amp; combustion gases (NO2) based on daily household routines.
          </p>
        </div>

        <button
          onClick={handleResetToOptimal}
          className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors self-start sm:self-auto border border-slate-200 dark:border-slate-700"
        >
          <RotateCcw className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          <span>Apply Clean Shield</span>
        </button>
      </div>

      {/* 3 Room Zones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        
        {/* ROOM 1: Kitchen Zone */}
        <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Flame className={`w-4 h-4 ${twinState.kitchen.fuel === 'gas' ? 'text-amber-500' : 'text-teal-500'}`} />
                <span className="text-sm font-bold text-slate-900 dark:text-white">Kitchen Zone</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(roomLevels.kitchen.status).bg}`}>
                {getStatusBadge(roomLevels.kitchen.status).label}
              </span>
            </div>

            {/* Readouts */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">PM2.5 Soot</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className={`text-xl font-black ${roomLevels.kitchen.pm25 > 50 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                    {roomLevels.kitchen.pm25}
                  </span>
                  <span className="text-[10px] text-slate-400">µg/m³</span>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">NO₂ Gas</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className={`text-xl font-black ${roomLevels.kitchen.no2 > 40 ? 'text-amber-600 dark:text-amber-400' : 'text-teal-700 dark:text-teal-400'}`}>
                    {roomLevels.kitchen.no2}
                  </span>
                  <span className="text-[10px] text-slate-400">ppb</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-4 space-y-2.5">
              {/* Cooking Active */}
              <div className="flex items-center justify-between text-xs bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Stove Active</span>
                <button
                  onClick={() => onUpdateState({
                    ...twinState,
                    kitchen: { ...twinState.kitchen, cookingActive: !twinState.kitchen.cookingActive }
                  })}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    twinState.kitchen.cookingActive
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {twinState.kitchen.cookingActive ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Fuel Type */}
              <div className="flex items-center justify-between text-xs bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Stove Fuel</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => onUpdateState({
                      ...twinState,
                      kitchen: { ...twinState.kitchen, fuel: 'gas' }
                    })}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                      twinState.kitchen.fuel === 'gas'
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    LPG Gas
                  </button>
                  <button
                    onClick={() => onUpdateState({
                      ...twinState,
                      kitchen: { ...twinState.kitchen, fuel: 'induction' }
                    })}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                      twinState.kitchen.fuel === 'induction'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Induction
                  </button>
                </div>
              </div>

              {/* Chimney Hood */}
              <div className="flex items-center justify-between text-xs bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1.5">
                  <Fan className="w-3.5 h-3.5 text-indigo-500" />
                  Chimney Hood
                </span>
                <button
                  onClick={() => onUpdateState({
                    ...twinState,
                    kitchen: { ...twinState.kitchen, exhaustOn: !twinState.kitchen.exhaustOn }
                  })}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    twinState.kitchen.exhaustOn
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {twinState.kitchen.exhaustOn ? 'Running' : 'Off'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              {twinState.kitchen.fuel === 'gas' && twinState.kitchen.cookingActive
                ? 'Gas flame emits raw NO2 and carbon ultrafines.'
                : 'Induction creates zero flame combustion emissions.'}
            </span>
          </div>
        </div>

        {/* ROOM 2: Living Room */}
        <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">Living Area</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(roomLevels.livingRoom.status).bg}`}>
                {getStatusBadge(roomLevels.livingRoom.status).label}
              </span>
            </div>

            {/* Readout */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 mt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Indoor PM2.5</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className={`text-2xl font-black ${roomLevels.livingRoom.pm25 > 50 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                    {roomLevels.livingRoom.pm25}
                  </span>
                  <span className="text-[11px] text-slate-400">µg/m³</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Outdoor Ambient</span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{outdoorPm25} µg/m³</span>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-4 space-y-2.5">
              {/* Windows */}
              <div className="flex items-center justify-between text-xs bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Windows</span>
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
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Purifier Fan Speed */}
              <div className="flex items-center justify-between text-xs bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                  Purifier
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
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floor Cleaning */}
              <div className="flex items-center justify-between text-xs bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Cleaning</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => onUpdateState({
                      ...twinState,
                      livingRoom: { ...twinState.livingRoom, cleaningMethod: 'damp-microfiber' }
                    })}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                      twinState.livingRoom.cleaningMethod === 'damp-microfiber'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
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
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Dry Broom
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              {twinState.livingRoom.cleaningMethod === 'dry-broom-vacuum'
                ? 'Dry sweeping resuspends heavy toxic floor dust into the air!'
                : 'Damp microfiber traps sub-micron soot without resuspension.'}
            </span>
          </div>
        </div>

        {/* ROOM 3: Bedroom Haven */}
        <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-bold text-slate-900 dark:text-white">Bedroom Haven</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(roomLevels.bedroom.status).bg}`}>
                {getStatusBadge(roomLevels.bedroom.status).label}
              </span>
            </div>

            {/* Readout */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 mt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Night PM2.5 Exposure</span>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className={`text-2xl font-black ${roomLevels.bedroom.pm25 < 15 ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {roomLevels.bedroom.pm25}
                  </span>
                  <span className="text-[11px] text-slate-400">µg/m³</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Target Sleep Goal</span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">&lt; 15 µg/m³</span>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-4 space-y-2.5">
              {/* Door Isolation */}
              <div className="flex items-center justify-between text-xs bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-indigo-500" />
                  Bedroom Door
                </span>
                <button
                  onClick={() => onUpdateState({
                    ...twinState,
                    bedroom: { ...twinState.bedroom, doorClosed: !twinState.bedroom.doorClosed }
                  })}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    twinState.bedroom.doorClosed
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {twinState.bedroom.doorClosed ? 'Closed' : 'Open'}
                </button>
              </div>

              {/* Door Sill Draft Seal */}
              <div className="flex items-center justify-between text-xs bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Under-Door Seal</span>
                <button
                  onClick={() => onUpdateState({
                    ...twinState,
                    bedroom: { ...twinState.bedroom, bedtimeSeal: !twinState.bedroom.bedtimeSeal }
                  })}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    twinState.bedroom.bedtimeSeal
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {twinState.bedroom.bedtimeSeal ? 'Sealed' : 'Unsealed'}
                </button>
              </div>

              {/* Dedicated Purifier */}
              <div className="flex items-center justify-between text-xs bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Night Purifier</span>
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
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              {roomLevels.bedroom.pm25 < 15
                ? 'Ideal restorative air zone for children & asthmatic members.'
                : 'Smog infiltrating. Close door and turn purifier to Quiet.'}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};

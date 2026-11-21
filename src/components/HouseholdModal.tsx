'use client';

import React, { useState, useEffect } from 'react';
import { HouseholdProfile } from '../types';
import { 
  X, 
  Users, 
  Home, 
  Flame, 
  ShieldCheck, 
  Save, 
  Baby, 
  Heart,
  Dog
} from 'lucide-react';

interface HouseholdModalProps {
  isOpen: boolean;
  onClose: () => void;
  household: HouseholdProfile;
  onSave: (updated: HouseholdProfile) => void;
}

export const HouseholdModal: React.FC<HouseholdModalProps> = ({
  isOpen,
  onClose,
  household,
  onSave
}) => {
  const [profile, setProfile] = useState<HouseholdProfile>(household);

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-800">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Household &amp; Lifestyle Profile</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tailor low-emission routines and indoor hacks to your family and architecture.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
          
          {/* Profile Name */}
          <div>
            <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1.5">Household Label</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-emerald-500 text-xs"
            />
          </div>

          {/* Family Composition */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <Baby className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Family Composition &amp; Vulnerabilities
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Adults (18-64)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={profile.members.adults}
                  onChange={(e) => setProfile({
                    ...profile,
                    members: { ...profile.members, adults: Number(e.target.value) || 1 }
                  })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-rose-700 dark:text-rose-400 block mb-1 font-semibold">Infants / Toddlers (&lt;3y)</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={profile.members.infants}
                  onChange={(e) => setProfile({
                    ...profile,
                    members: { ...profile.members, infants: Number(e.target.value) || 0 }
                  })}
                  className="w-full bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Children (3-12y)</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={profile.members.children}
                  onChange={(e) => setProfile({
                    ...profile,
                    members: { ...profile.members, children: Number(e.target.value) || 0 }
                  })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-amber-700 dark:text-amber-400 block mb-1 font-semibold">Seniors (65+)</label>
                <input
                  type="number"
                  min="0"
                  max="6"
                  value={profile.members.seniors}
                  onChange={(e) => setProfile({
                    ...profile,
                    members: { ...profile.members, seniors: Number(e.target.value) || 0 }
                  })}
                  className="w-full bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="text-rose-700 dark:text-rose-400 block mb-1 font-semibold flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-500" />
                  Asthmatics / Sensitive
                </label>
                <input
                  type="number"
                  min="0"
                  max="6"
                  value={profile.members.asthmaticsOrSensitive}
                  onChange={(e) => setProfile({
                    ...profile,
                    members: { ...profile.members, asthmaticsOrSensitive: Number(e.target.value) || 0 }
                  })}
                  className="w-full bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-800 rounded-xl px-3 py-1.5 text-rose-700 dark:text-rose-300 font-bold"
                />
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1 flex items-center gap-1">
                  <Dog className="w-3 h-3 text-slate-400" />
                  Pets
                </label>
                <input
                  type="number"
                  min="0"
                  max="6"
                  value={profile.members.pets}
                  onChange={(e) => setProfile({
                    ...profile,
                    members: { ...profile.members, pets: Number(e.target.value) || 0 }
                  })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Home Architecture & Envelope */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <Home className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              Home Architecture &amp; Envelope Tightness
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Building Type</label>
                <select
                  aria-label="Building Type"
                  value={profile.homeType}
                  onChange={(e) => setProfile({ ...profile, homeType: e.target.value as any })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                >
                  <option value="high-rise-apartment">High-Rise Apartment (Floor 5+)</option>
                  <option value="low-rise-apartment">Low-Rise Apartment (Floor 1-4)</option>
                  <option value="independent-house">Independent Villa / Ground House</option>
                  <option value="older-brick-building">Older Brick Building (High Leaks)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Envelope Sealing Quality</label>
                <select
                  aria-label="Envelope Sealing Quality"
                  value={profile.sealingQuality}
                  onChange={(e) => setProfile({ ...profile, sealingQuality: e.target.value as any })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                >
                  <option value="drafty-leaky">Drafty &amp; Leaky (High Infiltration ~68%)</option>
                  <option value="standard">Standard Double Glass (~42%)</option>
                  <option value="weather-stripped">Weather-Stripped (~22%)</option>
                  <option value="hermetic-triple-glazed">Hermetic Triple-Glazed (~8%)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stove & Commute */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Daily Emissions &amp; Mobility Setup
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Kitchen Primary Stove</label>
                <select
                  aria-label="Kitchen Primary Stove"
                  value={profile.cookingFuel}
                  onChange={(e) => setProfile({ ...profile, cookingFuel: e.target.value as any })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                >
                  <option value="lpg-cylinder">LPG Gas Cylinder (High NO2 Spike)</option>
                  <option value="piped-natural-gas">Piped Natural Gas (Methane Flame)</option>
                  <option value="electric-induction">Electric Induction (Zero Flame NO2)</option>
                  <option value="biomass-wood">Biomass / Wood (Extreme Soot)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-600 dark:text-slate-400 block mb-1">Daily Commute Mode</label>
                <select
                  aria-label="Daily Commute Mode"
                  value={profile.commuteMode}
                  onChange={(e) => setProfile({ ...profile, commuteMode: e.target.value as any })}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                >
                  <option value="public-metro-electric-bus">Public Metro Rail / Electric Bus (Protected)</option>
                  <option value="private-ice-car">Solo Petrol/Diesel Car</option>
                  <option value="electric-vehicle">Electric Vehicle (EV)</option>
                  <option value="two-wheeler-bike">Motorbike / Scooter (Direct Inhalation)</option>
                  <option value="walking-cycling">Walking / Cycling</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Hardware Defenses */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Active Hardware Defenses
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.defenses.hasCorsiRosenthalBox}
                  onChange={(e) => setProfile({
                    ...profile,
                    defenses: { ...profile.defenses, hasCorsiRosenthalBox: e.target.checked }
                  })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>Equipped with Corsi-Rosenthal DIY Box</span>
              </label>

              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.defenses.n95MasksAvailable}
                  onChange={(e) => setProfile({
                    ...profile,
                    defenses: { ...profile.defenses, n95MasksAvailable: e.target.checked }
                  })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>N95/FFP2 Respirators in Hand</span>
              </label>

              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.defenses.hasContinuousAQIMonitor}
                  onChange={(e) => setProfile({
                    ...profile,
                    defenses: { ...profile.defenses, hasContinuousAQIMonitor: e.target.checked }
                  })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>Indoor Laser PM2.5 Monitor</span>
              </label>

              <label className="flex items-center gap-2 text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.hasKitchenChimneyExhaust}
                  onChange={(e) => setProfile({
                    ...profile,
                    hasKitchenChimneyExhaust: e.target.checked
                  })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>Kitchen Chimney / Exhaust Fan</span>
              </label>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply &amp; Recalculate</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

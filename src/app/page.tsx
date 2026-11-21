'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  LocationCity, 
  HouseholdProfile, 
  HomeTwinState, 
  SustainableAlternative 
} from '../types';
import { 
  LOCATION_PRESETS, 
  DEFAULT_HOUSEHOLD 
} from '../data/mockData';
import { 
  calculateDirectImpact, 
  generateAdaptiveDailyRoutine, 
  simulateHomeTwinRoomLevels 
} from '../utils/airCalculations';
import { Header } from '../components/Header';
import { AirQualityOverview } from '../components/AirQualityOverview';
import { HomeAirTwin } from '../components/HomeAirTwin';
import { DirectImpactMeter } from '../components/DirectImpactMeter';
import { DailyRoutineScheduler } from '../components/DailyRoutineScheduler';
import { IAQHacksLibrary } from '../components/IAQHacksLibrary';
import { SustainableAlternativesMatrix } from '../components/SustainableAlternativesMatrix';
import { CommunityHub } from '../components/CommunityHub';
import { CopilotDrawer } from '../components/CopilotDrawer';
import { HouseholdModal } from '../components/HouseholdModal';
import { SmogEmergencyModal } from '../components/SmogEmergencyModal';
import { 
  Activity, 
  Home, 
  Calendar, 
  Wrench, 
  Leaf, 
  Users, 
  Sparkles, 
  ShoppingBag, 
  Trophy,
  ArrowUpRight
} from 'lucide-react';

export default function HomeDashboard() {
  // Theme state: defaults to false (clean neutral light mode), persists in localStorage
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has saved theme preference
    const saved = localStorage.getItem('aeropulse-theme');
    if (saved === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('aeropulse-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('aeropulse-theme', 'light');
      }
      return next;
    });
  };

  // Primary States
  const [currentLocation, setCurrentLocation] = useState<LocationCity>(LOCATION_PRESETS[0]);
  const [household, setHousehold] = useState<HouseholdProfile>(DEFAULT_HOUSEHOLD);
  const [twinState, setTwinState] = useState<HomeTwinState>({
    kitchen: {
      cookingActive: true,
      fuel: 'gas',
      exhaustOn: true,
      pm25: 65,
      no2: 38
    },
    livingRoom: {
      windowsState: 'sealed',
      purifierMode: 'boost',
      cleaningMethod: 'damp-microfiber',
      pm25: 22,
      no2: 18
    },
    bedroom: {
      doorClosed: true,
      purifierMode: 'quiet',
      bedtimeSeal: true,
      pm25: 12,
      no2: 8
    },
    balcony: {
      outdoorAmbientPm25: LOCATION_PRESETS[0].pm25,
      doorSealed: true
    }
  });

  // Prompt Credits (PromptWars: Virtual Rewards Currency)
  const [promptCredits, setPromptCredits] = useState<number>(2400);
  const [activeTab, setActiveTab] = useState<'overview' | 'home-twin' | 'routines' | 'iaq-hacks' | 'alternatives' | 'community'>('overview');
  const [emergencyMode, setEmergencyMode] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & Drawers
  const [copilotOpen, setCopilotOpen] = useState<boolean>(false);
  const [copilotInitialPrompt, setCopilotInitialPrompt] = useState<string>('');
  const [householdModalOpen, setHouseholdModalOpen] = useState<boolean>(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);
  const [swagStoreOpen, setSwagStoreOpen] = useState<boolean>(false);

  // Derived Calculations
  const roomLevels = useMemo(() => {
    return simulateHomeTwinRoomLevels(currentLocation.pm25, twinState, household);
  }, [currentLocation.pm25, twinState, household]);

  const impactMetrics = useMemo(() => {
    return calculateDirectImpact(currentLocation, household, twinState);
  }, [currentLocation, household, twinState]);

  const routineItems = useMemo(() => {
    return generateAdaptiveDailyRoutine(currentLocation, household);
  }, [currentLocation, household]);

  // Actions
  const handleAwardCredits = (amount: number, reason: string) => {
    setPromptCredits(prev => prev + amount);
    setToastMessage(`+${amount} Prompt Credits: ${reason}`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenCopilotWithPrompt = (prompt: string) => {
    setCopilotInitialPrompt(prompt);
    setCopilotOpen(true);
  };

  const handleExecuteEmergencyProtocol = () => {
    setEmergencyMode(true);
    setTwinState(prev => ({
      ...prev,
      kitchen: { ...prev.kitchen, cookingActive: false, fuel: 'induction', exhaustOn: true },
      livingRoom: { ...prev.livingRoom, windowsState: 'sealed', purifierMode: 'turbo', cleaningMethod: 'damp-microfiber' },
      bedroom: { ...prev.bedroom, doorClosed: true, purifierMode: 'turbo', bedtimeSeal: true }
    }));
    handleAwardCredits(400, 'Executed 24h Emergency Smog Protocol');
  };

  const handlePledgeAlternative = (alt: SustainableAlternative) => {
    if (alt.domain === 'Cooking') {
      setHousehold(prev => ({ ...prev, cookingFuel: 'electric-induction' }));
      setTwinState(prev => ({ ...prev, kitchen: { ...prev.kitchen, fuel: 'induction' } }));
    } else if (alt.domain === 'Mobility') {
      setHousehold(prev => ({ ...prev, commuteMode: 'public-metro-electric-bus' }));
    }
    handleAwardCredits(350, `Adopted: ${alt.sustainableChoice}`);
  };

  const swagItems = [
    { name: 'Mobile Stand', credits: 1150, image: '📱' },
    { name: 'Diary', credits: 1250, image: '📓' },
    { name: 'Tech Organizer Pouch', credits: 1500, image: '👝' },
    { name: 'PromptWars Cap', credits: 2125, image: '🧢' },
    { name: 'PromptWars T-Shirt', credits: 3625, image: '👕' },
    { name: 'PromptWars Backpack', credits: 4000, image: '🎒' },
    { name: 'PromptWars Hoodie (Zip)', credits: 5000, image: '🧥' },
    { name: 'Desk Pad (900x400)', credits: 8275, image: '🖥️' },
    { name: 'Premium Backpack', credits: 11025, image: '🌟' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top duration-300">
          <Trophy className="w-4 h-4 text-amber-400 dark:text-amber-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <Header
        currentLocation={currentLocation}
        onSelectLocation={(loc) => {
          setCurrentLocation(loc);
          if (loc.aqi > 300) setEmergencyMode(true);
        }}
        household={household}
        onOpenHouseholdModal={() => setHouseholdModalOpen(true)}
        onOpenCopilot={() => {
          setCopilotInitialPrompt('');
          setCopilotOpen(true);
        }}
        emergencyMode={emergencyMode}
        onToggleEmergencyMode={() => setEmergencyModalOpen(true)}
        promptCredits={promptCredits}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Hackathon Challenge Sub-Header */}
      <div className="bg-white/80 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <span className="font-bold text-slate-900 dark:text-white">
              PromptWars: Virtual
            </span>
            <span>•</span>
            <span>Urban Air Quality Assistant Challenge</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSwagStoreOpen(true)}
              className="text-amber-800 dark:text-amber-300 hover:underline font-semibold flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800/60 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Prompt Credits Swag Store ({promptCredits.toLocaleString()} CR)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200 dark:border-slate-800">
          {[
            { id: 'overview', label: 'Air & Inversion', icon: Activity },
            { id: 'home-twin', label: 'Home Air Twin™', icon: Home, badge: 'Simulator' },
            { id: 'routines', label: 'Daily Routine', icon: Calendar, badge: 'Adaptive' },
            { id: 'iaq-hacks', label: 'IAQ Hacks & DIY', icon: Wrench, badge: 'Corsi-Rosenthal' },
            { id: 'alternatives', label: 'Sustainable Alternatives', icon: Leaf, badge: '-92% Cut' },
            { id: 'community', label: 'Community Shield', icon: Users, badge: 'Collective' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Global Impact Summary Bar */}
        <DirectImpactMeter
          metrics={impactMetrics}
          onOpenCopilotWithContext={handleOpenCopilotWithPrompt}
        />

        {/* Active Tab View */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <AirQualityOverview
              location={currentLocation}
              onSelectHour={(hour) => {
                handleOpenCopilotWithPrompt(`What should my family do at ${hour}:00 with current thermal inversion levels?`);
              }}
            />

            {/* Quick Cards Deck */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                onClick={() => setActiveTab('home-twin')}
                className="p-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-3xl cursor-pointer transition-all shadow-2xs hover:shadow-xs group"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <Home className="w-4 h-4" />
                    Home Air Twin™
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">Test Your Stove &amp; Purifier Settings</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Living room modeled at {roomLevels.livingRoom.pm25} µg/m³. Toggle induction and damp mopping.
                </p>
              </div>

              <div 
                onClick={() => setActiveTab('routines')}
                className="p-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-3xl cursor-pointer transition-all shadow-2xs hover:shadow-xs group"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Solar Safe Window
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">Ventilation Window: 12:30 - 2:30 PM</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Export 24h smog routine directly to your Google or Apple calendar (.ics).
                </p>
              </div>

              <div 
                onClick={() => setActiveTab('iaq-hacks')}
                className="p-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-3xl cursor-pointer transition-all shadow-2xs hover:shadow-xs group"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-sky-700 dark:text-sky-400 flex items-center gap-1.5">
                    <Wrench className="w-4 h-4" />
                    DIY Corsi-Rosenthal Box
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">550 CFM Clean Air Under $25</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Interactive room CADR calculator and step-by-step box fan assembly guide.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'home-twin' && (
          <HomeAirTwin
            outdoorPm25={currentLocation.pm25}
            household={household}
            twinState={twinState}
            onUpdateState={setTwinState}
          />
        )}

        {activeTab === 'routines' && (
          <DailyRoutineScheduler
            routineItems={routineItems}
            location={currentLocation}
            household={household}
            onAwardCredits={handleAwardCredits}
            onOpenCopilot={handleOpenCopilotWithPrompt}
          />
        )}

        {activeTab === 'iaq-hacks' && (
          <IAQHacksLibrary
            onOpenCopilot={handleOpenCopilotWithPrompt}
          />
        )}

        {activeTab === 'alternatives' && (
          <SustainableAlternativesMatrix
            onOpenCopilot={handleOpenCopilotWithPrompt}
            onPledgeAlternative={handlePledgeAlternative}
          />
        )}

        {activeTab === 'community' && (
          <CommunityHub
            onAwardCredits={handleAwardCredits}
          />
        )}

      </main>

      {/* Floating Ask Copilot Bubble */}
      <button
        onClick={() => {
          setCopilotInitialPrompt('');
          setCopilotOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-2xl shadow-lg flex items-center gap-2 font-bold text-xs transition-all hover:scale-105"
      >
        <Sparkles className="w-4 h-4" />
        <span>Ask AeroPulse AI</span>
      </button>

      {/* Modals & Drawers */}
      <CopilotDrawer
        isOpen={copilotOpen}
        onClose={() => setCopilotOpen(false)}
        location={currentLocation}
        household={household}
        roomPm25={{
          kitchen: roomLevels.kitchen.pm25,
          livingRoom: roomLevels.livingRoom.pm25,
          bedroom: roomLevels.bedroom.pm25
        }}
        initialPrompt={copilotInitialPrompt}
      />

      <HouseholdModal
        isOpen={householdModalOpen}
        onClose={() => setHouseholdModalOpen(false)}
        household={household}
        onSave={(updated) => {
          setHousehold(updated);
          handleAwardCredits(200, 'Updated Household & Lifestyle Profile');
        }}
      />

      <SmogEmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        location={currentLocation}
        onExecuteProtocol={handleExecuteEmergencyProtocol}
      />

      {/* Swag Store Modal */}
      {swagStoreOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setSwagStoreOpen(false)}
            className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-xs" 
          />
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">PromptWars Swag Store</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 px-3 py-1 rounded-full">
                  Balance: {promptCredits.toLocaleString()} Credits
                </span>
                <button 
                  onClick={() => setSwagStoreOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
              Earn Prompt Credits by taking smog defense pledges, exporting routines, reporting hotspots, and optimizing your home air twin!
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {swagItems.map((item, idx) => {
                const canAfford = promptCredits >= item.credits;
                return (
                  <div 
                    key={idx}
                    className={`p-4 rounded-2xl border text-center flex flex-col justify-between ${
                      canAfford 
                        ? 'bg-slate-50 dark:bg-slate-900 border-amber-300 dark:border-amber-700/60' 
                        : 'bg-white dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    <div>
                      <span className="text-2xl block mb-1">{item.image}</span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</h4>
                    </div>

                    <div className="mt-3">
                      <span className="text-xs font-black text-amber-700 dark:text-amber-400 block">
                        {item.credits.toLocaleString()} CR
                      </span>
                      <button
                        disabled={!canAfford}
                        onClick={() => {
                          setPromptCredits(prev => prev - item.credits);
                          setToastMessage(`🎉 Redeemed ${item.name}! Check your email for shipping.`);
                        }}
                        className={`mt-2 w-full text-[10px] font-bold py-1.5 rounded-xl transition-all ${
                          canAfford
                            ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-2xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Redeem Swag' : 'Need More CR'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AeroPulse AI — Built for PromptWars: Virtual Hackathon</span>
          <span>Powered by Google Gemini GenAI &amp; Atmospheric Science Models</span>
        </div>
      </footer>

    </div>
  );
}

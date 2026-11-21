'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
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
import { CustomLocationModal } from '../components/CustomLocationModal';
import { 
  Activity, 
  Home, 
  Calendar, 
  Wrench, 
  Leaf, 
  Users, 
  Sparkles, 
  CheckCircle2,
  Printer,
  Download,
  X,
  FileText,
  Copy
} from 'lucide-react';

export default function HomeDashboard() {
  // Theme state: defaults to false (clean neutral light mode), persists in localStorage
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
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

  // Navigation tab state: 'overview' | 'home-twin' | 'routines' | 'iaq-hacks' | 'alternatives' | 'community' | 'all'
  const [activeTab, setActiveTab] = useState<'overview' | 'home-twin' | 'routines' | 'iaq-hacks' | 'alternatives' | 'community' | 'all'>('overview');
  const [emergencyMode, setEmergencyMode] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & Drawers
  const [copilotOpen, setCopilotOpen] = useState<boolean>(false);
  const [copilotInitialPrompt, setCopilotInitialPrompt] = useState<string>('');
  const [householdModalOpen, setHouseholdModalOpen] = useState<boolean>(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [customLocationModalOpen, setCustomLocationModalOpen] = useState<boolean>(false);

  // Close report modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && reportModalOpen) {
        setReportModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [reportModalOpen]);

  const contentSectionRef = useRef<HTMLDivElement>(null);

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
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenCopilotWithPrompt = (prompt: string) => {
    setCopilotInitialPrompt(prompt);
    setCopilotOpen(true);
  };

  const handleCopyMarkdownPlan = () => {
    const text = `# Household Clean Air Action Brief: ${currentLocation.name}
Date: ${new Date().toLocaleDateString()}
Location: ${currentLocation.name} (${currentLocation.country})
Air Quality Status: AQI ${currentLocation.aqi} | PM2.5: ${currentLocation.pm25} µg/m³
Overall Air Shield: ${airShieldScore}% Optimal

## Direct Impact Metrics
- Inhaled Cigarettes Avoided: ${impactMetrics.equivalentCigarettesAvoidedDay} / person / day
- Deep Lung Deposition Cut: -${impactMetrics.pm25DoseReductionPercent}%
- Community CO₂ Prevented: ${impactMetrics.co2SavedKgMonth} kg/mo
- Monthly Energy & Health Savings: $${impactMetrics.energyCostSavedUsdMonth}/mo

## Prescribed Daily Actions
1. Thermal Inversion Window: Restrict cross-ventilation strictly to 12:30 PM - 2:30 PM. Keep windows sealed between 6:00 PM and 11:30 AM.
2. Clean Haven Room: Maintain sleeping haven below 15 µg/m³ with dedicated HEPA/Corsi-Rosenthal filter.
3. Kitchen Mitigation: Cook with induction or run exhaust with cracked intake window to prevent apartment depressurization.
4. Cleaning: Damp microfiber mop twice weekly; avoid dry sweeping.

AeroPulse AI — Urban Air Quality & Winter Smog Defense System`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast('Copied Clean Air Action Brief to clipboard');
    }
  };

  const handleTabChange = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    // Smoothly ensure tab view is immediately in focus
    if (contentSectionRef.current) {
      contentSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleExecuteEmergencyProtocol = () => {
    setEmergencyMode(true);
    setTwinState(prev => ({
      ...prev,
      kitchen: { ...prev.kitchen, cookingActive: false, fuel: 'induction', exhaustOn: true },
      livingRoom: { ...prev.livingRoom, windowsState: 'sealed', purifierMode: 'turbo', cleaningMethod: 'damp-microfiber' },
      bedroom: { ...prev.bedroom, doorClosed: true, purifierMode: 'turbo', bedtimeSeal: true }
    }));
    showToast('Activated 24-Hour Emergency Clean Haven Protocol');
  };

  const handlePledgeAlternative = (alt: SustainableAlternative) => {
    if (alt.domain === 'Cooking') {
      setHousehold(prev => ({ ...prev, cookingFuel: 'electric-induction' }));
      setTwinState(prev => ({ ...prev, kitchen: { ...prev.kitchen, fuel: 'induction' } }));
    } else if (alt.domain === 'Mobility') {
      setHousehold(prev => ({ ...prev, commuteMode: 'public-metro-electric-bus' }));
    }
    showToast(`Adopted: ${alt.sustainableChoice}`);
  };

  // Calculate overall shield score
  const airShieldScore = useMemo(() => {
    let score = 50;
    if (twinState.livingRoom.windowsState === 'sealed') score += 12;
    if (twinState.kitchen.fuel === 'induction') score += 14;
    if (twinState.livingRoom.purifierMode !== 'off') score += 12;
    if (twinState.bedroom.doorClosed) score += 6;
    if (twinState.bedroom.bedtimeSeal) score += 6;
    return Math.min(98, score);
  }, [twinState]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 ambient-mesh">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 animate-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
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
        airShieldScore={airShieldScore}
        onExportReport={() => setReportModalOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenCustomLocationModal={() => setCustomLocationModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6">
        
        {/* Navigation Tabs Bar */}
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 min-w-max">
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
                  type="button"
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                      isActive 
                        ? 'bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* View All Toggle Button */}
          <button
            type="button"
            onClick={() => handleTabChange(activeTab === 'all' ? 'overview' : 'all')}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-xs'
                : 'text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>{activeTab === 'all' ? 'Single Tab View' : 'View All Sections'}</span>
          </button>
        </div>

        {/* Tab Content Container */}
        <div ref={contentSectionRef} className="space-y-6">

          {/* TAB 1: Air & Inversion Overview */}
          {(activeTab === 'overview' || activeTab === 'all') && (
            <div className="space-y-6">
              <AirQualityOverview
                location={currentLocation}
                onSelectHour={(hour) => {
                  handleOpenCopilotWithPrompt(`What should my family do at ${hour}:00 with current thermal inversion levels in ${currentLocation.name}?`);
                }}
              />

              <DirectImpactMeter
                metrics={impactMetrics}
                onOpenCopilotWithContext={handleOpenCopilotWithPrompt}
              />
            </div>
          )}

          {/* TAB 2: Home Air Twin™ Simulator */}
          {(activeTab === 'home-twin' || activeTab === 'all') && (
            <HomeAirTwin
              outdoorPm25={currentLocation.pm25}
              household={household}
              twinState={twinState}
              onUpdateState={setTwinState}
            />
          )}

          {/* TAB 3: Adaptive Daily Routine */}
          {(activeTab === 'routines' || activeTab === 'all') && (
            <DailyRoutineScheduler
              routineItems={routineItems}
              location={currentLocation}
              household={household}
              onActionComplete={(title) => showToast(`Logged complete: ${title}`)}
              onOpenCopilot={handleOpenCopilotWithPrompt}
            />
          )}

          {/* TAB 4: IAQ Hacks & DIY Filtration */}
          {(activeTab === 'iaq-hacks' || activeTab === 'all') && (
            <IAQHacksLibrary
              onOpenCopilot={handleOpenCopilotWithPrompt}
            />
          )}

          {/* TAB 5: Sustainable Alternatives */}
          {(activeTab === 'alternatives' || activeTab === 'all') && (
            <SustainableAlternativesMatrix
              onOpenCopilot={handleOpenCopilotWithPrompt}
              onPledgeAlternative={handlePledgeAlternative}
            />
          )}

          {/* TAB 6: Community Shield & Civic Reporting */}
          {(activeTab === 'community' || activeTab === 'all') && (
            <CommunityHub
              onPledgeUpdate={(title, pledged) => {
                showToast(pledged ? `Joined initiative: ${title}` : `Updated status for ${title}`);
              }}
            />
          )}

        </div>

      </main>

      {/* Floating Ask Copilot Pill */}
      <button
        type="button"
        onClick={() => {
          setCopilotInitialPrompt('');
          setCopilotOpen(true);
        }}
        className="fixed bottom-5 right-5 z-40 bg-slate-900/95 hover:bg-slate-900 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-3.5 py-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.18)] backdrop-blur-md border border-slate-700/50 dark:border-emerald-400/40 flex items-center gap-2 font-bold text-xs transition-all hover:scale-105 cursor-pointer"
      >
        <Sparkles className="w-4 h-4 text-emerald-400 dark:text-emerald-100" />
        <span>Ask Copilot</span>
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
          showToast('Updated Household & Lifestyle Profile');
        }}
      />

      <SmogEmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        location={currentLocation}
        onExecuteProtocol={handleExecuteEmergencyProtocol}
      />

      <CustomLocationModal
        isOpen={customLocationModalOpen}
        onClose={() => setCustomLocationModalOpen(false)}
        onApplyLocation={(newLoc) => {
          setCurrentLocation(newLoc);
          if (newLoc.aqi > 300) setEmergencyMode(true);
          showToast(`Applied air environment: ${newLoc.name}`);
        }}
      />

      {/* Executive Clean Air Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setReportModalOpen(false)}
            className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-xs" 
          />
          <div id="printable-action-brief" className="relative w-full max-w-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl z-10 max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Household Clean Air Action Brief</h3>
                  <p className="text-xs text-slate-500">Certified Environmental Defense Summary for {currentLocation.name}</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setReportModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white no-print"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Location Air Status</span>
                  <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {currentLocation.name} — AQI {currentLocation.aqi} (PM2.5: {currentLocation.pm25} µg/m³)
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Overall Air Shield</span>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {airShieldScore}% Optimal
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Key Exposure Metrics:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-medium">Inhaled Cigarettes Averted</span>
                    <span className="text-lg font-black text-slate-900 dark:text-white mt-1 block">{impactMetrics.equivalentCigarettesAvoidedDay} / day</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-medium">Lung Deposition Cut</span>
                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-1 block">-{impactMetrics.pm25DoseReductionPercent}%</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-medium">CO₂ Prevented</span>
                    <span className="text-lg font-black text-sky-600 dark:text-sky-400 mt-1 block">{impactMetrics.co2SavedKgMonth} kg/mo</span>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-medium">Monthly Cost Saved</span>
                    <span className="text-lg font-black text-amber-600 dark:text-amber-400 mt-1 block">${impactMetrics.energyCostSavedUsdMonth}/mo</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Prescribed Daily Actions:</h4>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-600 dark:text-slate-300">
                  <li><strong>Thermal Inversion Window:</strong> Restrict home cross-ventilation strictly to <strong>12:30 PM - 2:30 PM</strong>. Keep all windows sealed between 6:00 PM and 11:30 AM.</li>
                  <li><strong>Indoor Filtration:</strong> Maintain clean sleep bedroom haven below 15 µg/m³ with dedicated purifier running on quiet/boost.</li>
                  <li><strong>Kitchen Combustion Mitigation:</strong> Cook with induction or run range hood with a 1-inch cracked intake window to prevent apartment depressurization.</li>
                  <li><strong>Cleaning Protocol:</strong> Damp microfiber mopping twice weekly to prevent fine lead and tire rubber resuspension.</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between no-print">
              <span className="text-[11px] text-slate-400">Generated by AeroPulse AI Health Science Engine</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopyMarkdownPlan}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy formatted markdown plan"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Plan</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Brief</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                    setReportModalOpen(false);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AeroPulse AI — Advanced Urban Air Quality &amp; Smog Defense Assistant</span>
          <span>Powered by Google Gemini GenAI &amp; Atmospheric Science Models</span>
        </div>
      </footer>

    </div>
  );
}

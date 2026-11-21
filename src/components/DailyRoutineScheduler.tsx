'use client';

import React, { useState } from 'react';
import { DailyRoutineItem, LocationCity, HouseholdProfile } from '../types';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Download, 
  Clock, 
  Sun, 
  Shield, 
  Sparkles
} from 'lucide-react';

interface DailyRoutineSchedulerProps {
  routineItems: DailyRoutineItem[];
  location: LocationCity;
  household: HouseholdProfile;
  onAwardCredits: (amount: number, reason: string) => void;
  onOpenCopilot: (prompt: string) => void;
}

export const DailyRoutineScheduler: React.FC<DailyRoutineSchedulerProps> = ({
  routineItems,
  location,
  household,
  onAwardCredits,
  onOpenCopilot
}) => {
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});

  const toggleComplete = (id: string, title: string) => {
    setCompletedMap(prev => {
      const nextState = !prev[id];
      if (nextState) {
        onAwardCredits(150, `Completed action: ${title}`);
      }
      return { ...prev, [id]: nextState };
    });
  };

  const handleExportICS = () => {
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AeroPulse AI//Winter Smog Routine//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:AeroPulse Smog Shield Routine'
    ];

    routineItems.forEach((item, idx) => {
      icsContent.push(
        'BEGIN:VEVENT',
        `UID:aeropulse-${dateStr}-${idx}@promptwars.ai`,
        `DTSTAMP:${dateStr}T120000Z`,
        `DTSTART:${dateStr}T${item.timeRange.slice(0, 2)}0000Z`,
        `DTEND:${dateStr}T${item.timeRange.slice(8, 10)}0000Z`,
        `SUMMARY:🛡️ ${item.title}`,
        `DESCRIPTION:${item.action}\\n\\nImpact: ${item.directHealthImpact}`,
        `LOCATION:${location.name} - ${household.name}`,
        'STATUS:CONFIRMED',
        'BEGIN:VALARM',
        'TRIGGER:-PT15M',
        'ACTION:DISPLAY',
        `DESCRIPTION:Reminder: ${item.title}`,
        'END:VALARM',
        'END:VEVENT'
      );
    });

    icsContent.push('END:VCALENDAR');

    const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `AeroPulse-Daily-Smog-Routine-${location.name.replace(/\s+/g, '-')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onAwardCredits(200, 'Exported Smog Routine to Calendar (.ICS)');
  };

  const completedCount = Object.values(completedMap).filter(Boolean).length;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-5 lg:p-7 shadow-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-lg lg:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Adaptive Low-Emission Daily Routine
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dynamic hourly schedule synchronized with atmospheric thermal inversion hours for {location.name}.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">{completedCount} / {routineItems.length}</span>
            <span className="text-slate-500">Completed</span>
          </div>

          <button
            onClick={handleExportICS}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
            title="Download .ICS file to add to Google Calendar or Apple Calendar"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export to Calendar (.ICS)</span>
          </button>
        </div>
      </div>

      {/* Routine Cards List */}
      <div className="mt-6 space-y-3.5">
        {routineItems.map((item) => {
          const isDone = !!completedMap[item.id];
          const isSafeWindow = item.phase === 'Midday Sun';

          return (
            <div
              key={item.id}
              className={`p-4.5 rounded-2xl border transition-all ${
                isDone
                  ? 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/60 dark:border-slate-800/60 opacity-75'
                  : isSafeWindow
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 shadow-xs'
                  : 'bg-white dark:bg-slate-950/60 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                
                {/* Left: Checkbox + Phase + Title */}
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => toggleComplete(item.id, item.title)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shrink-0"
                    title={isDone ? 'Mark as incomplete' : 'Mark completed (+150 credits)'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600 hover:text-emerald-600" />
                    )}
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {item.timeRange}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isSafeWindow
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}>
                        {item.phase}
                      </span>
                      {isSafeWindow && (
                        <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200/80">
                          <Sun className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Solar Safe Ventilation
                        </span>
                      )}
                    </div>

                    <h3 className={`text-sm lg:text-base font-bold mt-1.5 ${
                      isDone ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                    }`}>
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {item.action}
                    </p>
                  </div>
                </div>

                {/* Right: Smog context badge */}
                <div className="sm:text-right shrink-0">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
                    {item.smogContext}
                  </span>
                </div>
              </div>

              {/* Impact Breakdown Footnote */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-sky-700 dark:text-sky-300">
                  <Shield className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span className="text-[11px] font-medium">Health Shield: {item.directHealthImpact}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 sm:justify-end">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-medium">Emission Saved: {item.directEmissionImpact}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Routine Optimization Tip */}
      <div className="mt-5 p-3.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
        <span>Need specialized routine adjustments for school sports or sensitive family members?</span>
        <button
          onClick={() => onOpenCopilot('Customize my daily routine for a 7-year-old child and 68-year-old asthmatic grandparent')}
          className="text-emerald-700 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1"
        >
          <Sparkles className="w-3 h-3" />
          Ask Copilot to Refine
        </button>
      </div>

    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { CommunityInitiative } from '../types';
import { COMMUNITY_INITIATIVES } from '../data/mockData';
import { 
  Users, 
  MapPin, 
  ShieldCheck, 
  Megaphone, 
  Sparkles, 
  Check, 
  Camera, 
  Send,
  Award
} from 'lucide-react';

interface CommunityHubProps {
  onAwardCredits: (amount: number, reason: string) => void;
}

export const CommunityHub: React.FC<CommunityHubProps> = ({ onAwardCredits }) => {
  const [initiatives, setInitiatives] = useState<CommunityInitiative[]>(COMMUNITY_INITIATIVES);
  const [reportText, setReportText] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  const togglePledge = (id: string) => {
    setInitiatives(prev => prev.map(item => {
      if (item.id === id) {
        const nextPledged = !item.userPledged;
        if (nextPledged) {
          onAwardCredits(300, `Pledged to community initiative: ${item.title}`);
        }
        return {
          ...item,
          userPledged: nextPledged,
          activePledgers: nextPledged ? item.activePledgers + 1 : item.activePledgers - 1,
          collectiveSmogAbatedKg: nextPledged ? item.collectiveSmogAbatedKg + 15 : item.collectiveSmogAbatedKg - 15
        };
      }
      return item;
    }));
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    setReportSubmitted(true);
    onAwardCredits(500, 'Reported localized smog hotspot to community watch');
    setTimeout(() => {
      setReportText('');
      setReportSubmitted(false);
    }, 4000);
  };

  const totalSmogAbated = initiatives.reduce((sum, item) => sum + item.collectiveSmogAbatedKg, 0);
  const totalPledgers = initiatives.reduce((sum, item) => sum + item.activePledgers, 0);

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 lg:p-6 backdrop-blur-md shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg lg:text-xl font-bold text-white tracking-tight">
              Community Smog Shield & Collective Action
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Mobilizing neighborhoods, schools, and apartment societies for collective particulate reduction.
          </p>
        </div>

        {/* Collective Counter Banner */}
        <div className="flex items-center gap-3 bg-slate-950/80 border border-emerald-900/40 px-3.5 py-2 rounded-xl">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Neighborhood Shield</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-emerald-400">{totalSmogAbated.toLocaleString()}</span>
              <span className="text-xs text-slate-400">kg Particulate Abated</span>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Active Families</span>
            <span className="text-sm font-bold text-white">{totalPledgers.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Initiatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {initiatives.map((item) => (
          <div
            key={item.id}
            className={`p-4.5 rounded-2xl border transition-all flex flex-col justify-between ${
              item.userPledged
                ? 'bg-emerald-950/20 border-emerald-600/40 shadow-sm'
                : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                  {item.category}
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                  {item.collectiveSmogAbatedKg} kg Abated
                </span>
              </div>

              <h3 className="text-base font-bold text-white mt-2.5">
                {item.title}
              </h3>
              
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{item.targetNeighborhood}</span>
              </div>

              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Bottom: Pledgers & Toggle Button */}
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span><strong>{item.activePledgers}</strong> families pledged</span>
              </div>

              <button
                onClick={() => togglePledge(item.id)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                  item.userPledged
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                {item.userPledged ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Pledged (+300 CR)</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Take the Pledge</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Community Smog / Trash Burning Rapid Incident Reporter */}
      <div className="mt-6 p-4.5 bg-slate-950/90 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
          <Megaphone className="w-4 h-4 text-rose-400" />
          <span>Spot & Report Localized Smog Hotspot (Trash Burning / Diesel Genset)</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Crowdsource illegal leaf burning, open trash fires, or industrial chimney leaks with immediate geo-alerts.
        </p>

        {reportSubmitted ? (
          <div className="mt-3 p-3 bg-emerald-950/40 border border-emerald-600/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Thank you! Hotspot reported to nodal municipal officers. +500 Prompt Credits awarded!</span>
          </div>
        ) : (
          <form onSubmit={handleReportSubmit} className="mt-3 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              placeholder="e.g., Open leaf burning spotted near Sector 14 park boundary wall..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="button"
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
              title="Attach photo"
            >
              <Camera className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Add Photo</span>
            </button>
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-500 text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-rose-950"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Alert</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};

'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { LocationCity, HouseholdProfile, CopilotMessage } from '../types';

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onresult: ((event: { results: Array<Array<{ transcript: string }>> }) => void) | null;
  start: () => void;
  stop: () => void;
}

interface WindowWithSpeech extends Window {
  SpeechRecognition?: new () => SpeechRecognitionInstance;
  webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
}
import { 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Mic, 
  MicOff, 
  Copy, 
  Check, 
  RotateCcw
} from 'lucide-react';

interface CopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  location: LocationCity;
  household: HouseholdProfile;
  roomPm25: {
    kitchen: number;
    livingRoom: number;
    bedroom: number;
  };
  initialPrompt?: string;
}

export const CopilotDrawer: React.FC<CopilotDrawerProps> = ({
  isOpen,
  onClose,
  location,
  household,
  roomPm25,
  initialPrompt
}) => {
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: `Hello! I am **AeroPulse AI**, your GenAI Urban Air Quality and Smog Defense Copilot.\n\nI have analyzed your location (**${location?.name || 'your area'}**, AQI **${location?.aqi || 350}**) and your household profile. How can I help protect your family or optimize your low-emission routine today?`,
      timestamp: 'Just now',
      suggestions: [
        'How do I size a Corsi-Rosenthal box for my rooms?',
        'When is the solar zenith safe ventilation window today?',
        'What is the baby nursery sleep safety protocol?',
        'How does induction cooking eliminate NO2 spikes?'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = useCallback(async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: CopilotMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!messageText) setInput('');
    setIsLoading(true);

    try {
      // Build conversation history to send
      const historyPayload = messages.slice(-6).map(m => ({
        sender: m.sender,
        content: m.content
      }));

      const res = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          location: {
            name: location.name,
            neighborhood: location.neighborhood,
            aqi: location.aqi,
            pm25: location.pm25,
            inversionCeilingMeters: location.inversionCeilingMeters,
            primaryPollutant: location.primaryPollutant
          },
          household: {
            homeType: household.homeType,
            cookingFuel: household.cookingFuel,
            commuteMode: household.commuteMode,
            members: household.members,
            hasCorsiRosenthal: household.defenses.hasCorsiRosenthalBox,
            purifiersCount: household.defenses.hepaPurifiersCount
          },
          roomPm25
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        const assistantMsg: CopilotMessage = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          content: json.data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: json.data.suggestions
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error(json.error || 'Failed to generate answer');
      }
    } catch (err: unknown) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'assistant',
          content: `⚠️ I encountered an error connecting to the GenAI engine. Please verify your connection or try again.`,
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, location, household, roomPm25]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      const timer = setTimeout(() => {
        handleSend(initialPrompt);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [initialPrompt, isOpen, handleSend]);

  useEffect(() => {
    if (typeof chatEndRef.current?.scrollIntoView === 'function') {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Web Speech API Voice Dictation
  const toggleSpeechRecognition = () => {
    if (typeof window === 'undefined') return;
    const win = window as unknown as WindowWithSpeech;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      alert('Speech recognition is not supported in this browser. Please use Google Chrome or Edge.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript || '';
      if (transcript) {
        setInput(transcript);
        handleSend(transcript);
      }
    };

    recognition.start();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/70 backdrop-blur-xs transition-opacity" 
      />

      {/* Drawer Panel */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="AeroPulse AI Copilot Drawer"
        className="relative w-full max-w-lg bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 h-full flex flex-col shadow-2xl z-10"
      >
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                AeroPulse AI Copilot
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Gemini
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Atmospheric Science &amp; Health Copilot
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMessages([messages[0]])}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Reset conversation"
              aria-label="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close Copilot drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-none shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-2xs'
              }`}>
                <div className="whitespace-pre-line prose prose-slate dark:prose-invert prose-xs">
                  {msg.content}
                </div>

                {msg.sender === 'assistant' && (
                  <div className="mt-3 pt-2 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                    <span>{msg.timestamp}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="text-slate-500 hover:text-emerald-700 dark:hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-800 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold block">
                      Suggested Next Questions:
                    </span>
                    <div className="flex flex-col gap-1">
                      {msg.suggestions.map((sug, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => handleSend(sug)}
                          className="text-left text-[11px] text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-slate-800 p-2 rounded-xl border border-slate-200/60 dark:border-slate-800 transition-colors cursor-pointer"
                        >
                          → {sug}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Synthesizing atmospheric dispersion and formulating advice...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything (e.g. nursery seal, Corsi-Rosenthal sizing)..."
              disabled={isLoading}
              className="flex-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
            />

            {/* Voice Dictation */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                  : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Speak with microphone"
              aria-label={isListening ? "Stop voice dictation" : "Start voice dictation"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send message to Copilot"
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 transition-all shadow-xs cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  ShieldCheck, 
  Building2, 
  Briefcase, 
  Layers,
  ArrowRight
} from 'lucide-react';

export default function ProcessingStep({ onComplete, summaryData }) {
  const [progress, setProgress] = useState(15);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    { title: 'Encrypting & indexing master ATS profile...', icon: <ShieldCheck className="w-4 h-4" /> },
    { title: `Indexing target companies (${summaryData?.companies?.slice(0, 3).join(', ') || 'Google, Microsoft'} + more)...`, icon: <Building2 className="w-4 h-4" /> },
    { title: `Calibrating role matches for ${summaryData?.roles?.join(', ') || 'Software Engineering'}...`, icon: <Briefcase className="w-4 h-4" /> },
    { title: 'Connecting to live careers portals & scraping active openings...', icon: <Terminal className="w-4 h-4" /> },
    { title: 'Calculating semantic ATS similarity & tailoring baseline...', icon: <Sparkles className="w-4 h-4" /> },
    { title: 'Finalizing your autonomous command dashboard...', icon: <Layers className="w-4 h-4" /> },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 800);
          return 100;
        }
        const next = prev + 17;
        const newStep = Math.min(Math.floor((next / 100) * steps.length), steps.length - 1);
        setCurrentStepIndex(newStep);
        return next > 100 ? 100 : next;
      });
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow matrix */}
      <div className="absolute w-96 h-96 bg-zinc-800/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 p-8 sm:p-10 text-center shadow-2xl relative">
        
        {/* Animated Radar Pulse Icon */}
        <div className="relative w-20 h-20 mx-auto mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-zinc-700 animate-ping opacity-30" />
          <div className="absolute inset-2 rounded-full border border-zinc-600 animate-pulse-subtle" />
          <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center font-extrabold text-2xl shadow-xl">
            ▲
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
          Setting Up Your Career Radar
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mb-8 font-mono">
          OmniApply autonomous agent is initializing your personal pipeline...
        </p>

        {/* Progress Bar */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Processing Pipeline</span>
            <span className="text-white font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Checklist Steps */}
        <div className="space-y-3 text-left mb-8">
          {steps.map((st, idx) => {
            const isDone = idx < currentStepIndex || progress >= 100;
            const isCurrent = idx === currentStepIndex && progress < 100;

            return (
              <div 
                key={idx}
                className={`p-3 rounded-xl border text-xs flex items-center gap-3 transition-all ${
                  isDone 
                    ? 'border-zinc-800 bg-zinc-900/60 text-zinc-300' 
                    : isCurrent
                    ? 'border-white/40 bg-zinc-900 text-white shadow-sm ring-1 ring-white/10'
                    : 'border-zinc-900 bg-zinc-950 text-zinc-600'
                }`}
              >
                <div className="shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-zinc-800" />
                  )}
                </div>
                <span className="flex-1 font-mono">{st.title}</span>
              </div>
            );
          })}
        </div>

        {/* Bottom Status text */}
        <p className="text-[11px] font-mono text-zinc-500">
          Ready to discover high-match engineering positions...
        </p>

      </div>
    </div>
  );
}

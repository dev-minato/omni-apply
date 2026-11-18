import React, { useState } from 'react';
import { 
  Bot, 
  Zap, 
  Clock, 
  Workflow, 
  Copy, 
  Check, 
  Play, 
  ShieldCheck, 
  Cpu, 
  Server,
  MailCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function AutomationPanel({ 
  schedulerStatus, 
  onToggleScheduler, 
  onRunCycle, 
  isCycleRunning, 
  healthStatus 
}) {
  const [copied, setCopied] = useState(false);
  const webhookUrl = `${window.location.origin}/api/pipeline/run-cycle?trigger_source=n8n_external`;

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isRunning = schedulerStatus?.running ?? true;

  return (
    <div className="space-y-6">
      
      {/* Hero Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/20 backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                <Bot className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-extrabold text-white">
                24/7 Autonomous Background Agent
              </h2>
            </div>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              This engine scans off-campus job portals automatically even while your browser is closed. When a relevant job is detected, it rewrites your resume, drafts a cold pitch, contacts the hiring team, and emails you the final report.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onToggleScheduler(!isRunning)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                isRunning
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <Zap className={`w-4 h-4 ${isRunning ? 'fill-emerald-400 text-emerald-400' : ''}`} />
              <span>{isRunning ? 'Worker: RUNNING (24/7)' : 'Worker: PAUSED'}</span>
            </button>

            <button
              onClick={onRunCycle}
              disabled={isCycleRunning}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isCycleRunning ? 'Scanning & Applying...' : 'Run Cycle Now'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Diagnostics & Integrations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* System & Architecture Diagnostics */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>Connected AI & Backend Engine</span>
          </h3>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">Multi-Tier LLM Provider</div>
                  <div className="text-[11px] text-slate-400">Groq (Llama-3.3/OpenAI) + Gemini 3.8 Flash</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ACTIVE
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <MailCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">SMTP Mail Dispatcher</div>
                  <div className="text-[11px] text-slate-400">mail.thesoulmate.in:465 (SSL Verified)</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                CONNECTED
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <Server className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">Database & Persistence</div>
                  <div className="text-[11px] text-slate-400">Supabase Cloud + Local SQLite Sync Engine</div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                SYNCED
              </span>
            </div>
          </div>
        </div>

        {/* n8n & Webhook Automation */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Workflow className="w-4 h-4 text-purple-400" />
            <span>n8n Workflow Integration (Webhook)</span>
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            You can hook OmniApply directly into your n8n workflow or cloud cron scheduler. When pinged, the backend initiates a headless job scraping, tailoring, and cold apply cycle.
          </p>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between gap-2">
            <span className="text-xs font-mono text-slate-300 truncate">
              {webhookUrl}
            </span>
            <button
              onClick={handleCopyWebhook}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors shrink-0"
              title="Copy n8n Webhook URL"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Ready-to-import template: <code>n8n_workflow_template.json</code> in project root</span>
          </div>
        </div>

      </div>

    </div>
  );
}

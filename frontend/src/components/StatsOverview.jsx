import React from 'react';
import { Briefcase, Send, Target, Zap, Clock, ShieldCheck } from 'lucide-react';

export default function StatsOverview({ jobs, applications, schedulerStatus }) {
  const avgAts = applications.length > 0 
    ? Math.round(applications.reduce((acc, a) => acc + (a.ats_score || 85), 0) / applications.length)
    : 88;

  const nextRun = schedulerStatus?.next_run_time
    ? new Date(schedulerStatus.next_run_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'In 45 mins';

  const stats = [
    {
      title: 'Discovered Jobs',
      value: jobs.length,
      subtext: 'LinkedIn, Naukri & Portals',
      icon: Briefcase,
      color: 'from-blue-500/20 to-cyan-500/10 text-cyan-400 border-cyan-500/30'
    },
    {
      title: 'Applications Dispatched',
      value: applications.length,
      subtext: 'Cold outreach & Resumes sent',
      icon: Send,
      color: 'from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30'
    },
    {
      title: 'Average ATS Score',
      value: `${avgAts}%`,
      subtext: 'Tailored by LLM agent',
      icon: Target,
      color: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      title: 'Autonomous Worker',
      value: schedulerStatus?.running ? 'Active (24/7)' : 'Paused',
      subtext: `Next scan: ${nextRun}`,
      icon: Zap,
      color: 'from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((s, idx) => {
        const Icon = s.icon;
        return (
          <div
            key={idx}
            className={`p-5 rounded-2xl bg-gradient-to-br ${s.color} border bg-slate-900/60 backdrop-blur-sm relative overflow-hidden transition-all hover:scale-[1.01]`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
                {s.title}
              </span>
              <div className="p-2 rounded-xl bg-slate-800/80">
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {s.value}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {s.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}

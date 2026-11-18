import React from 'react';
import { Activity, Clock, CheckCircle2, AlertCircle, Sparkles, Send, User } from 'lucide-react';

export default function ActivityLogs({ logs }) {
  if (logs.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
        <Activity className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-base font-semibold text-slate-300">No Activity Logs Yet</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
          Activity logs will stream in as the autonomous agent executes background cycles.
        </p>
      </div>
    );
  }

  const getEventIcon = (type) => {
    switch (type) {
      case 'APPLY':
        return <Send className="w-4 h-4 text-emerald-400" />;
      case 'SEARCH':
        return <Sparkles className="w-4 h-4 text-blue-400" />;
      case 'PROFILE_UPDATE':
        return <User className="w-4 h-4 text-purple-400" />;
      case 'ERROR':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Activity className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>Autonomous Activity Feed</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {logs.length}
          </span>
        </h2>
        <span className="text-xs text-slate-500">Live background system events</span>
      </div>

      <div className="space-y-2.5">
        {logs.map((log) => {
          const time = new Date(log.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });

          return (
            <div
              key={log.id}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start justify-between gap-4 transition-all hover:bg-slate-900"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0 mt-0.5">
                  {getEventIcon(log.event_type)}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200">
                    {log.message}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 mt-1">
                    Event Type: {log.event_type}
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-500 font-mono whitespace-nowrap flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {time}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

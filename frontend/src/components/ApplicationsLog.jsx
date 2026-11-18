import React, { useState } from 'react';
import { 
  Send, 
  FileText, 
  Download, 
  ExternalLink, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Mail,
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';
import ApplicationDetailModal from './ApplicationDetailModal';

export default function ApplicationsLog({ applications }) {
  const [selectedApp, setSelectedApp] = useState(null);

  if (applications.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
        <Send className="w-12 h-12 text-slate-600 mx-auto mb-3" />
        <h3 className="text-base font-semibold text-slate-300">No Applications Sent Yet</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
          Run your autonomous agent or pick a job from the "Discovered Jobs" tab to tailor and dispatch your first application!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>Application History & Tailored Resumes</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {applications.length}
          </span>
        </h2>
        <span className="text-xs text-slate-500">
          All resumes dynamically tailored & emailed
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {applications.map((app) => {
          const appliedDate = new Date(app.applied_at).toLocaleDateString([], {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          return (
            <div
              key={app.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-bold text-white">
                    {app.job_title}
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    {app.company}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {appliedDate}
                  </span>

                  {app.contact_email && (
                    <span className="flex items-center gap-1 text-slate-400">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      HR: {app.contact_email}
                    </span>
                  )}

                  {app.sent_to_recruiter && (
                    <span className="text-emerald-400 font-medium flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      Sent to HR
                    </span>
                  )}

                  {app.user_notified && (
                    <span className="text-blue-400 font-medium flex items-center gap-1 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                      <Mail className="w-3 h-3" />
                      Alert Sent to You
                    </span>
                  )}
                </div>
              </div>

              {/* ATS Badge & Actions */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                <div className="flex flex-col items-end">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase">
                    ATS Match
                  </div>
                  <div className="text-lg font-black text-emerald-400">
                    {app.ats_score}%
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Inspect Details */}
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Resume & Email</span>
                  </button>

                  {/* PDF Download */}
                  {app.pdf_filename && (
                    <a
                      href={`/api/applications/${app.id}/resume-pdf`}
                      download={app.pdf_filename}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 transition-all"
                      title="Download Tailored ATS PDF Resume"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedApp && (
        <ApplicationDetailModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  );
}

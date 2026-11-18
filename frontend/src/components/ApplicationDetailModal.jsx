import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Mail, 
  Download, 
  Building2, 
  Calendar, 
  CheckCircle, 
  Copy,
  Check
} from 'lucide-react';

export default function ApplicationDetailModal({ application, onClose }) {
  const [activeTab, setActiveTab] = useState('resume');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(`Subject: ${application.email_subject}\n\n${application.email_body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 max-h-[90vh] flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ATS Score: {application.ats_score}%
              </span>
              <span className="text-xs text-slate-400">
                {application.status}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              {application.job_title}
            </h2>
            <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
              <span>{application.company}</span>
              {application.contact_email && (
                <>
                  <span>&bull;</span>
                  <span>HR: {application.contact_email}</span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-2 pt-4 pb-2">
          <button
            onClick={() => setActiveTab('resume')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'resume'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Tailored ATS Resume</span>
          </button>

          <button
            onClick={() => setActiveTab('email')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'email'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white bg-slate-800/60'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Cold Outreach Email</span>
          </button>

          {application.pdf_filename && (
            <a
              href={`/api/applications/${application.id}/resume-pdf`}
              download={application.pdf_filename}
              target="_blank"
              rel="noreferrer"
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          )}
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto my-2 rounded-xl border border-slate-800 bg-slate-950 p-4">
          {activeTab === 'resume' ? (
            <div className="space-y-3">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                Dynamic ATS-Optimized Resume Text
              </div>
              <pre className="text-xs text-slate-200 whitespace-pre-wrap font-mono leading-relaxed select-text">
                {application.tailored_resume_text || 'No resume text recorded.'}
              </pre>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                  Dispatched Email Message
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                </button>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
                <div className="text-slate-400 mb-1">
                  <strong>Subject:</strong> {application.email_subject}
                </div>
                <div className="text-slate-400">
                  <strong>To:</strong> {application.contact_email || 'Career Portal Application'}
                </div>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
                {application.email_body}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-xs text-slate-500">
          <span>Applied on {new Date(application.applied_at).toLocaleString()}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

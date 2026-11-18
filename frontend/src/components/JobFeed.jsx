import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ExternalLink, 
  Sparkles, 
  Mail, 
  Search, 
  Filter, 
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function JobFeed({ 
  jobs, 
  onApplySingle, 
  applyingJobId, 
  appliedJobIds, 
  onRefreshJobs, 
  isRefreshing 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('ALL');
  const [activeJobModal, setActiveJobModal] = useState(null);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.extracted_keywords || []).some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPlatform = 
      selectedPlatform === 'ALL' || 
      job.platform.toLowerCase().includes(selectedPlatform.toLowerCase());

    return matchesSearch && matchesPlatform;
  });

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by role, company, skills (e.g. React, Python, SDE)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Platform Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'LinkedIn', 'Naukri', 'Remote'].map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPlatform(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedPlatform === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={onRefreshJobs}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 active:scale-95 transition-all"
            title="Scan for new jobs now"
          >
            <Sparkles className={`w-3.5 h-3.5 text-blue-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Scan Jobs</span>
          </button>
        </div>

      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-dashed border-slate-800">
          <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-300">No jobs matching your filter</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or click "Scan Jobs" to crawl fresh listings.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => {
            const isApplied = appliedJobIds.includes(job.id);
            const isApplying = applyingJobId === job.id;

            return (
              <div
                key={job.id}
                className="flex flex-col justify-between p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition-all hover:shadow-xl hover:shadow-blue-950/20 group"
              >
                <div>
                  
                  {/* Top Bar: Platform & Date */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                      job.platform.includes('LinkedIn') 
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                        : job.platform.includes('Naukri')
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {job.platform}
                    </span>

                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {job.posted_date || 'Recent'}
                    </span>
                  </div>

                  {/* Role & Company */}
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1.5 mb-3 flex-wrap">
                    <span className="flex items-center gap-1 font-medium text-slate-300">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {job.location}
                    </span>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {job.description}
                  </p>

                  {/* Extracted Keywords */}
                  {job.extracted_keywords && job.extracted_keywords.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap mb-4">
                      {job.extracted_keywords.slice(0, 4).map((kw, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Recruiter contact indicator */}
                  {job.contact_email && (
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-4 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                      <Mail className="w-3 h-3 text-emerald-400" />
                      <span className="truncate">HR Contact: {job.contact_email}</span>
                    </div>
                  )}

                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveJobModal(job)}
                    className="text-xs text-slate-400 hover:text-white font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>View JD</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <div className="flex items-center gap-2">
                    {job.job_url && (
                      <a
                        href={job.job_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                        title="View original listing"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      onClick={() => onApplySingle(job.id)}
                      disabled={isApplied || isApplying}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isApplied
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default'
                          : isApplying
                          ? 'bg-slate-700 text-slate-300 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/20 active:scale-95'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Applied</span>
                        </>
                      ) : isApplying ? (
                        <>
                          <Sparkles className="w-3.5 h-3.5 animate-spin" />
                          <span>Tailoring & Sending...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Tailor & Apply</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Job Detail Modal */}
      {activeJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  {activeJobModal.platform}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{activeJobModal.title}</h2>
                <div className="text-sm text-slate-400 mt-1 flex items-center gap-2">
                  <span>{activeJobModal.company}</span>
                  <span>&bull;</span>
                  <span>{activeJobModal.location}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveJobModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Job Description & Requirements
                </h4>
                <div className="bg-slate-950 p-4 rounded-xl text-xs text-slate-300 whitespace-pre-wrap leading-relaxed border border-slate-800">
                  {activeJobModal.description}
                </div>
              </div>

              {activeJobModal.contact_email && (
                <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl flex items-center justify-between text-xs text-blue-300">
                  <span><strong>Target HR / Hiring Email:</strong> {activeJobModal.contact_email}</span>
                  <span className="text-[10px] text-blue-400 font-medium">Automatic Cold Email Target</span>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800 pt-4 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveJobModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const id = activeJobModal.id;
                  setActiveJobModal(null);
                  onApplySingle(id);
                }}
                disabled={appliedJobIds.includes(activeJobModal.id) || applyingJobId === activeJobModal.id}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md active:scale-95"
              >
                Tailor Resume & Send Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

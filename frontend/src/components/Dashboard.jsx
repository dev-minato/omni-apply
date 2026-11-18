import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Briefcase, 
  Send, 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  Plus, 
  MapPin, 
  FileText, 
  LogOut, 
  Sliders, 
  Eye, 
  X,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import ResumeBuilder from './ResumeBuilder';

export default function Dashboard({ 
  user, 
  resumeData, 
  targetCompanies = [], 
  targetRoles = [], 
  locationPref,
  onUpdateResume,
  onSignOut,
  onBackToPreferences
}) {
  const [activeTab, setActiveTab] = useState('positions'); // 'positions' | 'companies' | 'applications'
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isUpdatingResume, setIsUpdatingResume] = useState(false);
  
  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCompany, setFilterCompany] = useState('all');

  // Application details modal
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [applyingJobId, setApplyingJobId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // New Company Modal
  const [isAddCompanyOpen, setIsAddCompanyOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [currentCompanies, setCurrentCompanies] = useState(
    targetCompanies.length > 0 ? targetCompanies : ['Google', 'Microsoft', 'Uber', 'Amazon', 'Stripe']
  );

  // Sample Generated Open Positions matching target criteria
  const [positions, setPositions] = useState([
    {
      id: 'job-1',
      title: 'Software Development Engineer - I (Full Stack)',
      company: 'Google',
      location: 'Bangalore, India &bull; Hybrid',
      type: 'Full-time',
      salary: '₹24L - ₹32L',
      matchScore: 98,
      posted: '2 hours ago',
      skillsMatched: ['React', 'Node.js', 'Distributed Systems', 'MongoDB', 'Redis'],
      description: 'Looking for early-career software engineers to build reliable web and cloud infrastructure for Google Cloud products.',
      applied: false
    },
    {
      id: 'job-2',
      title: 'Backend Engineer - Platform & APIs',
      company: 'Uber',
      location: 'Bangalore, India &bull; Remote Friendly',
      type: 'Full-time',
      salary: '₹26L - ₹36L',
      matchScore: 96,
      posted: '4 hours ago',
      skillsMatched: ['Node.js', 'Redis caching', 'API Architecture', 'Fastify', 'System Design'],
      description: 'Join the Core Logistics routing and marketplace dispatch engine. Architect low-latency microservices handling millions of events daily.',
      applied: true,
      appliedDate: 'Nov 18, 2026'
    },
    {
      id: 'job-3',
      title: 'Software Engineer - Azure Developer Experience',
      company: 'Microsoft',
      location: 'Hyderabad, India',
      type: 'Full-time',
      salary: '₹22L - ₹30L',
      matchScore: 95,
      posted: '1 day ago',
      skillsMatched: ['TypeScript', 'React.js', 'Docker', 'AWS/Azure', 'RESTful APIs'],
      description: 'Build cutting-edge cloud developer tooling, CLI components, and developer portal workflows.',
      applied: false
    },
    {
      id: 'job-4',
      title: 'SDE-1 (Amazon Web Services)',
      company: 'Amazon',
      location: 'Bangalore, India',
      type: 'Full-time',
      salary: '₹25L - ₹34L',
      matchScore: 94,
      posted: '1 day ago',
      skillsMatched: ['Data Structures & Algorithms', 'Node.js', 'PostgreSQL', 'High Availability'],
      description: 'Work on distributed key-value storage, caching layers, and high-throughput transaction backends.',
      applied: false
    },
    {
      id: 'job-5',
      title: 'Product Engineer - Payments Infrastructure',
      company: 'Stripe',
      location: 'Remote (Worldwide / India)',
      type: 'Full-time',
      salary: '₹35L - ₹48L',
      matchScore: 97,
      posted: 'Just now',
      skillsMatched: ['TypeScript', 'Node.js', 'System Architecture', 'Fintech APIs'],
      description: 'Design resilient billing engines, developer SDKs, and payment gateway APIs with extreme fault tolerance.',
      applied: true,
      appliedDate: 'Nov 17, 2026'
    }
  ]);

  // Tracked Applications
  const [applications, setApplications] = useState([
    {
      id: 'app-1',
      company: 'Uber',
      role: 'Backend Engineer - Platform & APIs',
      stage: 'Interview Scheduled',
      stageColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      appliedDate: 'Nov 18, 2026',
      atsScore: 96,
      nextStep: 'Technical Round 1: Distributed Caching & System Design (Nov 21, 2026)'
    },
    {
      id: 'app-2',
      company: 'Stripe',
      role: 'Product Engineer - Payments Infrastructure',
      stage: 'Under Review',
      stageColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      appliedDate: 'Nov 17, 2026',
      atsScore: 97,
      nextStep: 'Recruiter Screening In Progress'
    },
    {
      id: 'app-3',
      company: 'Atlassian',
      role: 'Software Engineer - Jira Cloud Frontend',
      stage: 'Applied',
      stageColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      appliedDate: 'Nov 16, 2026',
      atsScore: 93,
      nextStep: 'Application successfully received by ATS'
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleApply = (job) => {
    setApplyingJobId(job.id);
    setTimeout(() => {
      setApplyingJobId(null);
      // Mark as applied
      setPositions(prev => prev.map(p => p.id === job.id ? { ...p, applied: true, appliedDate: 'Just now' } : p));
      
      // Add to applications pipeline
      const newApp = {
        id: `app-${Date.now()}`,
        company: job.company,
        role: job.title,
        stage: 'Applied',
        stageColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
        appliedDate: 'Just now',
        atsScore: job.matchScore,
        nextStep: 'Dispatched tailored resume & cover letter to recruiter inbox.'
      };
      setApplications(prev => [newApp, ...prev]);

      showToast(`Successfully applied to ${job.title} at ${job.company}!`);
    }, 1000);
  };

  const handleAddNewCompany = (e) => {
    e.preventDefault();
    if (!newCompanyName.trim()) return;
    const clean = newCompanyName.trim();
    if (!currentCompanies.includes(clean)) {
      setCurrentCompanies([...currentCompanies, clean]);
      showToast(`Added ${clean} to your targeted company radar!`);
    }
    setNewCompanyName('');
    setIsAddCompanyOpen(false);
  };

  const filteredPositions = positions.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.skillsMatched.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCompany = filterCompany === 'all' || p.company.toLowerCase() === filterCompany.toLowerCase();
    return matchesSearch && matchesCompany;
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-semibold text-white shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/90 bg-black/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Navigation Tabs */}
          <div className="flex items-center gap-8">
            <div className="flex items-center space-x-2.5 cursor-pointer">
              <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-black text-base shadow-sm">
                ▲
              </div>
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                OmniApply <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">Hub</span>
              </span>
            </div>

            {/* 3 Main Requested Tabs: Open Positions, Companies, Applications */}
            <nav className="hidden md:flex items-center space-x-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('positions')}
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'positions'
                    ? 'bg-zinc-800 text-white border border-zinc-700'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Open Positions</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-zinc-900 text-zinc-300 font-mono">
                  {positions.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('companies')}
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'companies'
                    ? 'bg-zinc-800 text-white border border-zinc-700'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Companies</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-zinc-900 text-zinc-300 font-mono">
                  {currentCompanies.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('applications')}
                className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  activeTab === 'applications'
                    ? 'bg-zinc-800 text-white border border-zinc-700'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>Applications</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-zinc-900 text-zinc-300 font-mono">
                  {applications.length}
                </span>
              </button>
            </nav>
          </div>

          {/* Right: Account Icon & Dropdown Menu */}
          <div className="relative">
            <button
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              className="flex items-center gap-2.5 p-1.5 pl-3 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-850 hover:border-zinc-700 transition-all text-xs"
            >
              <div className="text-right hidden sm:block">
                <p className="font-bold text-white leading-tight">
                  {resumeData?.personalInfo?.fullName || user?.name || 'Aarav Sharma'}
                </p>
                <p className="text-[10px] font-mono text-zinc-400 leading-tight">
                  {resumeData?.personalInfo?.jobTitle || 'SWE Candidate'}
                </p>
              </div>

              {/* User Avatar */}
              <div className="w-8 h-8 rounded-lg bg-zinc-100 text-black flex items-center justify-center font-extrabold text-xs shadow-sm">
                {(resumeData?.personalInfo?.fullName || user?.name || 'A')[0].toUpperCase()}
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Account Dropdown Menu */}
            {isAccountMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3 border-b border-zinc-800/80">
                  <p className="text-xs font-bold text-white">
                    {resumeData?.personalInfo?.fullName || user?.name || 'Aarav Sharma'}
                  </p>
                  <p className="text-[11px] font-mono text-zinc-400 truncate">
                    {resumeData?.personalInfo?.email || user?.email || 'candidate@example.com'}
                  </p>
                </div>

                <div className="py-1">
                  {/* UPDATE RESUME OPTION AS REQUESTED */}
                  <button
                    onClick={() => {
                      setIsAccountMenuOpen(false);
                      setIsUpdatingResume(true);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-white hover:bg-zinc-900 transition-colors flex items-center gap-2.5 group"
                  >
                    <FileText className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                    <span>Update Resume</span>
                    <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                      Live ATS
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAccountMenuOpen(false);
                      onBackToPreferences?.();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors flex items-center gap-2.5"
                  >
                    <Sliders className="w-4 h-4 text-zinc-400" />
                    <span>Target Preferences</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-zinc-800/80">
                  <button
                    onClick={() => {
                      setIsAccountMenuOpen(false);
                      onSignOut?.();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2.5"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Mobile Navigation Tabs */}
        <div className="flex md:hidden border-t border-zinc-800 px-4 py-2 gap-2 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('positions')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'positions' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
          >
            Open Positions ({positions.length})
          </button>
          <button
            onClick={() => setActiveTab('companies')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'companies' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
          >
            Companies ({currentCompanies.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'applications' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
          >
            Applications ({applications.length})
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* STATS OVERVIEW BAR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Target Roles</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-bold text-white">{targetRoles.length > 0 ? targetRoles[0] : 'Full Stack'}</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">Live</span>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Target Companies</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-bold text-white font-mono">{currentCompanies.length}</span>
              <span className="text-xs font-mono text-zinc-400">Tracked</span>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">High-Match Openings</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-bold text-white font-mono">{positions.length}</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold">&gt;94% ATS</span>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">Active Applications</span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-bold text-white font-mono">{applications.length}</span>
              <span className="text-xs font-mono text-purple-400 font-semibold">1 Interview</span>
            </div>
          </div>
        </div>

        {/* TAB 1: OPEN POSITIONS */}
        {activeTab === 'positions' && (
          <div className="space-y-6">
            
            {/* Search & Filters */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search open positions by role, company, or tech stack (e.g. Node.js, Redis)..."
                  className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={filterCompany}
                  onChange={(e) => setFilterCompany(e.target.value)}
                  className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-white"
                >
                  <option value="all">All Companies</option>
                  {currentCompanies.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <button
                  onClick={() => setIsUpdatingResume(true)}
                  className="px-3 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 shrink-0"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Tailor Resume</span>
                </button>
              </div>
            </div>

            {/* Position Cards Grid */}
            <div className="space-y-4">
              {filteredPositions.map((job) => (
                <div
                  key={job.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 hover:border-zinc-700 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-white text-base shrink-0">
                        {job.company.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-base sm:text-lg font-bold text-white">{job.title}</h3>
                          <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                            {job.matchScore}% ATS Match
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 font-mono">
                          <span className="text-white font-semibold">{job.company}</span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-zinc-500" />
                            {job.location}
                          </span>
                          <span>&bull;</span>
                          <span>{job.salary}</span>
                          <span>&bull;</span>
                          <span className="text-zinc-500">{job.posted}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center gap-2 shrink-0">
                      {job.applied ? (
                        <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Applied {job.appliedDate}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleApply(job)}
                          disabled={applyingJobId === job.id}
                          className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-md active:scale-95 disabled:opacity-50"
                        >
                          {applyingJobId === job.id ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Tailoring & Applying...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>1-Click Apply</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 mb-4 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Skills Matched Chips */}
                  <div className="pt-3 border-t border-zinc-900 flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="text-zinc-500 font-mono text-[11px] mr-1">Matched Skills:</span>
                    {job.skillsMatched.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-zinc-900 text-zinc-300 border border-zinc-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 2: COMPANIES */}
        {activeTab === 'companies' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Targeted Tech Companies</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Our autonomous scrapers monitor the verified career endpoints for these companies.
                </p>
              </div>

              <button
                onClick={() => setIsAddCompanyOpen(true)}
                className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-md self-start"
              >
                <Plus className="w-4 h-4" />
                Add Target Company
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentCompanies.map((cName) => (
                <div
                  key={cName}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-white text-sm">
                          {cName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white">{cName}</h4>
                          <span className="text-xs font-mono text-zinc-400">Careers Scraper: Active</span>
                        </div>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    <div className="space-y-1.5 text-xs text-zinc-400 font-mono mb-4">
                      <div className="flex justify-between">
                        <span>Openings Indexed:</span>
                        <span className="text-white font-bold">12 Active Roles</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Scraped:</span>
                        <span className="text-zinc-500">14 mins ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ATS Match Range:</span>
                        <span className="text-emerald-400 font-semibold">92% - 98%</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        setFilterCompany(cName);
                        setActiveTab('positions');
                      }}
                      className="text-white hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>View Openings</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono text-zinc-500">Tier 1 Target</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: APPLICATIONS */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Application Pipeline & Tracking</h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Track the real-time status of all autonomous submissions and interview stages.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-white text-sm shrink-0">
                      {app.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="text-base font-bold text-white">{app.role}</h4>
                        <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${app.stageColor}`}>
                          {app.stage}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 font-mono">
                        Company: <span className="text-white font-semibold">{app.company}</span> &bull; Applied: {app.appliedDate} &bull; ATS Score: <span className="text-emerald-400 font-bold">{app.atsScore}%</span>
                      </p>
                      <p className="text-xs text-zinc-300 mt-1.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{app.nextStep}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setIsUpdatingResume(true)}
                      className="px-3.5 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-300 hover:text-white transition-all flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Tailored Resume</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* MODAL: UPDATE RESUME (FULL SCREEN OR MODAL OVERLAY) */}
      {isUpdatingResume && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-95 backdrop-blur-md p-2 sm:p-6">
          <div className="relative max-w-7xl mx-auto rounded-3xl border border-zinc-800 bg-black p-4 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsUpdatingResume(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <ResumeBuilder
              initialData={resumeData}
              isModal={true}
              onCloseModal={() => setIsUpdatingResume(false)}
              onSaveAndContinue={(updated) => {
                onUpdateResume?.(updated);
                setIsUpdatingResume(false);
                showToast('Master ATS Resume updated successfully!');
              }}
            />
          </div>
        </div>
      )}

      {/* MODAL: ADD COMPANY */}
      {isAddCompanyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-zinc-400" />
                Add Target Company
              </h3>
              <button
                onClick={() => setIsAddCompanyOpen(false)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddNewCompany} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  placeholder="e.g. Netflix, Snowflake, Palantir, Datadog..."
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddCompanyOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all shadow-md active:scale-95"
                >
                  Add to Radar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Terminal, 
  Target, 
  Send, 
  ShieldCheck, 
  ChevronRight, 
  Layers, 
  Zap, 
  Code2, 
  Building2, 
  Globe, 
  Briefcase,
  Star,
  FileText
} from 'lucide-react';

export default function LandingPage({ onStartFree, onLogin }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { label: 'Active Students & Grads', value: '50K+' },
    { label: 'Daily Jobs Scanned', value: '25,000+' },
    { label: 'Average ATS Score', value: '98.4%' },
    { label: 'Application Time Saved', value: '60%' },
  ];

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-white" />,
      title: "Real-time ATS Resume Engine",
      description: "Build an industry-standard ATS resume with an interactive live preview. Auto-tailor bullet points to target job descriptions instantly.",
      badge: "AI Powered"
    },
    {
      icon: <Target className="w-6 h-6 text-white" />,
      title: "Precision Company Radar",
      description: "Select dream tech companies — from Google to high-growth YC startups. Our scrapers monitor verified career endpoints 24/7.",
      badge: "Zero Spam"
    },
    {
      icon: <Send className="w-6 h-6 text-white" />,
      title: "Autonomous 1-Click Dispatch",
      description: "Generate tailored cover letters and optimized resumes. Apply across multiple openings with full audit logging and tracking.",
      badge: "High Conversion"
    },
    {
      icon: <Layers className="w-6 h-6 text-white" />,
      title: "Live Application Pipeline",
      description: "Track all your submissions across Applied, Under Review, and Interview stages with automated status detection.",
      badge: "Full Transparency"
    }
  ];

  const useCases = [
    {
      tag: "Final Year & Pre-Final",
      title: "College Placement & Off-Campus Prep",
      desc: "For CS and engineering students targeting off-campus software engineering roles, DSA internships, and graduate programs without relying solely on college placement cells.",
      highlight: "Includes pre-configured DSA roadmaps, coding profile integrations & high-yield templates."
    },
    {
      tag: "Early Career (0-2 YOE)",
      title: "Fresh Graduates & Junior Engineers",
      desc: "Break out of entry-level application black holes. OmniApply matches your exact projects and tech stack with high-intent hiring teams.",
      highlight: "Highlights GitHub repos, tech stack keywords, and impactful project metrics."
    },
    {
      tag: "Career Switchers",
      title: "Bootcamp & Self-Taught Devs",
      desc: "Translate real-world projects and certifications into recruiter-approved ATS resumes that pass automated screening filters every single time.",
      highlight: "AI rewrites bullet points to emphasize architectural ownership and business outcomes."
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Build Live ATS Resume",
      desc: "Enter your personal info, projects, and work experience. Watch your ATS-compliant document update in real time with our live preview."
    },
    {
      num: "02",
      title: "Select Target Companies & Roles",
      desc: "Specify target firms like Google, Microsoft, Uber, or fast-growing unicorns, and lock in your focused engineering roles."
    },
    {
      num: "03",
      title: "Define Location & Import Data",
      desc: "Choose specific cities or mark open to relocate. Optionally drop your LinkedIn archive for instant 1-click import."
    },
    {
      num: "04",
      title: "Launch Autonomous Job Radar",
      desc: "Access your dashboard to view high-match open positions, inspect company pipelines, and dispatch tailored applications effortlessly."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Glow ambient background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-zinc-800/20 via-zinc-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-black font-extrabold text-lg shadow-sm">
              ▲
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                OmniApply <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">AI</span>
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
            <a href="#product" className="hover:text-white transition-colors">Product</a>
            <a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#stats" className="hover:text-white transition-colors">Metrics</a>
          </nav>

          <div className="flex items-center space-x-3">
            <button 
              onClick={onLogin}
              className="text-sm font-medium text-zinc-300 hover:text-white px-3.5 py-2 transition-colors"
            >
              Log In
            </button>
            <button 
              onClick={onStartFree}
              className="text-sm font-semibold bg-white text-black hover:bg-zinc-200 px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              Start Free
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs text-zinc-300 mb-8 backdrop-blur-md hover:border-zinc-700 transition-colors cursor-default">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Next-Gen Autonomous Career Platform</span>
            <span className="text-zinc-500">•</span>
            <span className="text-white font-medium flex items-center gap-1">
              Octupie-Grade Dark UI <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Land Your Dream Engineering Role <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              On Complete Autopilot.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 mb-10 leading-relaxed">
            Build your live ATS resume with real-time preview, select target tech giants and fast-growing startups, and let autonomous agents search, tailor, and track your applications.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button 
              onClick={onStartFree}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white text-black font-semibold text-base hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 group"
            >
              Start Free Today
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onLogin}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 font-medium text-base transition-all flex items-center justify-center gap-2"
            >
              Already Have an Account?
            </button>
          </div>

          {/* Hero Bento Visual Preview */}
          <div className="relative mx-auto rounded-2xl border border-zinc-800 bg-zinc-950/80 p-2 sm:p-4 shadow-2xl backdrop-blur-md">
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 sm:p-6 text-left">
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  <span className="ml-2 font-mono text-xs text-zinc-400">omniapply // live-radar-matrix.app</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Radar Live: 25 Target Companies
                  </span>
                </div>
              </div>

              {/* Bento Grid Teaser */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Column 1: Live Profile Card */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">ATS Score</span>
                    <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-400/10 border border-emerald-400/20">98 / 100</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Full Stack / Backend Engineer</h4>
                  <p className="text-xs text-zinc-400 line-clamp-2 mb-3">Node.js, React, Redis caching, microservices architecture, MongoDB...</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400">
                      <span>Keywords Matched</span>
                      <span className="text-white font-mono">24/25</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-white h-full rounded-full" style={{ width: '96%' }} />
                    </div>
                  </div>
                </div>

                {/* Column 2: Target Companies Radar */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Target Radar</span>
                    <span className="text-xs font-mono text-zinc-400">Direct Scrape</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs p-1.5 rounded bg-zinc-800/60 border border-zinc-700/40">
                      <span className="font-semibold text-white">Google</span>
                      <span className="text-[11px] font-mono text-zinc-400">14 Roles Matching</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-1.5 rounded bg-zinc-800/60 border border-zinc-700/40">
                      <span className="font-semibold text-white">Uber</span>
                      <span className="text-[11px] font-mono text-zinc-400">8 Roles Matching</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-1.5 rounded bg-zinc-800/60 border border-zinc-700/40">
                      <span className="font-semibold text-white">Stripe</span>
                      <span className="text-[11px] font-mono text-zinc-400">6 Roles Matching</span>
                    </div>
                  </div>
                </div>

                {/* Column 3: Live Dispatch */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/90 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Dispatch Status</span>
                      <span className="text-[10px] font-mono text-emerald-400">Active</span>
                    </div>
                    <p className="text-xs text-zinc-300 mb-2 font-mono">Last Action: Tailored resume & cover letter sent to Uber SWE-1 (Bangalore / Remote)</p>
                  </div>
                  <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Response Rate</span>
                    <span className="font-bold text-white">+38% vs Manual</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Counter Section */}
      <section id="stats" className="border-y border-zinc-800 bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">{item.value}</p>
                <p className="text-xs sm:text-sm text-zinc-400 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="product" className="py-24 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900">
              Product Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4 mb-4">
              Engineered for Speed, Precision, and Results
            </h2>
            <p className="text-zinc-400 text-base">
              Say goodbye to repetitive copy-pasting and keyword guessing. OmniApply brings autonomous intelligence to every phase of job hunting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="group relative rounded-2xl border border-zinc-800 bg-zinc-950/60 p-8 hover:border-zinc-700 transition-all hover:bg-zinc-900/40"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <span className="text-xs font-mono text-zinc-400 px-2.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/80">
                    {feature.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-24 border-b border-zinc-800 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900">
              Tailored For You
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4 mb-4">
              Built for Every Stage of Your Tech Journey
            </h2>
            <p className="text-zinc-400 text-base">
              Whether you are gearing up for off-campus college placements or switching into high-paying engineering roles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((uc, idx) => (
              <div 
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 hover:border-zinc-700 transition-all"
              >
                <div>
                  <div className="text-xs font-mono text-zinc-400 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 inline-block mb-4">
                    {uc.tag}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {uc.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {uc.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-900 text-xs text-zinc-300 font-mono flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <span>{uc.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 border-b border-zinc-800 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900">
              Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-4 mb-4">
              How OmniApply Operates
            </h2>
            <p className="text-zinc-400 text-base">
              From raw resume details to high-conversion automated applications in four simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st, idx) => (
              <div 
                key={idx}
                className="relative rounded-2xl border border-zinc-800 bg-black/60 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-black font-mono text-zinc-600 mb-4">
                    {st.num}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-zinc-300">
                  <span>Step {idx + 1}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-24 bg-black relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950 p-10 sm:p-16">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Ready to Accelerate Your Career?
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-zinc-400 mb-8 leading-relaxed">
              Join thousands of engineering students and developers landing interviews with the leading tech companies. Setup takes less than 3 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onStartFree}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-black font-bold text-base hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                Start Free Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-4 text-xs text-zinc-500">
              No credit card required &bull; 100% Free for College Students
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black py-12 text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded bg-white text-black flex items-center justify-center font-bold text-xs">
              ▲
            </div>
            <span className="font-semibold text-zinc-300">OmniApply AI &copy; 2026</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-400">
            <a href="#product" className="hover:text-white transition-colors">Product</a>
            <a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <button onClick={onLogin} className="hover:text-white transition-colors">Log In</button>
            <button onClick={onStartFree} className="hover:text-white transition-colors">Sign Up</button>
          </div>

          <p className="text-zinc-600">
            Engineered with modern black/gray/white minimalism.
          </p>
        </div>
      </footer>
    </div>
  );
}

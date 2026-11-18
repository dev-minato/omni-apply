import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  Check, 
  X, 
  ChevronRight, 
  Sparkles,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const COMMON_COMPANIES = [
  { name: 'Google', category: 'Big Tech', hiresFor: 'SWE, AI/ML, Cloud', tier: 'Tier 1' },
  { name: 'Microsoft', category: 'Big Tech', hiresFor: 'Full Stack, Azure, Systems', tier: 'Tier 1' },
  { name: 'Amazon', category: 'Big Tech', hiresFor: 'SDE-1, AWS, Backend', tier: 'Tier 1' },
  { name: 'Uber', category: 'Ride-sharing & Logistics', hiresFor: 'Distributed Systems, Backend', tier: 'Tier 1' },
  { name: 'Stripe', category: 'Fintech & Infrastructure', hiresFor: 'Payments, API Platform', tier: 'Tier 1' },
  { name: 'Atlassian', category: 'Enterprise SaaS', hiresFor: 'Frontend, Cloud Services', tier: 'Tier 1' },
  { name: 'Meta', category: 'Social & AI', hiresFor: 'Product SWE, Systems, AI', tier: 'Tier 1' },
  { name: 'Apple', category: 'Hardware & OS', hiresFor: 'Swift, CoreOS, Backend', tier: 'Tier 1' },
  { name: 'Netflix', category: 'Streaming & Cloud', hiresFor: 'Microservices, Data Infra', tier: 'Tier 1' },
  { name: 'Nvidia', category: 'AI & GPU Systems', hiresFor: 'CUDA, AI Systems, Drivers', tier: 'Tier 1' },
  { name: 'Snowflake', category: 'Cloud Data Platform', hiresFor: 'Database Kernel, Query Engine', tier: 'Tier 1' },
  { name: 'Salesforce', category: 'Enterprise SaaS', hiresFor: 'Platform, Lightning, Java', tier: 'Tier 1' },
  { name: 'Adobe', category: 'Creative Cloud & AI', hiresFor: 'C++, WebAssembly, Full Stack', tier: 'Tier 1' },
  { name: 'Goldman Sachs', category: 'Investment Banking Tech', hiresFor: 'Financial Systems, Java, C++', tier: 'Fintech' },
  { name: 'Airbnb', category: 'Travel Marketplace', hiresFor: 'Full Stack, Mobile, Infrastructure', tier: 'Tier 1' },
  { name: 'Razorpay', category: 'Fintech Unicorn', hiresFor: 'Backend, Distributed Systems', tier: 'Fintech' },
  { name: 'Swiggy', category: 'Hyperlocal Logistics', hiresFor: 'Golang, High QPS Systems', tier: 'Unicorn' },
  { name: 'Postman', category: 'API Platform', hiresFor: 'Node.js, Electron, Protocols', tier: 'Product' }
];

export default function TargetCompaniesStep({ selected = [], onContinue, onBack }) {
  const [selectedCompanies, setSelectedCompanies] = useState(
    selected.length > 0 ? selected : ['Google', 'Microsoft', 'Uber', 'Amazon']
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Big Tech', 'Fintech & Infrastructure', 'Enterprise SaaS', 'Unicorn'];

  const filteredCompanies = COMMON_COMPANIES.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.hiresFor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const isCustomCompanyAvailable = searchQuery.trim() && 
    !COMMON_COMPANIES.some(c => c.name.toLowerCase() === searchQuery.trim().toLowerCase()) &&
    !selectedCompanies.some(c => c.toLowerCase() === searchQuery.trim().toLowerCase());

  const toggleCompany = (companyName) => {
    if (selectedCompanies.includes(companyName)) {
      setSelectedCompanies(selectedCompanies.filter(c => c !== companyName));
    } else {
      setSelectedCompanies([...selectedCompanies, companyName]);
    }
  };

  const handleAddCustomCompany = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const cleanName = searchQuery.trim();
    if (!selectedCompanies.includes(cleanName)) {
      setSelectedCompanies([...selectedCompanies, cleanName]);
    }
    setSearchQuery('');
  };

  const handleSelectAllCommon = () => {
    const allNames = COMMON_COMPANIES.map(c => c.name);
    setSelectedCompanies(Array.from(new Set([...selectedCompanies, ...allNames])));
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                Step 2 of 5
              </span>
              <span className="text-xs text-zinc-400">&bull; Target Company Selection</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Where Do You Want to Work?
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Select from common tech recruiters or search and add any dream company to your autonomous radar.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Back
              </button>
            )}
            <button
              onClick={() => onContinue(selectedCompanies)}
              disabled={selectedCompanies.length === 0}
              className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs sm:text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg disabled:opacity-40 active:scale-95"
            >
              <span>Continue ({selectedCompanies.length})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Bar & Custom Add */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 mb-8">
          <form onSubmit={handleAddCustomCompany} className="relative flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any company (e.g. Datadog, Palantir, Coinbase) or press Enter to add..."
                className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
              />
            </div>
            {isCustomCompanyAvailable && (
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-zinc-100 text-black font-bold text-xs hover:bg-white transition-all flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                Add "{searchQuery.trim()}"
              </button>
            )}
          </form>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-4 border-t border-zinc-900 text-xs">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    activeCategory === cat 
                      ? 'bg-white text-black font-semibold' 
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={handleSelectAllCommon}
              className="text-xs text-zinc-400 hover:text-white underline underline-offset-2"
            >
              Select All Recommended
            </button>
          </div>
        </div>

        {/* Selected Companies Tray */}
        {selectedCompanies.length > 0 && (
          <div className="mb-8 p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Active Target Radar ({selectedCompanies.length} companies targeted):
              </span>
              <button 
                onClick={() => setSelectedCompanies([])}
                className="text-zinc-500 hover:text-red-400 text-[11px]"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedCompanies.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-zinc-800 text-white border border-zinc-700"
                >
                  <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                  {name}
                  <button
                    onClick={() => toggleCompany(name)}
                    className="text-zinc-400 hover:text-white ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Common Companies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {filteredCompanies.map((company) => {
            const isSelected = selectedCompanies.includes(company.name);
            return (
              <div
                key={company.name}
                onClick={() => toggleCompany(company.name)}
                className={`cursor-pointer rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-white bg-zinc-900 shadow-md ring-1 ring-white/20'
                    : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700 hover:bg-zinc-900/40'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        isSelected ? 'bg-white text-black' : 'bg-zinc-900 border border-zinc-800 text-zinc-200'
                      }`}>
                        {company.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white tracking-tight">{company.name}</h4>
                        <span className="text-[11px] font-mono text-zinc-400">{company.category}</span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-white text-black' : 'border border-zinc-700 text-transparent'
                    }`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-1 mb-2">
                    <span className="text-zinc-500 font-mono">Hires for:</span> {company.hiresFor}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span>{company.tier}</span>
                  <span className={isSelected ? 'text-emerald-400 font-semibold' : 'text-zinc-500'}>
                    {isSelected ? '✓ On Radar' : '+ Click to add'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
          <p className="text-xs text-zinc-500 font-mono">
            Autonomous scraper checks open positions every 15 minutes.
          </p>

          <button
            onClick={() => onContinue(selectedCompanies)}
            disabled={selectedCompanies.length === 0}
            className="px-8 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-xl disabled:opacity-40 active:scale-95"
          >
            <span>Proceed to Role Focus</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

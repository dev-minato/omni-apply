import React, { useState } from 'react';
import { 
  Briefcase, 
  Check, 
  Plus, 
  X, 
  ChevronRight, 
  Code, 
  Terminal, 
  Cpu, 
  Layers, 
  Server, 
  Smartphone, 
  Shield, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const COMMON_ROLES = [
  {
    id: 'fullstack',
    title: 'Full Stack Engineer',
    skills: 'React, Node.js, TypeScript, REST & GraphQL',
    demand: 'High Demand',
    icon: <Layers className="w-5 h-5 text-white" />
  },
  {
    id: 'frontend',
    title: 'Frontend Engineer',
    skills: 'Next.js, Vue, Tailwind, Web Performance, State Management',
    demand: 'Very High',
    icon: <Code className="w-5 h-5 text-white" />
  },
  {
    id: 'backend',
    title: 'Backend Engineer',
    skills: 'Go, Java/Spring, Node.js, PostgreSQL, Redis, Microservices',
    demand: 'High Demand',
    icon: <Server className="w-5 h-5 text-white" />
  },
  {
    id: 'aiml',
    title: 'AI / Machine Learning Engineer',
    skills: 'Python, PyTorch, LLMs, Vector DBs, Agents, HuggingFace',
    demand: 'Surging Demand',
    icon: <Cpu className="w-5 h-5 text-white" />
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud Engineer',
    skills: 'AWS, Docker, Kubernetes, CI/CD, Terraform, Prometheus',
    demand: 'Stable',
    icon: <Terminal className="w-5 h-5 text-white" />
  },
  {
    id: 'data',
    title: 'Data Engineer / Scientist',
    skills: 'Python, Spark, Snowflake, Airflow, SQL Analytics',
    demand: 'High Demand',
    icon: <Layers className="w-5 h-5 text-white" />
  },
  {
    id: 'mobile',
    title: 'Mobile App Developer',
    skills: 'React Native, Flutter, Swift, Kotlin, iOS/Android SDKs',
    demand: 'Steady',
    icon: <Smartphone className="w-5 h-5 text-white" />
  },
  {
    id: 'sdet',
    title: 'Software Development Engineer in Test (SDET)',
    skills: 'Playwright, Cypress, Selenium, API Automation, PyTest',
    demand: 'High Demand',
    icon: <Shield className="w-5 h-5 text-white" />
  },
  {
    id: 'pm',
    title: 'Associate Product Manager (APM)',
    skills: 'Product Discovery, Analytics, SQL, Agile Roadmaps',
    demand: 'Competitive',
    icon: <Briefcase className="w-5 h-5 text-white" />
  }
];

export default function TargetRolesStep({ selected = [], onContinue, onBack }) {
  const [selectedRoles, setSelectedRoles] = useState(
    selected.length > 0 ? selected : ['Full Stack Engineer', 'Backend Engineer']
  );
  const [customRoleInput, setCustomRoleInput] = useState('');

  const toggleRole = (title) => {
    if (selectedRoles.includes(title)) {
      setSelectedRoles(selectedRoles.filter(r => r !== title));
    } else {
      setSelectedRoles([...selectedRoles, title]);
    }
  };

  const handleAddCustomRole = (e) => {
    e.preventDefault();
    if (!customRoleInput.trim()) return;
    const clean = customRoleInput.trim();
    if (!selectedRoles.includes(clean)) {
      setSelectedRoles([...selectedRoles, clean]);
    }
    setCustomRoleInput('');
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                Step 3 of 5
              </span>
              <span className="text-xs text-zinc-400">&bull; Focused Job Roles</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Which Roles Are You Focused On?
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Our AI engine matches job requisitions and tailors resume keywords according to these selected titles.
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
              onClick={() => onContinue(selectedRoles)}
              disabled={selectedRoles.length === 0}
              className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs sm:text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg disabled:opacity-40 active:scale-95"
            >
              <span>Continue ({selectedRoles.length})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Selected Roles Bar */}
        {selectedRoles.length > 0 && (
          <div className="mb-8 p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Selected Roles ({selectedRoles.length}):
              </span>
              <button 
                onClick={() => setSelectedRoles([])}
                className="text-zinc-500 hover:text-red-400 text-[11px]"
              >
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedRoles.map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-zinc-800 text-white border border-zinc-700"
                >
                  <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
                  {role}
                  <button
                    onClick={() => toggleRole(role)}
                    className="text-zinc-400 hover:text-white ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Custom Role Input */}
        <form onSubmit={handleAddCustomRole} className="mb-8 flex gap-3">
          <input
            type="text"
            value={customRoleInput}
            onChange={(e) => setCustomRoleInput(e.target.value)}
            placeholder="Need a specific role? (e.g. Distributed Systems Engineer, Firmware Engineer, NLP Specialist)..."
            className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-zinc-100 text-black font-bold text-xs hover:bg-white transition-all flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Custom Role
          </button>
        </form>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {COMMON_ROLES.map((role) => {
            const isSelected = selectedRoles.includes(role.title);
            return (
              <div
                key={role.id}
                onClick={() => toggleRole(role.title)}
                className={`cursor-pointer rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-white bg-zinc-900 shadow-md ring-1 ring-white/20'
                    : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700 hover:bg-zinc-900/40'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-white text-black' : 'bg-zinc-900 border border-zinc-800'
                      }`}>
                        {React.cloneElement(role.icon, {
                          className: `w-5 h-5 ${isSelected ? 'text-black' : 'text-white'}`
                        })}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white tracking-tight">{role.title}</h4>
                        <span className="text-[11px] font-mono text-emerald-400">{role.demand}</span>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-white text-black' : 'border border-zinc-700 text-transparent'
                    }`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 mb-2">
                    <span className="text-zinc-500 font-mono">Key Stack:</span> {role.skills}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                  <span>ATS Match Engine</span>
                  <span className={isSelected ? 'text-white font-semibold' : 'text-zinc-500'}>
                    {isSelected ? '✓ Selected' : '+ Select Role'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
          <p className="text-xs text-zinc-500 font-mono">
            You can modify targeted roles anytime from your dashboard account settings.
          </p>

          <button
            onClick={() => onContinue(selectedRoles)}
            disabled={selectedRoles.length === 0}
            className="px-8 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-xl disabled:opacity-40 active:scale-95"
          >
            <span>Proceed to Location Preferences</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

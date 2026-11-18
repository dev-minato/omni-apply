import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  FolderGit2, 
  Award, 
  Plus, 
  Trash2, 
  ExternalLink, 
  Eye, 
  Printer, 
  Sparkles, 
  ChevronRight, 
  Globe, 
  FileText,
  CheckCircle2,
  Copy
} from 'lucide-react';

export default function ResumeBuilder({ initialData, onSaveAndContinue, isModal = false, onCloseModal }) {
  const [formData, setFormData] = useState(() => {
    return initialData || {
      personalInfo: {
        fullName: 'Aarav Sharma',
        jobTitle: 'Full Stack & AI Engineer',
        phone: '+91 98765 43210',
        email: 'aarav.sharma@example.com',
        linkedin: 'https://linkedin.com/in/aaravsharma-dev',
        github: 'https://github.com/aaravsharma-dev',
        portfolio: 'https://aaravsharma.dev',
        codingProfiles: [
          { platform: 'LeetCode', url: 'https://leetcode.com/aarav_sh' },
          { platform: 'Codeforces', url: 'https://codeforces.com/profile/aarav_sh' }
        ]
      },
      summary: 'Results-driven Full Stack Engineer with strong foundations in distributed backend systems, AI orchestration, and low-latency cloud architectures. Proven track record building student and developer platforms serving 50K+ users with 99.9% uptime.',
      experiences: [
        {
          id: 1,
          jobTitle: 'Software Engineer Intern',
          company: 'NexusTech Labs',
          duration: 'Jan 2024 - Present',
          location: 'Bangalore, India',
          responsibilities: [
            'Built placement prep platform serving 50K+ students with DSA roadmaps, mock tests, and AI-powered resume tools.',
            'Designed Node.js APIs handling 20K+ requests/day with 99.9% uptime using MongoDB and Redis caching.',
            'Developed AI Resume Optimizer, Cover Letter Generator, and Job Finder — cutting application time by 60%.'
          ]
        }
      ],
      educations: [
        {
          id: 1,
          degree: 'B.Tech in Computer Science & Engineering',
          institution: 'National Institute of Technology',
          duration: '2021 - 2025',
          grade: '8.9 / 10.0 CGPA'
        }
      ],
      skills: 'JavaScript, TypeScript, React.js, Node.js, Express, Python, FastAPI, MongoDB, PostgreSQL, Redis, Docker, AWS, Git, System Design, Data Structures & Algorithms',
      projects: [
        {
          id: 1,
          name: 'OmniApply - Autonomous Career Agent',
          technologies: 'React, Node.js, Fastify, Redis, OpenAI API, Tailwind CSS',
          link: 'https://github.com/aaravsharma-dev/omniapply',
          description: 'Autonomous job scraping, semantic ATS match scoring, and automatic PDF application dispatch with audit trail.'
        }
      ],
      achievements: [
        {
          id: 1,
          title: 'Smart India Hackathon Finalist',
          issuer: 'Ministry of Education & AICTE',
          year: '2023'
        },
        {
          id: 2,
          title: 'AWS Certified Cloud Practitioner',
          issuer: 'Amazon Web Services',
          year: '2024'
        }
      ]
    };
  });

  const [activeTab, setActiveTab] = useState('editor'); // for mobile toggle: 'editor' | 'preview'
  const [previewTheme, setPreviewTheme] = useState('paper'); // 'paper' (ATS standard white) | 'dark'

  // Personal Info helpers
  const handlePersonalChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const handleAddCodingProfile = () => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        codingProfiles: [...prev.personalInfo.codingProfiles, { platform: 'LeetCode', url: '' }]
      }
    }));
  };

  const handleUpdateCodingProfile = (index, field, value) => {
    const updated = [...formData.personalInfo.codingProfiles];
    updated[index][field] = value;
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, codingProfiles: updated }
    }));
  };

  const handleRemoveCodingProfile = (index) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        codingProfiles: prev.personalInfo.codingProfiles.filter((_, i) => i !== index)
      }
    }));
  };

  // Experience helpers
  const handleAddExperience = () => {
    const newExp = {
      id: Date.now(),
      jobTitle: '',
      company: '',
      duration: '',
      location: '',
      responsibilities: ['']
    };
    setFormData(prev => ({ ...prev, experiences: [...prev.experiences, newExp] }));
  };

  const handleUpdateExperience = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const handleRemoveExperience = (id) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const handleAddBullet = (expId) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => {
        if (exp.id === expId) {
          return { ...exp, responsibilities: [...exp.responsibilities, ''] };
        }
        return exp;
      })
    }));
  };

  const handleUpdateBullet = (expId, bulletIndex, value) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => {
        if (exp.id === expId) {
          const newBullets = [...exp.responsibilities];
          newBullets[bulletIndex] = value;
          return { ...exp, responsibilities: newBullets };
        }
        return exp;
      })
    }));
  };

  const handleRemoveBullet = (expId, bulletIndex) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => {
        if (exp.id === expId) {
          return {
            ...exp,
            responsibilities: exp.responsibilities.filter((_, i) => i !== bulletIndex)
          };
        }
        return exp;
      })
    }));
  };

  // Education helpers
  const handleAddEducation = () => {
    const newEdu = {
      id: Date.now(),
      degree: '',
      institution: '',
      duration: '',
      grade: ''
    };
    setFormData(prev => ({ ...prev, educations: [...prev.educations, newEdu] }));
  };

  const handleUpdateEducation = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      educations: prev.educations.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const handleRemoveEducation = (id) => {
    setFormData(prev => ({
      ...prev,
      educations: prev.educations.filter(edu => edu.id !== id)
    }));
  };

  // Project helpers
  const handleAddProject = () => {
    const newProj = {
      id: Date.now(),
      name: '',
      technologies: '',
      link: '',
      description: ''
    };
    setFormData(prev => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const handleUpdateProject = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  const handleRemoveProject = (id) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  // Achievement helpers
  const handleAddAchievement = () => {
    const newAch = {
      id: Date.now(),
      title: '',
      issuer: '',
      year: ''
    };
    setFormData(prev => ({ ...prev, achievements: [...prev.achievements, newAch] }));
  };

  const handleUpdateAchievement = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.map(a => a.id === id ? { ...a, [field]: value } : a)
    }));
  };

  const handleRemoveAchievement = (id) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(a => a.id !== id)
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`min-h-screen bg-black text-white ${isModal ? 'p-0' : 'py-8 px-4 sm:px-6 lg:px-8'}`}>
      <div className="max-w-[1500px] mx-auto">
        
        {/* Top Header / Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                Step 1 of 5
              </span>
              <span className="text-xs text-zinc-400">&bull; Live ATS Formatter</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isModal ? 'Update Your Master Resume' : 'Update Basic Details for Resume'}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
              Fill in your experience and skills. The live preview on the right formats everything according to ATS standards.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {/* Mobile View Toggle */}
            <div className="flex lg:hidden rounded-lg bg-zinc-900 border border-zinc-800 p-0.5 text-xs font-medium">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1.5 rounded-md transition-all ${activeTab === 'editor' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
              >
                Editor
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 rounded-md transition-all ${activeTab === 'preview' ? 'bg-zinc-800 text-white' : 'text-zinc-400'}`}
              >
                Live Preview
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all flex items-center gap-2"
              title="Print or Export to PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            {isModal && onCloseModal && (
              <button
                onClick={onCloseModal}
                className="px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-300 hover:text-white"
              >
                Cancel
              </button>
            )}

            <button
              onClick={() => onSaveAndContinue(formData)}
              className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs sm:text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg active:scale-95"
            >
              <span>{isModal ? 'Save Changes' : 'Save & Continue'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDE: FORM EDITOR */}
          <div className={`lg:col-span-7 space-y-8 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
            
            {/* Section 1: Personal Info */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-zinc-800/80">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Personal Info</h3>
                  <p className="text-xs text-zinc-400">Core contact info and public developer presence</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Job Title / Role</label>
                  <input
                    type="text"
                    value={formData.personalInfo.jobTitle}
                    onChange={(e) => handlePersonalChange('jobTitle', e.target.value)}
                    placeholder="e.g. Full Stack & AI Engineer"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Phone</label>
                  <input
                    type="text"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handlePersonalChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handlePersonalChange('email', e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">LinkedIn</label>
                  <input
                    type="text"
                    value={formData.personalInfo.linkedin}
                    onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">GitHub</label>
                  <input
                    type="text"
                    value={formData.personalInfo.github}
                    onChange={(e) => handlePersonalChange('github', e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Website / Portfolio</label>
                  <input
                    type="text"
                    value={formData.personalInfo.portfolio}
                    onChange={(e) => handlePersonalChange('portfolio', e.target.value)}
                    placeholder="https://yourportfolio.dev"
                    className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Coding Profiles */}
              <div className="mt-6 pt-5 border-t border-zinc-800/80">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-semibold text-zinc-300">Coding Profiles</label>
                  <button
                    type="button"
                    onClick={handleAddCodingProfile}
                    className="text-xs text-white font-medium hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Coding Profile
                  </button>
                </div>

                <div className="space-y-2.5">
                  {formData.personalInfo.codingProfiles.map((cp, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <select
                        value={cp.platform}
                        onChange={(e) => handleUpdateCodingProfile(idx, 'platform', e.target.value)}
                        className="w-36 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-white"
                      >
                        <option value="LeetCode">LeetCode</option>
                        <option value="Codeforces">Codeforces</option>
                        <option value="HackerRank">HackerRank</option>
                        <option value="CodeChef">CodeChef</option>
                        <option value="GeeksforGeeks">GeeksforGeeks</option>
                        <option value="Kaggle">Kaggle</option>
                      </select>
                      <input
                        type="text"
                        value={cp.url}
                        onChange={(e) => handleUpdateCodingProfile(idx, 'url', e.target.value)}
                        placeholder="Profile URL or handle"
                        className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveCodingProfile(idx)}
                        className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2: Summary */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-zinc-800/80">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Summary</h3>
                  <p className="text-xs text-zinc-400">Crisp 2-3 sentence overview highlighting your engineering focus</p>
                </div>
              </div>

              <textarea
                rows={3}
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Write your professional summary..."
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
              />
            </div>

            {/* Section 3: Experience */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Experience</h3>
                    <p className="text-xs text-zinc-400">Work history, internships, or open source engagements</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-semibold text-white hover:bg-zinc-800 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Experience
                </button>
              </div>

              <div className="space-y-8">
                {formData.experiences.map((exp, index) => (
                  <div key={exp.id} className="p-4 sm:p-5 rounded-xl border border-zinc-800/90 bg-zinc-900/40 relative">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-zinc-300">
                        Experience {index + 1}
                      </span>
                      {formData.experiences.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveExperience(exp.id)}
                          className="text-zinc-500 hover:text-red-400 text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Job Title</label>
                        <input
                          type="text"
                          value={exp.jobTitle}
                          onChange={(e) => handleUpdateExperience(exp.id, 'jobTitle', e.target.value)}
                          placeholder="e.g. Software Engineer Intern"
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                          placeholder="e.g. NexusTech Labs"
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Duration</label>
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) => handleUpdateExperience(exp.id, 'duration', e.target.value)}
                          placeholder="e.g. Jan 2024 - Present"
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Location</label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => handleUpdateExperience(exp.id, 'location', e.target.value)}
                          placeholder="e.g. Bangalore, India"
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="mt-4 pt-3 border-t border-zinc-800/60">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-semibold text-zinc-300">Responsibilities</label>
                        <button
                          type="button"
                          onClick={() => handleAddBullet(exp.id)}
                          className="text-xs text-zinc-300 hover:text-white flex items-center gap-1 font-medium"
                        >
                          <Plus className="w-3 h-3" />
                          Add bullet
                        </button>
                      </div>

                      <div className="space-y-2">
                        {exp.responsibilities.map((bullet, bIndex) => (
                          <div key={bIndex} className="flex items-start gap-2">
                            <span className="text-zinc-500 font-mono text-xs mt-2">&bull;</span>
                            <textarea
                              rows={2}
                              value={bullet}
                              onChange={(e) => handleUpdateBullet(exp.id, bIndex, e.target.value)}
                              placeholder="Action verb + Context + Quantified Metric..."
                              className="flex-1 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                            />
                            {exp.responsibilities.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveBullet(exp.id, bIndex)}
                                className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors mt-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Education */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Education</h3>
                    <p className="text-xs text-zinc-400">Academic background and degrees</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-semibold text-white hover:bg-zinc-800 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Education
                </button>
              </div>

              <div className="space-y-4">
                {formData.educations.map((edu, index) => (
                  <div key={edu.id} className="p-4 rounded-xl border border-zinc-800/90 bg-zinc-900/40">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-zinc-300">
                        Education {index + 1}
                      </span>
                      {formData.educations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveEducation(edu.id)}
                          className="text-zinc-500 hover:text-red-400 text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleUpdateEducation(edu.id, 'degree', e.target.value)}
                          placeholder="e.g. B.Tech in Computer Science"
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Institution</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleUpdateEducation(edu.id, 'institution', e.target.value)}
                          placeholder="e.g. National Institute of Technology"
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Duration</label>
                        <input
                          type="text"
                          value={edu.duration}
                          onChange={(e) => handleUpdateEducation(edu.id, 'duration', e.target.value)}
                          placeholder="e.g. 2021 - 2025"
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Grade / CGPA</label>
                        <input
                          type="text"
                          value={edu.grade}
                          onChange={(e) => handleUpdateEducation(edu.id, 'grade', e.target.value)}
                          placeholder="e.g. 8.9 / 10.0 CGPA"
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Skills */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-zinc-800/80">
                <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Skills</h3>
                  <p className="text-xs text-zinc-400">List your skills separated by commas or write a paragraph.</p>
                </div>
              </div>

              <textarea
                rows={3}
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="List your skills separated by commas or write a paragraph. e.g. React, Node.js, Python, MongoDB, System Design..."
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
              />

              {/* Rendered Skill Chips */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {formData.skills
                  .split(',')
                  .map(s => s.trim())
                  .filter(Boolean)
                  .map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-900 text-zinc-300 border border-zinc-800"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>

            {/* Section 6: Projects */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                    <FolderGit2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Projects</h3>
                    <p className="text-xs text-zinc-400">Technical applications, open source repos, or research</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-semibold text-white hover:bg-zinc-800 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Project
                </button>
              </div>

              <div className="space-y-4">
                {formData.projects.map((proj, index) => (
                  <div key={proj.id} className="p-4 rounded-xl border border-zinc-800/90 bg-zinc-900/40">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-zinc-300">
                        Project {index + 1}
                      </span>
                      {formData.projects.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveProject(proj.id)}
                          className="text-zinc-500 hover:text-red-400 text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Project Name</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => handleUpdateProject(proj.id, 'name', e.target.value)}
                          placeholder="e.g. OmniApply AI"
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-400 mb-1">Link</label>
                        <input
                          type="text"
                          value={proj.link}
                          onChange={(e) => handleUpdateProject(proj.id, 'link', e.target.value)}
                          placeholder="e.g. https://github.com/..."
                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Technologies</label>
                      <input
                        type="text"
                        value={proj.technologies}
                        onChange={(e) => handleUpdateProject(proj.id, 'technologies', e.target.value)}
                        placeholder="List technologies used separated by commas"
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={proj.description}
                        onChange={(e) => handleUpdateProject(proj.id, 'description', e.target.value)}
                        placeholder="Describe architecture, user problem, and technical impact..."
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 7: Achievements */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Achievements & Certifications</h3>
                    <p className="text-xs text-zinc-400">Hackathons, competitive programming, and certifications</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddAchievement}
                  className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-semibold text-white hover:bg-zinc-800 transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Certificate
                </button>
              </div>

              <div className="space-y-3">
                {formData.achievements.map((ach) => (
                  <div key={ach.id} className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40 flex items-center gap-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                      <input
                        type="text"
                        value={ach.title}
                        onChange={(e) => handleUpdateAchievement(ach.id, 'title', e.target.value)}
                        placeholder="Certificate / Award Title"
                        className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                      />
                      <input
                        type="text"
                        value={ach.issuer}
                        onChange={(e) => handleUpdateAchievement(ach.id, 'issuer', e.target.value)}
                        placeholder="Issuer (e.g. AWS / Google)"
                        className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                      />
                      <input
                        type="text"
                        value={ach.year}
                        onChange={(e) => handleUpdateAchievement(ach.id, 'year', e.target.value)}
                        placeholder="Year (e.g. 2024)"
                        className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAchievement(ach.id)}
                      className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Save Action */}
            <div className="pt-4 flex items-center justify-end">
              <button
                type="button"
                onClick={() => onSaveAndContinue(formData)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95"
              >
                <span>{isModal ? 'Save & Close' : 'Save & Continue to Target Companies'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>


          {/* RIGHT SIDE: LIVE PREVIEW SECTION */}
          <div className={`lg:col-span-5 sticky top-24 ${activeTab === 'editor' ? 'hidden lg:block' : 'block'}`}>
            
            {/* Preview Toolbar */}
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-semibold text-zinc-300">Live ATS Preview</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">Auto-updating</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPreviewTheme(previewTheme === 'paper' ? 'dark' : 'paper')}
                  className="px-2.5 py-1 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white transition-colors"
                >
                  {previewTheme === 'paper' ? 'Dark Matrix' : 'Paper Mode'}
                </button>
              </div>
            </div>

            {/* Printable ATS Document Card */}
            <div 
              id="resume-preview-sheet"
              className={`rounded-xl border shadow-2xl p-6 sm:p-8 font-sans transition-all duration-200 overflow-hidden max-h-[calc(100vh-140px)] overflow-y-auto ${
                previewTheme === 'paper' 
                  ? 'bg-white text-zinc-900 border-zinc-200' 
                  : 'bg-zinc-950 text-zinc-100 border-zinc-800'
              }`}
            >
              {/* Header */}
              <div className="border-b pb-4 mb-4 border-zinc-300 dark:border-zinc-800">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {formData.personalInfo.fullName || 'Your Full Name'}
                </h1>
                <p className={`text-xs font-semibold tracking-wide uppercase mt-0.5 ${previewTheme === 'paper' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  {formData.personalInfo.jobTitle || 'Target Role / Job Title'}
                </p>

                {/* Contacts Row */}
                <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] ${previewTheme === 'paper' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  {formData.personalInfo.phone && <span>{formData.personalInfo.phone}</span>}
                  {formData.personalInfo.phone && formData.personalInfo.email && <span>&bull;</span>}
                  {formData.personalInfo.email && <span className="underline">{formData.personalInfo.email}</span>}
                  {formData.personalInfo.linkedin && (
                    <>
                      <span>&bull;</span>
                      <span className="underline">LinkedIn</span>
                    </>
                  )}
                  {formData.personalInfo.github && (
                    <>
                      <span>&bull;</span>
                      <span className="underline">GitHub</span>
                    </>
                  )}
                  {formData.personalInfo.portfolio && (
                    <>
                      <span>&bull;</span>
                      <span className="underline">Portfolio</span>
                    </>
                  )}
                </div>

                {/* Coding Profiles in Resume Preview */}
                {formData.personalInfo.codingProfiles?.length > 0 && (
                  <div className={`flex flex-wrap items-center gap-2 mt-2 text-[10px] font-mono ${previewTheme === 'paper' ? 'text-zinc-700' : 'text-zinc-400'}`}>
                    <span className="font-bold">Profiles:</span>
                    {formData.personalInfo.codingProfiles.map((cp, idx) => (
                      <span key={idx} className={`px-1.5 py-0.5 rounded ${previewTheme === 'paper' ? 'bg-zinc-100 border border-zinc-300' : 'bg-zinc-900 border border-zinc-800'}`}>
                        {cp.platform}: {cp.url ? cp.url.replace(/^https?:\/\//, '') : '—'}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary */}
              {formData.summary && (
                <div className="mb-4">
                  <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 border-b pb-0.5 ${previewTheme === 'paper' ? 'text-zinc-800 border-zinc-200' : 'text-zinc-300 border-zinc-800'}`}>
                    Professional Summary
                  </h4>
                  <p className={`text-xs leading-relaxed ${previewTheme === 'paper' ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    {formData.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {formData.experiences?.length > 0 && (
                <div className="mb-4">
                  <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-2 border-b pb-0.5 ${previewTheme === 'paper' ? 'text-zinc-800 border-zinc-200' : 'text-zinc-300 border-zinc-800'}`}>
                    Experience
                  </h4>
                  <div className="space-y-3">
                    {formData.experiences.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex items-baseline justify-between text-xs font-bold">
                          <span>{exp.jobTitle || 'Job Title'} &mdash; <span className="font-medium">{exp.company || 'Company'}</span></span>
                          <span className={`text-[11px] font-normal ${previewTheme === 'paper' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                            {exp.duration || 'Duration'}
                          </span>
                        </div>
                        {exp.location && (
                          <div className={`text-[10px] italic mb-1 ${previewTheme === 'paper' ? 'text-zinc-500' : 'text-zinc-400'}`}>
                            {exp.location}
                          </div>
                        )}
                        <ul className={`list-disc list-outside ml-4 space-y-1 text-xs mt-1 ${previewTheme === 'paper' ? 'text-zinc-700' : 'text-zinc-300'}`}>
                          {exp.responsibilities?.map((bullet, bIdx) => bullet && (
                            <li key={bIdx} className="leading-snug">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {formData.educations?.length > 0 && (
                <div className="mb-4">
                  <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 border-b pb-0.5 ${previewTheme === 'paper' ? 'text-zinc-800 border-zinc-200' : 'text-zinc-300 border-zinc-800'}`}>
                    Education
                  </h4>
                  <div className="space-y-2">
                    {formData.educations.map((edu) => (
                      <div key={edu.id} className="text-xs">
                        <div className="flex items-baseline justify-between font-bold">
                          <span>{edu.degree || 'Degree'}</span>
                          <span className={`text-[11px] font-normal ${previewTheme === 'paper' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                            {edu.duration}
                          </span>
                        </div>
                        <div className={`flex items-center justify-between text-[11px] ${previewTheme === 'paper' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                          <span>{edu.institution || 'University'}</span>
                          {edu.grade && <span className="font-semibold">{edu.grade}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {formData.skills && (
                <div className="mb-4">
                  <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-1 border-b pb-0.5 ${previewTheme === 'paper' ? 'text-zinc-800 border-zinc-200' : 'text-zinc-300 border-zinc-800'}`}>
                    Skills & Competencies
                  </h4>
                  <p className={`text-xs leading-relaxed ${previewTheme === 'paper' ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    {formData.skills}
                  </p>
                </div>
              )}

              {/* Projects */}
              {formData.projects?.length > 0 && (
                <div className="mb-4">
                  <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-1.5 border-b pb-0.5 ${previewTheme === 'paper' ? 'text-zinc-800 border-zinc-200' : 'text-zinc-300 border-zinc-800'}`}>
                    Projects
                  </h4>
                  <div className="space-y-2.5">
                    {formData.projects.map((proj) => (
                      <div key={proj.id} className="text-xs">
                        <div className="flex items-baseline justify-between font-bold">
                          <span>{proj.name || 'Project Name'}</span>
                          {proj.link && <span className="text-[10px] underline">{proj.link.replace(/^https?:\/\//, '')}</span>}
                        </div>
                        {proj.technologies && (
                          <div className={`text-[10px] font-mono mt-0.5 ${previewTheme === 'paper' ? 'text-zinc-600' : 'text-zinc-400'}`}>
                            Technologies: {proj.technologies}
                          </div>
                        )}
                        {proj.description && (
                          <p className={`mt-0.5 leading-snug ${previewTheme === 'paper' ? 'text-zinc-700' : 'text-zinc-300'}`}>
                            {proj.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {formData.achievements?.length > 0 && (
                <div>
                  <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-1 border-b pb-0.5 ${previewTheme === 'paper' ? 'text-zinc-800 border-zinc-200' : 'text-zinc-300 border-zinc-800'}`}>
                    Achievements & Honors
                  </h4>
                  <ul className={`list-disc list-outside ml-4 space-y-0.5 text-xs ${previewTheme === 'paper' ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    {formData.achievements.map((ach) => (
                      <li key={ach.id}>
                        <span className="font-semibold">{ach.title}</span> {ach.issuer && <span>&mdash; {ach.issuer}</span>} {ach.year && <span className="text-[11px]">({ach.year})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

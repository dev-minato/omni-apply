import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  FileText, 
  Save, 
  Send, 
  Plus, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { sendTestEmail } from '../services/api';

export default function ProfileEditor({ profile, onSaveProfile }) {
  const [formData, setFormData] = useState(profile);
  const [roleInput, setRoleInput] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  if (!formData) return null;

  const handleAddRole = (e) => {
    e.preventDefault();
    if (!roleInput.trim()) return;
    if (!formData.target_roles.includes(roleInput.trim())) {
      setFormData({
        ...formData,
        target_roles: [...formData.target_roles, roleInput.trim()]
      });
    }
    setRoleInput('');
  };

  const handleRemoveRole = (role) => {
    setFormData({
      ...formData,
      target_roles: formData.target_roles.filter(r => r !== role)
    });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    if (!formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
    }
    setSkillInput('');
  };

  const handleRemoveSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await onSaveProfile(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendTestAlert = async () => {
    const targetEmail = formData.notification_email || formData.email;
    if (!targetEmail) {
      alert("Please provide an email address first.");
      return;
    }
    setIsSendingTest(true);
    setTestResult(null);
    try {
      const res = await sendTestEmail(targetEmail);
      setTestResult({ success: true, message: `Notification email successfully delivered to ${targetEmail}!` });
    } catch (err) {
      setTestResult({ success: false, message: `Failed: ${err.message}` });
    } finally {
      setIsSendingTest(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      
      {/* Basic Info */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            <span>Applicant Information</span>
          </h3>
          <span className="text-xs text-slate-500">Used for resume header and recruiter outreach</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Applicant Contact Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
            <input
              type="text"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Target Location</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-400 mb-1">Portfolio / GitHub / LinkedIn</label>
            <input
              type="text"
              value={formData.portfolio_url || ''}
              onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
              placeholder="https://github.com/yourusername"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Email Notification & Autonomous Settings */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Student Notification & Auto-Apply Control</span>
          </h3>
          <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Realtime SMTP Active
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Specify your personal email where OmniApply should send detailed alerts whenever a job is found and a new resume is tailored for you.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="email"
            placeholder="Enter your personal email (e.g. yourname@gmail.com)"
            value={formData.notification_email || ''}
            onChange={(e) => setFormData({ ...formData, notification_email: e.target.value })}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          />

          <button
            type="button"
            onClick={handleSendTestAlert}
            disabled={isSendingTest}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Send className={`w-3.5 h-3.5 ${isSendingTest ? 'animate-spin' : ''}`} />
            <span>{isSendingTest ? 'Sending Test...' : 'Send Test Alert Email'}</span>
          </button>
        </div>

        {testResult && (
          <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
            testResult.success 
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' 
              : 'bg-red-500/10 text-red-300 border border-red-500/30'
          }`}>
            {testResult.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span>{testResult.message}</span>
          </div>
        )}

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">Auto-Apply to Company Recruiters</div>
            <div className="text-[11px] text-slate-400">If enabled, sends cold email with tailored PDF to HR automatically</div>
          </div>
          <input
            type="checkbox"
            checked={formData.auto_apply_enabled}
            onChange={(e) => setFormData({ ...formData, auto_apply_enabled: e.target.checked })}
            className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
          />
        </div>
      </div>

      {/* Target Roles & Skills */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-purple-400" />
          <span>Target Roles & Core Skills</span>
        </h3>

        {/* Roles */}
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2">Target Roles for Job Search</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.target_roles.map((role) => (
              <span
                key={role}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20"
              >
                <span>{role}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRole(role)}
                  className="hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add target role (e.g. SDE-1, React Developer, Python Intern)..."
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddRole}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200"
            >
              Add Role
            </button>
          </div>
        </div>

        {/* Skills */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-400 mb-2">Core Technical Skills</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add skill (e.g. FastAPI, Docker, TypeScript)..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200"
            >
              Add Skill
            </button>
          </div>
        </div>
      </div>

      {/* Master Base Resume */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <span>Master Base Resume (Source of Truth)</span>
          </h3>
          <span className="text-xs text-slate-500">The LLM uses this to generate tailored ATS resumes</span>
        </div>

        <textarea
          rows={14}
          value={formData.base_resume_text}
          onChange={(e) => setFormData({ ...formData, base_resume_text: e.target.value })}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500 leading-relaxed"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end gap-4">
        {saveSuccess && (
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile and Preferences Saved!</span>
          </span>
        )}

        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 flex items-center gap-2 active:scale-95 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Profile & Settings'}</span>
        </button>
      </div>

    </form>
  );
}

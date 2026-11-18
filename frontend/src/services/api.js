const API_BASE = '/api';

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

export async function fetchProfile() {
  const res = await fetch(`${API_BASE}/profile`);
  return res.json();
}

export async function saveProfile(profile) {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  return res.json();
}

export async function fetchJobs(limit = 50) {
  const res = await fetch(`${API_BASE}/jobs?limit=${limit}`);
  return res.json();
}

export async function triggerJobScrape() {
  const res = await fetch(`${API_BASE}/jobs/scrape`, { method: 'POST' });
  return res.json();
}

export async function fetchApplications(limit = 50) {
  const res = await fetch(`${API_BASE}/applications?limit=${limit}`);
  return res.json();
}

export async function fetchLogs(limit = 50) {
  const res = await fetch(`${API_BASE}/logs?limit=${limit}`);
  return res.json();
}

export async function runAutonomousCycle(triggerSource = 'web_dashboard') {
  const res = await fetch(`${API_BASE}/pipeline/run-cycle?trigger_source=${triggerSource}`, {
    method: 'POST',
  });
  return res.json();
}

export async function applySingleJob(jobId) {
  const res = await fetch(`${API_BASE}/jobs/${jobId}/apply`, {
    method: 'POST',
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Failed to apply');
  }
  return res.json();
}

export async function sendTestEmail(email) {
  const res = await fetch(`${API_BASE}/test-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || 'Email sending failed');
  }
  return res.json();
}

export async function fetchSchedulerStatus() {
  const res = await fetch(`${API_BASE}/scheduler/status`);
  return res.json();
}

export async function toggleScheduler(enabled) {
  const res = await fetch(`${API_BASE}/scheduler/toggle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enabled }),
  });
  return res.json();
}

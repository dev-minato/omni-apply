-- OmniApply AI Supabase Database Schema
-- Run this in your Supabase SQL Editor: https://app.supabase.com/project/_/sql

-- 1. Candidates table
CREATE TABLE IF NOT EXISTS candidates (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    target_roles JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    base_resume_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    platform TEXT DEFAULT 'LinkedIn',
    job_url TEXT,
    contact_email TEXT,
    description TEXT,
    experience_level TEXT,
    source_type TEXT DEFAULT 'Scraped',
    posted_date TEXT,
    extracted_keywords JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Applications table
CREATE TABLE IF NOT EXISTS applications (
    id TEXT PRIMARY KEY,
    candidate_id TEXT REFERENCES candidates(id) ON DELETE CASCADE,
    job_id TEXT REFERENCES jobs(id) ON DELETE CASCADE,
    job_title TEXT NOT NULL,
    company TEXT NOT NULL,
    contact_email TEXT,
    ats_score INTEGER DEFAULT 80,
    tailored_resume_text TEXT,
    pdf_filename TEXT,
    cover_letter TEXT,
    email_subject TEXT,
    email_body TEXT,
    status TEXT DEFAULT 'Applied',
    sent_to_recruiter BOOLEAN DEFAULT FALSE,
    user_notified BOOLEAN DEFAULT FALSE,
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Activity Logs table
CREATE TABLE IF NOT EXISTS activity_logs (
    id TEXT PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    event_type TEXT NOT NULL,
    message TEXT NOT NULL,
    details JSONB DEFAULT '{}'::jsonb
);

-- Enable Row Level Security (RLS) but allow authenticated & anon operations for prototype
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON candidates FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update" ON candidates FOR ALL USING (true);

CREATE POLICY "Allow public read access on jobs" ON jobs FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on jobs" ON jobs FOR ALL USING (true);

CREATE POLICY "Allow public read access on applications" ON applications FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on applications" ON applications FOR ALL USING (true);

CREATE POLICY "Allow public read access on logs" ON activity_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert on logs" ON activity_logs FOR ALL USING (true);

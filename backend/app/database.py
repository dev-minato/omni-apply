import os
import json
import sqlite3
from typing import List, Optional, Dict, Any
from datetime import datetime
import httpx
from app.config import settings
from app.models import CandidateProfile, JobPosting, ApplicationRecord, ActivityLog

DB_DIR = os.path.join(os.path.dirname(__file__), "..", "data")
os.makedirs(DB_DIR, exist_ok=True)
DB_PATH = os.path.join(DB_DIR, "app_data.db")

class Database:
    def __init__(self):
        self._init_sqlite()
        self.supabase_url = settings.SUPABASE_URL
        self.supabase_key = settings.SUPABASE_ANON_KEY

    def _get_connection(self):
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        return conn

    def _init_sqlite(self):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            # Candidate
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS candidate (
                id TEXT PRIMARY KEY,
                data TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """)
            # Jobs
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS jobs (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                company TEXT NOT NULL,
                location TEXT,
                platform TEXT,
                job_url TEXT,
                contact_email TEXT,
                description TEXT,
                experience_level TEXT,
                source_type TEXT,
                posted_date TEXT,
                extracted_keywords TEXT,
                created_at TEXT NOT NULL
            )
            """)
            # Applications
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS applications (
                id TEXT PRIMARY KEY,
                candidate_id TEXT NOT NULL,
                job_id TEXT NOT NULL,
                job_title TEXT NOT NULL,
                company TEXT NOT NULL,
                contact_email TEXT,
                ats_score INTEGER,
                tailored_resume_text TEXT,
                pdf_filename TEXT,
                cover_letter TEXT,
                email_subject TEXT,
                email_body TEXT,
                status TEXT,
                sent_to_recruiter INTEGER,
                user_notified INTEGER,
                applied_at TEXT NOT NULL
            )
            """)
            # Activity Logs
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS activity_logs (
                id TEXT PRIMARY KEY,
                timestamp TEXT NOT NULL,
                event_type TEXT NOT NULL,
                message TEXT NOT NULL,
                details TEXT
            )
            """)
            conn.commit()

    def get_candidate(self) -> CandidateProfile:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT data FROM candidate WHERE id = 'default_candidate'")
            row = cursor.fetchone()
            if row:
                data = json.loads(row["data"])
                return CandidateProfile(**data)
            
            # Default candidate
            default_cand = CandidateProfile()
            self.save_candidate(default_cand)
            return default_cand

    def save_candidate(self, candidate: CandidateProfile):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            data_str = json.dumps(candidate.model_dump())
            now = datetime.utcnow().isoformat()
            cursor.execute("""
            INSERT INTO candidate (id, data, updated_at) 
            VALUES (?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at
            """, (candidate.id or "default_candidate", data_str, now))
            conn.commit()

        # Try async sync to Supabase if configured
        self._sync_to_supabase_candidate(candidate)

    def _sync_to_supabase_candidate(self, candidate: CandidateProfile):
        if not self.supabase_url or not self.supabase_key:
            return
        try:
            headers = {
                "apikey": self.supabase_key,
                "Authorization": f"Bearer {self.supabase_key}",
                "Content-Type": "application/json",
                "Prefer": "resolution=merge-duplicates"
            }
            payload = {
                "id": candidate.id or "default_candidate",
                "name": candidate.name,
                "email": candidate.email,
                "phone": candidate.phone,
                "target_roles": json.dumps(candidate.target_roles),
                "skills": json.dumps(candidate.skills),
                "base_resume_text": candidate.base_resume_text,
                "updated_at": datetime.utcnow().isoformat()
            }
            httpx.post(
                f"{self.supabase_url}/rest/v1/candidates",
                headers=headers,
                json=payload,
                timeout=3.0
            )
        except Exception:
            pass  # Fallback to local store smoothly

    def get_jobs(self, limit: int = 50) -> List[JobPosting]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM jobs ORDER BY created_at DESC LIMIT ?", (limit,))
            rows = cursor.fetchall()
            jobs = []
            for r in rows:
                jobs.append(JobPosting(
                    id=r["id"],
                    title=r["title"],
                    company=r["company"],
                    location=r["location"] or "",
                    platform=r["platform"] or "LinkedIn",
                    job_url=r["job_url"] or "",
                    contact_email=r["contact_email"],
                    description=r["description"] or "",
                    experience_level=r["experience_level"] or "Fresher",
                    source_type=r["source_type"] or "Scraped",
                    posted_date=r["posted_date"] or "Recently",
                    extracted_keywords=json.loads(r["extracted_keywords"]) if r["extracted_keywords"] else [],
                    created_at=r["created_at"]
                ))
            return jobs

    def save_job(self, job: JobPosting):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO jobs (id, title, company, location, platform, job_url, contact_email, description, experience_level, source_type, posted_date, extracted_keywords, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                title=excluded.title, company=excluded.company, location=excluded.location,
                platform=excluded.platform, job_url=excluded.job_url, contact_email=excluded.contact_email,
                description=excluded.description, experience_level=excluded.experience_level,
                extracted_keywords=excluded.extracted_keywords
            """, (
                job.id, job.title, job.company, job.location, job.platform, job.job_url,
                job.contact_email, job.description, job.experience_level, job.source_type,
                job.posted_date, json.dumps(job.extracted_keywords), job.created_at
            ))
            conn.commit()

    def get_applications(self, limit: int = 50) -> List[ApplicationRecord]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM applications ORDER BY applied_at DESC LIMIT ?", (limit,))
            rows = cursor.fetchall()
            apps = []
            for r in rows:
                apps.append(ApplicationRecord(
                    id=r["id"],
                    candidate_id=r["candidate_id"],
                    job_id=r["job_id"],
                    job_title=r["job_title"],
                    company=r["company"],
                    contact_email=r["contact_email"],
                    ats_score=r["ats_score"] or 85,
                    tailored_resume_text=r["tailored_resume_text"] or "",
                    pdf_filename=r["pdf_filename"],
                    cover_letter=r["cover_letter"] or "",
                    email_subject=r["email_subject"] or "",
                    email_body=r["email_body"] or "",
                    status=r["status"] or "Applied",
                    sent_to_recruiter=bool(r["sent_to_recruiter"]),
                    user_notified=bool(r["user_notified"]),
                    applied_at=r["applied_at"]
                ))
            return apps

    def is_job_applied(self, job_id: str) -> bool:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT 1 FROM applications WHERE job_id = ?", (job_id,))
            return cursor.fetchone() is not None

    def save_application(self, app: ApplicationRecord):
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO applications (id, candidate_id, job_id, job_title, company, contact_email, ats_score, tailored_resume_text, pdf_filename, cover_letter, email_subject, email_body, status, sent_to_recruiter, user_notified, applied_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                status=excluded.status, sent_to_recruiter=excluded.sent_to_recruiter,
                user_notified=excluded.user_notified, ats_score=excluded.ats_score
            """, (
                app.id, app.candidate_id, app.job_id, app.job_title, app.company,
                app.contact_email, app.ats_score, app.tailored_resume_text, app.pdf_filename,
                app.cover_letter, app.email_subject, app.email_body, app.status,
                1 if app.sent_to_recruiter else 0, 1 if app.user_notified else 0, app.applied_at
            ))
            conn.commit()

    def add_log(self, event_type: str, message: str, details: Optional[Dict[str, Any]] = None):
        import uuid
        log_id = str(uuid.uuid4())[:8]
        now = datetime.utcnow().isoformat()
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("""
            INSERT INTO activity_logs (id, timestamp, event_type, message, details)
            VALUES (?, ?, ?, ?, ?)
            """, (log_id, now, event_type, message, json.dumps(details or {})))
            conn.commit()

    def get_logs(self, limit: int = 50) -> List[ActivityLog]:
        with self._get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM activity_logs ORDER BY timestamp DESC LIMIT ?", (limit,))
            rows = cursor.fetchall()
            logs = []
            for r in rows:
                logs.append(ActivityLog(
                    id=r["id"],
                    timestamp=r["timestamp"],
                    event_type=r["event_type"],
                    message=r["message"],
                    details=json.loads(r["details"]) if r["details"] else {}
                ))
            return logs

db = Database()

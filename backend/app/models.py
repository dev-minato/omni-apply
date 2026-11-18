from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime

class CandidateProfile(BaseModel):
    id: Optional[str] = "default_candidate"
    name: str = "Rahul Sharma"
    email: str = "applicant@example.com"
    phone: Optional[str] = "+91 9876543210"
    location: Optional[str] = "Bengaluru, India"
    target_roles: List[str] = ["Software Development Engineer - Fresher", "Full Stack Developer", "Python Backend Developer"]
    skills: List[str] = ["Python", "FastAPI", "React", "JavaScript", "PostgreSQL", "Git", "REST APIs", "Docker"]
    education: Optional[str] = "B.Tech in Computer Science & Engineering (2025/2026 Passout)"
    portfolio_url: Optional[str] = "https://github.com/rahulsharma"
    linkedin_url: Optional[str] = "https://linkedin.com/in/rahulsharma"
    base_resume_text: str = """RAHUL SHARMA
Bengaluru, India | +91 9876543210 | rahul.dev@example.com | github.com/rahulsharma

EDUCATION
Bachelor of Technology in Computer Science & Engineering
Expected Graduation: 2026 | CGPA: 8.5/10

TECHNICAL SKILLS
Languages: Python, JavaScript, TypeScript, SQL, HTML/CSS
Frameworks & Libraries: FastAPI, Flask, React.js, Node.js, Express, Tailwind CSS
Databases: PostgreSQL, MongoDB, SQLite, Redis
Tools: Git, GitHub, Docker, Postman, Linux, Vercel

PROJECTS
1. Smart Campus Placement Portal (Full Stack)
- Built a web application using FastAPI and React to manage campus placements for 800+ students.
- Implemented JWT authentication, role-based access control, and automated resume filtering.
- Optimized database queries in PostgreSQL, improving search response time by 40%.

2. Autonomous Web Scraper & Alert Engine
- Developed an asynchronous Python scraper using BeautifulSoup and HTTPX to track tech job listings.
- Integrated automated email notifications via SMTP with error handling and retry mechanisms.
- Containerized the application using Docker and deployed with health checks.

3. Collaborative Task & Code Review Board
- Created a real-time Kanban board with React and WebSocket server in Node.js.
- Integrated code snippet syntax highlighting and Markdown preview.

ACHIEVEMENTS & CERTIFICATIONS
- Solved 350+ problems on LeetCode across Data Structures & Algorithms.
- Finalist in College Tech Hackathon 2025.
"""
    auto_apply_enabled: bool = True
    notification_email: Optional[str] = ""

class JobPosting(BaseModel):
    id: str
    title: str
    company: str
    location: str = "Remote / India"
    platform: str = "LinkedIn"  # LinkedIn, Naukri, Company, Remote
    job_url: str = ""
    contact_email: Optional[str] = None
    description: str = ""
    experience_level: str = "Fresher / 0-2 yrs"
    source_type: str = "Scraped"
    posted_date: Optional[str] = "Recently"
    extracted_keywords: List[str] = []
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

class ApplicationRecord(BaseModel):
    id: str
    candidate_id: str = "default_candidate"
    job_id: str
    job_title: str
    company: str
    contact_email: Optional[str] = None
    ats_score: int = 85
    tailored_resume_text: str = ""
    pdf_filename: Optional[str] = None
    cover_letter: str = ""
    email_subject: str = ""
    email_body: str = ""
    status: str = "Applied"  # Applied, Dispatched, Pending, Failed
    sent_to_recruiter: bool = False
    user_notified: bool = False
    applied_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())

class ActivityLog(BaseModel):
    id: str
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    event_type: str  # SEARCH, TAILOR, APPLY, NOTIFY, ERROR, SYSTEM
    message: str
    details: Optional[Dict[str, Any]] = None

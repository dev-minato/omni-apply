import os
import logging
from typing import Dict, Any, Optional
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel

from app.config import settings
from app.models import CandidateProfile
from app.database import db
from app.services.pipeline import pipeline
from app.services.mailer import mailer
from app.scheduler import init_scheduler, get_scheduler_status, toggle_scheduler
from app.scrapers.aggregator import aggregator
from fastapi.staticfiles import StaticFiles

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("OmniApply.API")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting OmniApply Autonomous Service...")
    # Initialize background scheduler for 24/7 offline processing
    init_scheduler()
    yield
    logger.info("Shutting down OmniApply Service...")

app = FastAPI(
    title="OmniApply AI - Autonomous Off-Campus Job & Resume Platform",
    description="Automated job discovery, ATS resume tailoring, cold-email dispatch, and student notifications.",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TestEmailRequest(BaseModel):
    email: str

class ToggleSchedulerRequest(BaseModel):
    enabled: bool

@app.get("/api/health")
def get_health():
    return {
        "status": "healthy",
        "service": "OmniApply AI Engine",
        "llm_provider": "Groq (Llama/OpenAI) + Gemini Fallback",
        "smtp_configured": bool(settings.SMTP_USER and settings.SMTP_PASS),
        "supabase_configured": bool(settings.SUPABASE_URL and settings.SUPABASE_ANON_KEY),
        "scheduler": get_scheduler_status()
    }

# 1. Candidate Profile
@app.get("/api/profile", response_model=CandidateProfile)
def get_profile():
    return db.get_candidate()

@app.post("/api/profile", response_model=CandidateProfile)
def update_profile(profile: CandidateProfile):
    db.save_candidate(profile)
    db.add_log("PROFILE_UPDATE", f"Updated profile for {profile.name}")
    return profile

# 2. Jobs
@app.get("/api/jobs")
def get_jobs(limit: int = 50):
    jobs = db.get_jobs(limit=limit)
    if not jobs:
        # Initial auto seed if empty
        cand = db.get_candidate()
        jobs = aggregator.search_all(cand, limit_per_source=3)
    return jobs

@app.post("/api/jobs/scrape")
def trigger_scrape(background_tasks: BackgroundTasks):
    cand = db.get_candidate()
    discovered = aggregator.search_all(cand, limit_per_source=3)
    return {"message": "Job discovery completed", "count": len(discovered), "jobs": discovered}

# 3. Applications Tracker
@app.get("/api/applications")
def get_applications(limit: int = 50):
    return db.get_applications(limit=limit)

@app.get("/api/applications/{app_id}/resume-pdf")
def get_application_pdf(app_id: str):
    apps = db.get_applications(limit=100)
    target = next((a for a in apps if a.id == app_id), None)
    if not target or not target.pdf_filename:
        raise HTTPException(status_code=404, detail="PDF not found")
    
    pdf_path = os.path.join(os.path.dirname(__file__), "..", "data", "resumes", target.pdf_filename)
    if not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail="PDF file does not exist on disk")
    
    return FileResponse(pdf_path, media_type="application/pdf", filename=target.pdf_filename)

# 4. Pipeline & Automation Cycle (also n8n Webhook!)
@app.post("/api/pipeline/run-cycle")
def run_autonomous_cycle(trigger_source: str = "web_ui"):
    """
    Triggers an autonomous cycle. n8n workflows or cron jobs can call this POST endpoint anytime!
    """
    logger.info(f"Triggering cycle via API: {trigger_source}")
    result = pipeline.run_cycle(trigger_source=trigger_source, max_applications=2)
    return result

@app.post("/api/jobs/{job_id}/apply")
def apply_single_job(job_id: str):
    """
    One-click action from UI: Tailors resume, generates PDF, sends recruiter email, and notifies student!
    """
    try:
        res = pipeline.tailor_and_apply_single(job_id=job_id)
        return res
    except Exception as e:
        logger.error(f"Single job apply error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# 5. Activity Logs
@app.get("/api/logs")
def get_logs(limit: int = 50):
    return db.get_logs(limit=limit)

# 6. Diagnostics & Verification
@app.post("/api/test-email")
def test_email(req: TestEmailRequest):
    try:
        success = mailer.send_test_email(req.email)
        return {"success": success, "message": f"Test alert email successfully sent to {req.email}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")

# 7. Scheduler Management
@app.get("/api/scheduler/status")
def scheduler_status():
    return get_scheduler_status()

@app.post("/api/scheduler/toggle")
def scheduler_toggle(req: ToggleSchedulerRequest):
    toggle_scheduler(req.enabled)
    return {"enabled": req.enabled, "status": get_scheduler_status()}

# 8. Mount Frontend Built SPA (if exists)
dist_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist"))
if os.path.exists(dist_dir):
    app.mount("/", StaticFiles(directory=dist_dir, html=True), name="frontend")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.PORT, reload=True)

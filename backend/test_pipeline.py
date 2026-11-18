import os
import sys

# Ensure backend root is on sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.database import db
from app.models import JobPosting
from app.services.pipeline import pipeline

def run_test():
    print("=== Testing OmniApply Autonomous Pipeline ===")
    
    # 1. Check candidate
    cand = db.get_candidate()
    print(f"[OK] Candidate loaded: {cand.name} ({cand.email})")

    # 2. Run one autonomous cycle (max 1 application to avoid spamming)
    print("\n[INFO] Running autonomous cycle (Search -> Tailor -> ATS PDF -> Draft Email -> Save)...")
    result = pipeline.run_cycle(trigger_source="e2e_test", max_applications=1)
    
    print("\n=== CYCLE RESULTS ===")
    print(f"Jobs Discovered: {result.get('jobs_discovered')}")
    print(f"Applications Processed: {result.get('applications_processed')}")
    for res in result.get("results", []):
        print(f" - Role: {res['job_title']} at {res['company']} | ATS Match: {res['ats_score']}% | Notified: {res['user_notified']}")

    # 3. Verify Applications in DB
    apps = db.get_applications(limit=5)
    print(f"\n[OK] Stored Applications in DB: {len(apps)}")
    if apps:
        latest = apps[0]
        print(f"Latest App ID: {latest.id}")
        print(f"PDF Filename: {latest.pdf_filename}")
        print(f"ATS Score: {latest.ats_score}%")
        print(f"Email Subject: {latest.email_subject}")
        print(f"Tailored Resume Length: {len(latest.tailored_resume_text)} chars")

    print("\n=== PIPELINE TEST COMPLETED SUCCESSFULLY ===")

if __name__ == "__main__":
    run_test()

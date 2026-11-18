import uuid
import logging
from typing import Dict, Any, List
from datetime import datetime
from app.database import db
from app.models import ApplicationRecord, JobPosting
from app.scrapers.aggregator import aggregator
from app.ai.resume_tailor import resume_tailor
from app.ai.email_drafter import email_drafter
from app.services.pdf_generator import generate_ats_resume_pdf
from app.services.mailer import mailer

logger = logging.getLogger("OmniApply.Pipeline")

class AutonomousPipeline:
    def run_cycle(self, trigger_source: str = "manual", max_applications: int = 3) -> Dict[str, Any]:
        candidate = db.get_candidate()
        db.add_log("CYCLE_START", f"Autonomous cycle triggered by {trigger_source}")

        # 1. Search jobs
        discovered_jobs = aggregator.search_all(candidate=candidate, limit_per_source=3)
        processed_count = 0
        applications_dispatched = []

        for job in discovered_jobs:
            if processed_count >= max_applications:
                break

            # Skip if already applied
            if db.is_job_applied(job.id):
                continue

            app_id = str(uuid.uuid4())[:8]
            logger.info(f"Processing job {job.title} at {job.company} (ID: {job.id})")

            # 2. AI Tailor Resume
            tailored_res = resume_tailor.tailor(candidate=candidate, job=job)
            ats_score = tailored_res.get("ats_score", 85)
            tailored_text = tailored_res.get("tailored_resume", candidate.base_resume_text)
            tailored_summary = tailored_res.get("tailored_summary", "")

            # 3. Generate ATS PDF Resume
            try:
                pdf_path = generate_ats_resume_pdf(candidate, job, tailored_text, app_id)
            except Exception as e:
                logger.error(f"PDF generation error: {e}")
                pdf_path = None

            # 4. Draft Cold Email to Recruiter
            email_draft = email_drafter.draft(candidate, job, tailored_summary)
            subject = email_draft.get("subject", f"Application for {job.title} - {candidate.name}")
            body = email_draft.get("body", "")

            # 5. Apply automatically to recruiter if email exists and auto-apply is on
            sent_to_recruiter = False
            if candidate.auto_apply_enabled and job.contact_email:
                sent_to_recruiter = mailer.send_recruiter_application(
                    to_email=job.contact_email,
                    subject=subject,
                    body=body,
                    pdf_path=pdf_path
                )

            # 6. Crucial Requirement: Send Email Notification to Candidate/Student!
            # Notifies the student that a job was found, tailored resume was built, and application sent
            notify_email = candidate.notification_email or candidate.email
            app_record = ApplicationRecord(
                id=app_id,
                candidate_id=candidate.id or "default_candidate",
                job_id=job.id,
                job_title=job.title,
                company=job.company,
                contact_email=job.contact_email,
                ats_score=ats_score,
                tailored_resume_text=tailored_text,
                pdf_filename=f"resume_{app_id}.pdf" if pdf_path else None,
                cover_letter=tailored_summary,
                email_subject=subject,
                email_body=body,
                status="Applied & Dispatched" if sent_to_recruiter else "Tailored & Alert Sent",
                sent_to_recruiter=sent_to_recruiter,
                user_notified=False,
                applied_at=datetime.utcnow().isoformat()
            )

            user_notified = False
            if notify_email:
                user_notified = mailer.send_student_alert_notification(
                    student_email=notify_email,
                    candidate=candidate,
                    job=job,
                    application=app_record,
                    pdf_path=pdf_path
                )
            
            app_record.user_notified = user_notified
            db.save_application(app_record)

            db.add_log(
                "APPLY",
                f"Completed application for {job.title} at {job.company} (ATS Score: {ats_score}%)",
                {
                    "app_id": app_id,
                    "company": job.company,
                    "role": job.title,
                    "ats_score": ats_score,
                    "sent_to_recruiter": sent_to_recruiter,
                    "user_notified": user_notified
                }
            )

            applications_dispatched.append({
                "job_title": job.title,
                "company": job.company,
                "ats_score": ats_score,
                "sent_to_recruiter": sent_to_recruiter,
                "user_notified": user_notified
            })

            processed_count += 1

        db.add_log("CYCLE_FINISH", f"Cycle completed. Processed {processed_count} jobs.")

        return {
            "trigger_source": trigger_source,
            "jobs_discovered": len(discovered_jobs),
            "applications_processed": processed_count,
            "results": applications_dispatched,
            "timestamp": datetime.utcnow().isoformat()
        }

    def tailor_and_apply_single(self, job_id: str) -> Dict[str, Any]:
        """Manual one-click action from frontend for a specific job card"""
        candidate = db.get_candidate()
        jobs = db.get_jobs(limit=100)
        target_job = next((j for j in jobs if j.id == job_id), None)
        if not target_job:
            raise ValueError("Job not found")

        app_id = str(uuid.uuid4())[:8]
        tailored_res = resume_tailor.tailor(candidate=candidate, job=target_job)
        ats_score = tailored_res.get("ats_score", 88)
        tailored_text = tailored_res.get("tailored_resume", candidate.base_resume_text)
        tailored_summary = tailored_res.get("tailored_summary", "")

        pdf_path = generate_ats_resume_pdf(candidate, target_job, tailored_text, app_id)
        email_draft = email_drafter.draft(candidate, target_job, tailored_summary)
        subject = email_draft.get("subject", f"Application for {target_job.title} - {candidate.name}")
        body = email_draft.get("body", "")

        sent_to_recruiter = False
        if target_job.contact_email:
            sent_to_recruiter = mailer.send_recruiter_application(
                to_email=target_job.contact_email,
                subject=subject,
                body=body,
                pdf_path=pdf_path
            )

        notify_email = candidate.notification_email or candidate.email
        app_record = ApplicationRecord(
            id=app_id,
            candidate_id=candidate.id or "default_candidate",
            job_id=target_job.id,
            job_title=target_job.title,
            company=target_job.company,
            contact_email=target_job.contact_email,
            ats_score=ats_score,
            tailored_resume_text=tailored_text,
            pdf_filename=f"resume_{app_id}.pdf",
            cover_letter=tailored_summary,
            email_subject=subject,
            email_body=body,
            status="Applied & Dispatched" if sent_to_recruiter else "Tailored & Alert Sent",
            sent_to_recruiter=sent_to_recruiter,
            user_notified=False,
            applied_at=datetime.utcnow().isoformat()
        )

        user_notified = False
        if notify_email:
            user_notified = mailer.send_student_alert_notification(
                student_email=notify_email,
                candidate=candidate,
                job=target_job,
                application=app_record,
                pdf_path=pdf_path
            )

        app_record.user_notified = user_notified
        db.save_application(app_record)

        return {
            "app_id": app_id,
            "job": target_job.model_dump(),
            "ats_score": ats_score,
            "sent_to_recruiter": sent_to_recruiter,
            "user_notified": user_notified,
            "email_subject": subject,
            "tailored_resume": tailored_text
        }

pipeline = AutonomousPipeline()

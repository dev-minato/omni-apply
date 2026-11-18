import os
import smtplib
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from typing import Optional
from app.config import settings
from app.models import JobPosting, ApplicationRecord, CandidateProfile

logger = logging.getLogger("OmniApply.Mailer")

class Mailer:
    def __init__(self):
        self.host = settings.SMTP_HOST
        self.port = settings.SMTP_PORT
        self.user = settings.SMTP_USER
        self.password = settings.SMTP_PASS
        self.from_addr = settings.SMTP_FROM

    def _get_smtp_connection(self):
        if settings.SMTP_SECURE or self.port == 465:
            server = smtplib.SMTP_SSL(self.host, self.port, timeout=15)
        else:
            server = smtplib.SMTP(self.host, self.port, timeout=15)
            server.starttls()
        server.login(self.user, self.password)
        return server

    def send_recruiter_application(self, to_email: str, subject: str, body: str, pdf_path: Optional[str] = None) -> bool:
        try:
            msg = MIMEMultipart()
            msg["From"] = self.from_addr
            msg["To"] = to_email
            msg["Subject"] = subject

            # Email body
            msg.attach(MIMEText(body, "plain", "utf-8"))

            # Attach PDF if available
            if pdf_path and os.path.exists(pdf_path):
                filename = os.path.basename(pdf_path)
                with open(pdf_path, "rb") as f:
                    part = MIMEApplication(f.read(), Name=filename)
                    part["Content-Disposition"] = f'attachment; filename="{filename}"'
                    msg.attach(part)

            with self._get_smtp_connection() as server:
                server.send_message(msg)

            logger.info(f"Cold email sent to {to_email} successfully")
            return True
        except Exception as e:
            logger.error(f"Failed to send email to recruiter {to_email}: {e}")
            return False

    def send_student_alert_notification(
        self,
        student_email: str,
        candidate: CandidateProfile,
        job: JobPosting,
        application: ApplicationRecord,
        pdf_path: Optional[str] = None
    ) -> bool:
        if not student_email:
            student_email = candidate.notification_email or candidate.email

        try:
            msg = MIMEMultipart()
            msg["From"] = self.from_addr
            msg["To"] = student_email
            msg["Subject"] = f"OmniApply: Applied for {job.title} at {job.company} (ATS Match: {application.ats_score}%)"

            # Rich HTML Template
            html_content = f"""
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #e2e8f0; margin: 0; padding: 24px; }}
                .container {{ max-width: 650px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; border: 1px solid #334155; overflow: hidden; }}
                .header {{ background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 28px; text-align: center; color: white; }}
                .header h1 {{ margin: 0 0 8px 0; font-size: 24px; font-weight: 700; }}
                .header p {{ margin: 0; opacity: 0.9; font-size: 14px; }}
                .content {{ padding: 24px; }}
                .badge {{ display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; background: #059669; color: white; }}
                .card {{ background-color: #0f172a; border-radius: 8px; padding: 18px; margin-bottom: 18px; border: 1px solid #334155; }}
                .card h3 {{ margin: 0 0 10px 0; font-size: 16px; color: #38bdf8; }}
                .meta {{ font-size: 14px; color: #94a3b8; margin-bottom: 6px; }}
                .meta strong {{ color: #cbd5e1; }}
                .btn {{ display: inline-block; background-color: #3b82f6; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600; margin-top: 10px; }}
                .email-quote {{ background: #111827; padding: 14px; border-left: 4px solid #8b5cf6; border-radius: 4px; font-family: monospace; font-size: 13px; white-space: pre-wrap; color: #e5e7eb; }}
                .resume-preview {{ background: #111827; padding: 14px; border-radius: 4px; font-size: 12px; max-height: 250px; overflow-y: auto; white-space: pre-wrap; color: #cbd5e1; }}
                .footer {{ text-align: center; padding: 18px; color: #64748b; font-size: 12px; border-top: 1px solid #334155; }}
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Automated Application Dispatched!</h1>
                  <p>OmniApply autonomous agent applied while you were offline</p>
                </div>
                <div class="content">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <div>
                      <h2 style="margin: 0; color: #ffffff; font-size: 20px;">{job.title}</h2>
                      <div style="color: #94a3b8; font-size: 15px; margin-top: 4px;">{job.company} &bull; {job.location}</div>
                    </div>
                    <div style="text-align: right;">
                      <span class="badge">ATS Match: {application.ats_score}%</span>
                    </div>
                  </div>

                  <!-- Details Card -->
                  <div class="card">
                    <h3>📌 Job & Application Details</h3>
                    <div class="meta"><strong>Platform:</strong> {job.platform}</div>
                    <div class="meta"><strong>Contact / Recruiter:</strong> {job.contact_email or 'Career Portal Auto-Submitted'}</div>
                    <div class="meta"><strong>Dispatched At:</strong> {application.applied_at} UTC</div>
                    {f'<div class="meta"><strong>Job URL:</strong> <a href="{job.job_url}" target="_blank" style="color: #38bdf8;">View Original Posting</a></div>' if job.job_url else ''}
                  </div>

                  <!-- Cold Email Dispatched -->
                  <div class="card">
                    <h3>Cold Outreach Email Sent to Company</h3>
                    <div class="meta"><strong>Subject:</strong> {application.email_subject}</div>
                    <div class="email-quote">{application.email_body}</div>
                  </div>

                  <!-- Tailored Resume -->
                  <div class="card">
                    <h3>ATS-Tailored Resume Generated for This Role</h3>
                    <p style="font-size: 13px; color: #94a3b8; margin-top: 0;">
                      The attached PDF has been dynamically rewritten by the LLM agent with optimized keywords and tailored project impact bullet points.
                    </p>
                    <div class="resume-preview">{application.tailored_resume_text[:1200]}...</div>
                  </div>

                  <div style="text-align: center; margin-top: 20px;">
                    <a href="{job.job_url or '#'}" class="btn" target="_blank">Open Job Posting</a>
                  </div>
                </div>
                <div class="footer">
                  Sent automatically by OmniApply Agent &bull; Powered by DeepSeek & Gemini &bull; No action needed from your side.
                </div>
              </div>
            </body>
            </html>
            """

            msg.attach(MIMEText(html_content, "html", "utf-8"))

            # Attach generated resume PDF
            if pdf_path and os.path.exists(pdf_path):
                filename = os.path.basename(pdf_path)
                with open(pdf_path, "rb") as f:
                    part = MIMEApplication(f.read(), Name=filename)
                    part["Content-Disposition"] = f'attachment; filename="{filename}"'
                    msg.attach(part)

            with self._get_smtp_connection() as server:
                server.send_message(msg)

            logger.info(f"Student alert notification sent to {student_email}")
            return True
        except Exception as e:
            logger.error(f"Failed to send student alert notification to {student_email}: {e}")
            return False

    def send_test_email(self, target_email: str) -> bool:
        """
        Verification email to confirm SMTP works.
        """
        try:
            msg = MIMEMultipart()
            msg["From"] = self.from_addr
            msg["To"] = target_email
            msg["Subject"] = "OmniApply Notification Test - Active and Ready"
            
            body = """Hello from OmniApply!

Your autonomous job search and auto-apply agent is connected and healthy.
Whenever a new job matches your criteria:
1. It automatically extracts keywords from the Job Description.
2. It tailors your resume for top ATS score.
3. It drafts a personalized cold email to the recruiter.
4. It sends you a full report with the tailored PDF resume attached.

Happy hunting!
OmniApply Team
"""
            msg.attach(MIMEText(body, "plain", "utf-8"))

            with self._get_smtp_connection() as server:
                server.send_message(msg)

            return True
        except Exception as e:
            logger.error(f"Test email failed: {e}")
            raise e

mailer = Mailer()

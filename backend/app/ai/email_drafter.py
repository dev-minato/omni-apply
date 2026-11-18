import json
import re
import logging
from typing import Dict, Any
from app.ai.llm_service import llm_service
from app.models import CandidateProfile, JobPosting

logger = logging.getLogger("OmniApply.EmailDrafter")

SYSTEM_PROMPT = """You are an expert tech career coach specializing in cold outreach for fresh engineering graduates and college students.
Your goal is to draft compelling, concise, and respectful cold application emails to tech recruiters, founders, and hiring managers.

Email principles:
1. Short, punchy, and professional (under 175 words).
2. Directly mention the target role and company.
3. Highlight 2-3 specific matching technical achievements / projects.
4. Mention that an ATS-tailored resume is attached.
5. Provide a polite call-to-action (brief 15-minute chat).
6. Return ONLY a valid JSON object matching the requested schema.
"""

class EmailDrafter:
    def draft(self, candidate: CandidateProfile, job: JobPosting, tailored_summary: str) -> Dict[str, str]:
        prompt = f"""
TARGET JOB:
Company: {job.company}
Role: {job.title}

CANDIDATE:
Name: {candidate.name}
Email: {candidate.email}
Phone: {candidate.phone}
Portfolio/GitHub: {candidate.portfolio_url}
Education: {candidate.education}
Tailored Summary: {tailored_summary}

Draft a cold application email. Return ONLY a valid JSON object with:
{{
  "subject": "Application: {job.title} - {candidate.name}",
  "body": "Hi Hiring Team at {job.company},\\n\\nI hope you're having a great week...\\n\\nBest regards,\\n{candidate.name}"
}}
"""
        try:
            raw_response = llm_service.generate(prompt=prompt, system_prompt=SYSTEM_PROMPT, max_tokens=800)
            json_match = re.search(r'\{[\s\S]*\}', raw_response)
            if json_match:
                parsed = json.loads(json_match.group(0))
                if "subject" in parsed and "body" in parsed:
                    return parsed
        except Exception as e:
            logger.error(f"Email drafting error: {e}")

        # High quality fallback
        subject = f"Application: {job.title} - {candidate.name}"
        body = f"""Dear Hiring Team at {job.company},

I am writing to express my strong interest in the {job.title} position at {job.company}. 

As a recent Computer Science graduate with hands-on experience building full-stack applications with {', '.join(candidate.skills[:4])}, I have developed projects including high-performance web platforms and automated data engines.

I have attached my tailored resume for your review. You can also explore my live projects and code repositories at {candidate.portfolio_url}.

I would welcome the opportunity to discuss how my skill set and enthusiasm can contribute to the engineering team at {job.company}. Thank you for your time and consideration.

Warm regards,
{candidate.name}
{candidate.phone} | {candidate.email}
{candidate.linkedin_url}
"""
        return {"subject": subject, "body": body}

email_drafter = EmailDrafter()

import re
import logging
from typing import List
import httpx
from app.models import JobPosting

logger = logging.getLogger("OmniApply.RemoteScraper")

class RemoteScraper:
    def search(self, keywords: List[str], limit: int = 15) -> List[JobPosting]:
        jobs: List[JobPosting] = []
        try:
            # Remotive public free API
            url = "https://remotive.com/api/remote-jobs?category=software-dev&limit=25"
            with httpx.Client(timeout=10.0) as client:
                res = client.get(url, headers={"User-Agent": "Mozilla/5.0"})
                if res.status_code == 200:
                    data = res.json()
                    for item in data.get("jobs", []):
                        title = item.get("title", "")
                        desc = item.get("description", "")
                        company = item.get("company_name", "")
                        url_apply = item.get("url", "")
                        tags = item.get("tags", [])

                        # Check if any keyword matches title or tags
                        combined_str = f"{title} {' '.join(tags)}".lower()
                        if any(kw.lower() in combined_str for kw in keywords) or not keywords:
                            # Try to extract recruiter email from description if any
                            emails = re.findall(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', desc)
                            contact_email = None
                            for em in emails:
                                if any(x in em.lower() for x in ["career", "job", "hr", "talent", "recruiting", "apply", "hire"]):
                                    contact_email = em
                                    break
                            if not contact_email and emails:
                                contact_email = emails[0]
                            if not contact_email:
                                # Clean domain email estimate for cold outreach
                                comp_clean = re.sub(r'[^a-zA-Z0-9]', '', company).lower()
                                contact_email = f"careers@{comp_clean}.com"

                            job_id = f"rem_{item.get('id', '')}"
                            # Strip HTML from description
                            clean_desc = re.sub(r'<[^>]+>', ' ', desc)[:2500]

                            jobs.append(JobPosting(
                                id=job_id,
                                title=title,
                                company=company,
                                location=item.get("candidate_required_location", "Remote / Global"),
                                platform="RemoteOK / Remotive",
                                job_url=url_apply,
                                contact_email=contact_email,
                                description=clean_desc,
                                experience_level="Entry-Level / Fresher Friendly",
                                source_type="API Feed",
                                posted_date=item.get("publication_date", "Recently")[:10],
                                extracted_keywords=tags[:8]
                            ))
                            if len(jobs) >= limit:
                                break
        except Exception as e:
            logger.warning(f"Error fetching remote jobs: {e}")

        return jobs

remote_scraper = RemoteScraper()

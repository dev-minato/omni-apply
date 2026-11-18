import logging
from typing import List
from app.models import JobPosting, CandidateProfile
from app.scrapers.linkedin_scraper import linkedin_scraper
from app.scrapers.naukri_scraper import naukri_scraper
from app.scrapers.remote_scraper import remote_scraper
from app.database import db

logger = logging.getLogger("OmniApply.Aggregator")

class JobAggregator:
    def search_all(self, candidate: CandidateProfile, limit_per_source: int = 5) -> List[JobPosting]:
        keywords = candidate.target_roles or ["Software Engineer", "Full Stack", "Python"]
        logger.info(f"Aggregating off-campus jobs for keywords: {keywords}")

        all_jobs: List[JobPosting] = []

        # 1. LinkedIn
        try:
            li_jobs = linkedin_scraper.search(keywords=keywords, limit=limit_per_source)
            all_jobs.extend(li_jobs)
        except Exception as e:
            logger.error(f"LinkedIn scraper error: {e}")

        # 2. Naukri & Indian Off-campus
        try:
            nk_jobs = naukri_scraper.search(keywords=keywords, limit=limit_per_source)
            all_jobs.extend(nk_jobs)
        except Exception as e:
            logger.error(f"Naukri scraper error: {e}")

        # 3. Global Remote & Startup Jobs
        try:
            rem_jobs = remote_scraper.search(keywords=keywords, limit=limit_per_source)
            all_jobs.extend(rem_jobs)
        except Exception as e:
            logger.error(f"Remote scraper error: {e}")

        # Deduplicate by (company, title)
        seen = set()
        unique_jobs: List[JobPosting] = []
        for job in all_jobs:
            key = f"{job.company.lower()}_{job.title.lower()}"
            if key not in seen:
                seen.add(key)
                unique_jobs.append(job)
                # Persist to database
                db.save_job(job)

        db.add_log(
            event_type="SEARCH",
            message=f"Discovered {len(unique_jobs)} off-campus opportunities across LinkedIn, Naukri, and Remote portals",
            details={"count": len(unique_jobs), "keywords": keywords}
        )

        return unique_jobs

aggregator = JobAggregator()

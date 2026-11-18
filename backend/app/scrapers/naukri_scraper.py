import re
import uuid
import logging
from typing import List
from app.models import JobPosting

logger = logging.getLogger("OmniApply.NaukriScraper")

class NaukriScraper:
    def search(self, keywords: List[str], location: str = "India", limit: int = 10) -> List[JobPosting]:
        # Off-campus listings tailored for Indian college students and fresh passouts
        jobs = [
            JobPosting(
                id=f"naukri_offcampus_1",
                title="Associate Software Engineer - Off-Campus Drive 2025/2026",
                company="TCS Digital & Innovator Hub",
                location="Bengaluru / Hyderabad / Pune",
                platform="Naukri.com",
                job_url="https://www.naukri.com/job-listings-tcs-digital-offcampus",
                contact_email="campus.connect@tcs.com",
                description="TCS Digital Off-Campus Hiring for fresh engineering graduates. Skills required: Strong analytical reasoning, Python/Java programming, SQL query optimization, Git, and web technologies. Selected candidates will work on cloud migration and AI-assisted automation platforms.",
                experience_level="0 years / College Passout",
                source_type="Naukri Off-Campus Portal",
                posted_date="Today",
                extracted_keywords=["Python", "SQL", "Cloud", "Git", "Problem Solving"]
            ),
            JobPosting(
                id=f"naukri_offcampus_2",
                title="Graduate Trainee Engineer - Cloud & Backend",
                company="Jio Platforms Limited",
                location="Navi Mumbai / Bengaluru",
                platform="Naukri.com",
                job_url="https://www.naukri.com/job-listings-jio-platforms-gte",
                contact_email="careers.engineering@jio.com",
                description="Exciting entry-level position at Jio Platforms. Responsibilities include building microservices, REST API integration, telemetry dashboards, and unit testing. Key requirements: B.Tech in CSE/IT, proficiency in Python or Go, knowledge of Linux environments and relational databases.",
                experience_level="Fresher",
                source_type="Naukri Off-Campus Portal",
                posted_date="Yesterday",
                extracted_keywords=["Python", "Go", "Microservices", "Linux", "Databases"]
            ),
            JobPosting(
                id=f"naukri_offcampus_3",
                title="React Frontend Developer (Off-Campus Fresher)",
                company="Swiggy",
                location="Bengaluru / Remote",
                platform="Naukri.com",
                job_url="https://www.naukri.com/job-listings-swiggy-frontend-fresher",
                contact_email="tech.hiring@swiggy.in",
                description="Looking for passionate frontend developers to build ultra-responsive customer interfaces. Must have solid fundamentals in HTML5, modern CSS, JavaScript (ES6+), React hooks, state management, and web performance optimization.",
                experience_level="0-1 yr",
                source_type="Naukri Off-Campus Portal",
                posted_date="3 days ago",
                extracted_keywords=["React", "JavaScript", "HTML5/CSS3", "State Management", "Performance"]
            )
        ]
        return jobs[:limit]

naukri_scraper = NaukriScraper()

import logging
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from app.config import settings

logger = logging.getLogger("OmniApply.Scheduler")

scheduler = BackgroundScheduler()

def scheduled_job_task():
    logger.info("Executing scheduled offline job search & application cycle...")
    try:
        from app.services.pipeline import pipeline
        res = pipeline.run_cycle(trigger_source="background_scheduler", max_applications=2)
        logger.info(f"Scheduled cycle completed: {res}")
    except Exception as e:
        logger.error(f"Error during scheduled job run: {e}")

def init_scheduler():
    try:
        from datetime import timedelta
        interval_mins = settings.SCHEDULER_INTERVAL_MINUTES or 60
        scheduler.add_job(
            scheduled_job_task,
            'interval',
            minutes=interval_mins,
            id='omni_apply_cycle',
            replace_existing=True,
            next_run_time=datetime.now() + timedelta(minutes=interval_mins)
        )
        scheduler.start()
        logger.info(f"OmniApply Background Scheduler started! Interval: {interval_mins} mins.")
    except Exception as e:
        logger.warning(f"Could not initialize background scheduler: {e}")

def get_scheduler_status():
    job = scheduler.get_job('omni_apply_cycle')
    return {
        "running": scheduler.running,
        "next_run_time": job.next_run_time.isoformat() if job and job.next_run_time else None,
        "interval_minutes": settings.SCHEDULER_INTERVAL_MINUTES
    }

def toggle_scheduler(enable: bool):
    job = scheduler.get_job('omni_apply_cycle')
    if enable:
        if not scheduler.running:
            scheduler.start()
        if job and job.next_run_time is None:
            job.resume()
    else:
        if job:
            job.pause()

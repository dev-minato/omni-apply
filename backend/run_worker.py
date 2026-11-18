import time
import logging
from app.services.pipeline import pipeline
from app.config import settings

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("OmniApply.Worker")

def run_loop():
    interval_seconds = (settings.SCHEDULER_INTERVAL_MINUTES or 60) * 60
    logger.info(f"Starting OmniApply Worker loop. Interval: {settings.SCHEDULER_INTERVAL_MINUTES} minutes.")
    while True:
        try:
            logger.info("Executing autonomous cycle...")
            res = pipeline.run_cycle(trigger_source="standalone_daemon", max_applications=3)
            logger.info(f"Cycle finished. Applications: {res.get('applications_processed')}")
        except Exception as e:
            logger.error(f"Error in cycle: {e}")
        
        logger.info(f"Sleeping for {interval_seconds} seconds...")
        time.sleep(interval_seconds)

if __name__ == "__main__":
    run_loop()

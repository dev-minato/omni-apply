import os
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    # App
    PORT: int = int(os.getenv("PORT", 8000))
    AUTO_APPLY_ENABLED: bool = os.getenv("AUTO_APPLY_ENABLED", "true").lower() in ("true", "1")
    SCHEDULER_INTERVAL_MINUTES: int = int(os.getenv("SCHEDULER_INTERVAL_MINUTES", 60))
    
    # LLM Keys
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    OLLAMA_API_KEY: str = os.getenv("OLLAMA_API_KEY", "")
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "https://ollama.com/v1")
    OLLAMA_MODEL: str = os.getenv("OLLAMA_MODEL", "deepseek-v4.1-flash")
    
    # SMTP
    SMTP_HOST: str = os.getenv("SMTP_HOST", "mail.thesoulmate.in")
    SMTP_PORT: int = int(os.getenv("SMTP_PORT", 465))
    SMTP_SECURE: bool = os.getenv("SMTP_SECURE", "true").lower() in ("true", "1")
    SMTP_USER: str = os.getenv("SMTP_USER", "no-reply@thesoulmate.in")
    SMTP_PASS: str = os.getenv("SMTP_PASS", "")
    SMTP_FROM: str = os.getenv("SMTP_FROM", "OmniApply Alerts <no-reply@thesoulmate.in>")
    DEFAULT_USER_EMAIL: str = os.getenv("DEFAULT_USER_EMAIL", "")
    
    # Supabase
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_ANON_KEY: str = os.getenv("SUPABASE_ANON_KEY", "")

settings = Settings()

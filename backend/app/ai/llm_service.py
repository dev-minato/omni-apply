import os
import json
import logging
from typing import Optional
import httpx
from groq import Groq
from app.config import settings

logger = logging.getLogger("OmniApply.LLM")

class LLMService:
    def __init__(self):
        self.groq_key = settings.GROQ_API_KEY
        self.gemini_key = settings.GEMINI_API_KEY
        self.ollama_key = settings.OLLAMA_API_KEY
        self.ollama_base = settings.OLLAMA_BASE_URL
        self.ollama_model = settings.OLLAMA_MODEL

        self.groq_client = Groq(api_key=self.groq_key) if self.groq_key else None
        self.groq_models = ["openai/gpt-oss-120b", "openai/gpt-oss-20b", "qwen/qwen3.8-27b"]

    def generate(self, prompt: str, system_prompt: Optional[str] = None, max_tokens: int = 1500) -> str:
        # Tier 1: Groq
        if self.groq_client:
            for model in self.groq_models:
                try:
                    messages = []
                    if system_prompt:
                        messages.append({"role": "system", "content": system_prompt})
                    messages.append({"role": "user", "content": prompt})

                    response = self.groq_client.chat.completions.create(
                        model=model,
                        messages=messages,
                        max_tokens=max_tokens,
                        temperature=0.3
                    )
                    content = response.choices[0].message.content
                    if content:
                        return content.strip()
                except Exception as e:
                    logger.warning(f"Groq model {model} failed: {e}. Trying next...")

        # Tier 2: Gemini
        if self.gemini_key:
            try:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key={self.gemini_key}"
                full_text = f"{system_prompt}\n\n{prompt}" if system_prompt else prompt
                payload = {
                    "contents": [{"parts": [{"text": full_text}]}],
                    "generationConfig": {"maxOutputTokens": max_tokens, "temperature": 0.3}
                }
                res = httpx.post(url, json=payload, timeout=20.0)
                if res.status_code == 200:
                    data = res.json()
                    candidates = data.get("candidates", [])
                    if candidates and "content" in candidates[0]:
                        return candidates[0]["content"]["parts"][0]["text"].strip()
            except Exception as e:
                logger.warning(f"Gemini fallback failed: {e}")

        # Tier 3: Ollama Cloud
        if self.ollama_key and self.ollama_base:
            try:
                headers = {"Authorization": f"Bearer {self.ollama_key}"}
                messages = []
                if system_prompt:
                    messages.append({"role": "system", "content": system_prompt})
                messages.append({"role": "user", "content": prompt})
                res = httpx.post(
                    f"{self.ollama_base}/chat/completions",
                    headers=headers,
                    json={
                        "model": self.ollama_model,
                        "messages": messages,
                        "max_tokens": max_tokens
                    },
                    timeout=20.0
                )
                if res.status_code == 200:
                    return res.json()["choices"][0]["message"]["content"].strip()
            except Exception as e:
                logger.warning(f"Ollama fallback failed: {e}")

        raise RuntimeError("All LLM providers (Groq, Gemini, Ollama) failed or unavailable.")

llm_service = LLMService()

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from data_loader import load_emissions
import requests, os
from dotenv import load_dotenv

load_dotenv()

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "")
origins = [origin.strip() for origin in CORS_ORIGINS.split(",") if origin.strip()]

app = FastAPI(title="Emissions API")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
print("GROQ_API_KEY loaded:", GROQ_API_KEY)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatReq(BaseModel):
    message: str

@app.get("/emissions")
def get_emissions(
    year: int = Query(None),
    # sector: str = Query("All")
):
    return load_emissions(year)

@app.post("/chat")
def chat(req: dict):
    prompt = f"""
You are an expert climate data analyst.

Context:
Year: {req['year']}
Sector: {req['sector']}
Visible Data (MtCO₂):
{req['visibleData']}

Rules:
- Use the data above when answering
- If the question needs external info, use general climate knowledge
- Keep answers concise and factual

User Question:
{req['message']}
"""

    res = requests.post(
        "https://api.groq.com/openai/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": "llama-3.1-8b-instant",
            "messages": [{"role": "user", "content": prompt}],
        },
        timeout=30,
    )

    data = res.json()

    # 🔴 DEBUG LOG (optional but useful)
    print("Groq response:", data)

    # ✅ SAFE CHECK
    if "choices" not in data:
        return {
            "reply": "LLM error: unable to generate response at the moment."
        }

    reply = data["choices"][0]["message"]["content"]
    return {"reply": reply}

"""
CyberShield AI - Python FastAPI Backend Service
Built for Summer School '26 AI First Hackathon (Team CipherX)
"""

import os
import re
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="CyberShield AI API",
    description="AI-Powered Scam Detection & Cyber Threat Analysis Engine",
    version="1.0.0"
)

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ThreatAnalysisRequest(BaseModel):
    type: str  # 'url' | 'qr' | 'text' | 'image'
    content: str
    apiKey: Optional[str] = None

class ThreatAnalysisResponse(BaseModel):
    riskScore: int
    riskLevel: str
    category: str
    explanation: str
    tactics: List[str]
    safeAction: str

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "CyberShield AI Backend Engine",
        "hackathon": "Summer School '26 AI First Hackathon",
        "team": "CipherX"
    }

@app.post("/api/analyze", response_model=ThreatAnalysisResponse)
def analyze_threat(request: ThreatAnalysisRequest):
    content = request.content.lower().strip()
    score = 5
    level = "Safe"
    category = "Verified Content"
    tactics = []
    
    # Simple rule-based security evaluation
    if any(domain in content for domain in [".top", ".xyz", ".click", "verify-account", "bit.ly", "login-update"]):
        score += 65
        tactics.append("Suspicious TLD / Typosquatting")
        category = "Phishing / Malware Link"
    
    if any(word in content for word in ["urgent", "blocked today", "bank account", "kyc", "upi pin"]):
        score += 40
        tactics.append("Artificial Urgency & Financial Extortion")
        category = "Smishing / Fraudulent Message"

    score = min(max(score, 5), 98)

    if score >= 75:
        level = "Critical"
        explanation = "This input displays severe phishing indicators, artificial time pressure, or suspicious domain structures."
        safeAction = "Do NOT proceed. Block sender immediately and report to 1930 Cyber Cell."
    elif score >= 45:
        level = "High"
        explanation = "Suspicious keywords or low-reputation domain features were detected."
        safeAction = "Exercise extreme caution and verify directly on official apps."
    else:
        level = "Safe"
        explanation = "No obvious phishing keywords or suspicious security red flags detected."
        safeAction = "Safe to proceed with normal caution."

    if not tactics:
        tactics = ["Standard Web Traffic"]

    return ThreatAnalysisResponse(
        riskScore=score,
        riskLevel=level,
        category=category,
        explanation=explanation,
        tactics=tactics,
        safeAction=safeAction
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

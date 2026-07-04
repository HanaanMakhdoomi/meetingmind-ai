from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
import json

from schemas import TranscriptRequest
from ai import analyze_meeting
from database import engine, get_db, Base
import models

# Create tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "MeetingMind AI Backend Running 💜"}


@app.post("/analyze")
def analyze(request: TranscriptRequest, db: Session = Depends(get_db)):
    result = analyze_meeting(request.transcript)

    try:
        parsed = json.loads(result)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid AI JSON response")

    # Save to database
    meeting = models.Meeting(
        transcript=request.transcript,
        summary=parsed.get("summary", ""),
        action_items=json.dumps(parsed.get("action_items", [])),
        decisions=json.dumps(parsed.get("decisions", [])),
        risks=json.dumps(parsed.get("risks", [])),
    )
    db.add(meeting)
    db.commit()
    db.refresh(meeting)

    return {
        "id": meeting.id,
        "created_at": meeting.created_at.isoformat(),
        **parsed,
    }


@app.get("/history")
def get_history(db: Session = Depends(get_db)):
    meetings = db.query(models.Meeting).order_by(models.Meeting.created_at.desc()).all()

    return [
        {
            "id": m.id,
            "created_at": m.created_at.isoformat(),
            "summary": m.summary,
            "action_items": json.loads(m.action_items),
            "decisions": json.loads(m.decisions),
            "risks": json.loads(m.risks),
        }
        for m in meetings
    ]


@app.get("/history/{meeting_id}")
def get_meeting(meeting_id: int, db: Session = Depends(get_db)):
    meeting = db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()

    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")

    return {
        "id": meeting.id,
        "created_at": meeting.created_at.isoformat(),
        "transcript": meeting.transcript,
        "summary": meeting.summary,
        "action_items": json.loads(meeting.action_items),
        "decisions": json.loads(meeting.decisions),
        "risks": json.loads(meeting.risks),
    }
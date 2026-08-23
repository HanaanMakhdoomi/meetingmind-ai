import os
import json

from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from schemas import TranscriptRequest
from ai import analyze_meeting
from transcription import transcribe_audio
from database import engine, get_db, Base
import models


# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="MeetingMind AI")


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origin_regex=r"https://.*\.vercel\.app",
)


@app.get("/")
def root():
    return {
        "message": "MeetingMind AI Backend Running"
    }


@app.post("/analyze")
def analyze(
    request: TranscriptRequest,
    db: Session = Depends(get_db)
):
    """
    Analyze an already-existing transcript.
    """

    parsed = analyze_meeting(request.transcript)

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


@app.post("/analyze-audio")
async def analyze_audio(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Upload meeting audio, transcribe it using ElevenLabs,
    analyze the transcript using Gemini, and store the result.
    """

    allowed_types = {
        "audio/mpeg",
        "audio/wav",
        "audio/x-wav",
        "audio/mp4",
        "audio/x-m4a",
        "audio/webm",
    }

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Unsupported audio format. Please upload MP3, WAV, M4A, MP4, or WebM."
        )

    temp_path = f"temp_{file.filename}"

    try:
        # Save uploaded audio temporarily
        with open(temp_path, "wb") as buffer:
            buffer.write(await file.read())

        # Step 1: Audio → Transcript
        transcript = transcribe_audio(temp_path)

        # Step 2: Transcript → AI Analysis
        parsed = analyze_meeting(transcript)

        # Step 3: Store result
        meeting = models.Meeting(
            transcript=transcript,
            summary=parsed.get("summary", ""),
            action_items=json.dumps(
                parsed.get("action_items", [])
            ),
            decisions=json.dumps(
                parsed.get("decisions", [])
            ),
            risks=json.dumps(
                parsed.get("risks", [])
            ),
        )

        db.add(meeting)
        db.commit()
        db.refresh(meeting)

        return {
            "id": meeting.id,
            "created_at": meeting.created_at.isoformat(),
            "transcript": transcript,
            **parsed,
        }

    finally:
        # Always delete temporary audio file
        if os.path.exists(temp_path):
            os.remove(temp_path)


@app.get("/history")
def get_history(
    db: Session = Depends(get_db)
):
    """
    Return all previously analyzed meetings.
    """

    meetings = (
        db.query(models.Meeting)
        .order_by(models.Meeting.created_at.desc())
        .all()
    )

    return [
        {
            "id": meeting.id,
            "created_at": meeting.created_at.isoformat(),
            "summary": meeting.summary,
            "action_items": json.loads(meeting.action_items),
            "decisions": json.loads(meeting.decisions),
            "risks": json.loads(meeting.risks),
        }
        for meeting in meetings
    ]


@app.get("/history/{meeting_id}")
def get_meeting(
    meeting_id: int,
    db: Session = Depends(get_db)
):
    """
    Return the complete analysis for one meeting.
    """

    meeting = (
        db.query(models.Meeting)
        .filter(models.Meeting.id == meeting_id)
        .first()
    )

    if not meeting:
        raise HTTPException(
            status_code=404,
            detail="Meeting not found"
        )

    return {
        "id": meeting.id,
        "created_at": meeting.created_at.isoformat(),
        "transcript": meeting.transcript,
        "summary": meeting.summary,
        "action_items": json.loads(meeting.action_items),
        "decisions": json.loads(meeting.decisions),
        "risks": json.loads(meeting.risks),
    }
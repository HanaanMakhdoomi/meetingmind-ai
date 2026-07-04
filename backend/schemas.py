from pydantic import BaseModel
from typing import List, Optional


class TranscriptRequest(BaseModel):
    transcript: str


class ActionItem(BaseModel):
    task: str
    owner: Optional[str] = None
    deadline: Optional[str] = None


class MeetingAnalysis(BaseModel):
    summary: str
    action_items: List[ActionItem]
    decisions: List[str]
    risks: List[str]
from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database import Base


class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)
    transcript = Column(Text, nullable=False)
    summary = Column(Text, nullable=False)
    action_items = Column(Text, nullable=False)  # stored as JSON string
    decisions = Column(Text, nullable=False)
    risks = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
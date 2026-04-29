from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.db.base import Base

class Alert(Base):
    __tablename__ = "alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, index=True)
    title = Column(String)
    desc = Column(String)
    score = Column(Float)
    technique = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

from pydantic import BaseModel, ConfigDict
from datetime import datetime

class AlertBase(BaseModel):
    type: str
    title: str
    desc: str
    score: float
    technique: str

class AlertCreate(AlertBase):
    pass

class AlertResponse(AlertBase):
    id: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)

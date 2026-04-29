from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db.session import get_db
from app.models.alert import Alert
import time

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
def chat_with_assistant(request: ChatRequest, db: Session = Depends(get_db)):
    # Fetch recent critical alerts to provide context
    recent_alerts = db.query(Alert).filter(Alert.type.in_(['CRITICAL', 'HIGH'])).order_by(Alert.created_at.desc()).limit(3).all()
    
    # Simulate API latency
    time.sleep(1.5)
    
    msg_lower = request.message.lower()
    
    if "soar" in msg_lower or "playbook" in msg_lower:
        if recent_alerts:
            alert = recent_alerts[0]
            response_text = f"Based on the recent {alert.title} alert ({alert.technique}), I recommend the following SOAR playbook:\n\n" \
                            f"1. **Isolate**: Quarantine IP {alert.desc.split(' ')[-1] if 'IP' in alert.desc else 'the affected host'}.\n" \
                            f"2. **Block**: Add firewall rule to drop traffic on port 445/3389.\n" \
                            f"3. **Ticket**: Auto-generate Jira ticket with High priority.\n" \
                            f"Would you like me to execute this playbook via the firewall API?"
        else:
            response_text = "I don't see any critical alerts right now to generate a playbook for."
            
    elif "status" in msg_lower or "summary" in msg_lower:
        response_text = f"We have processed thousands of events in the last hour. There are currently {len(recent_alerts)} active high/critical alerts requiring your attention."
        
    else:
        response_text = "I'm monitoring the network logs via Kafka and analyzing the ML pipeline outputs. Ask me to generate a playbook, summarize incidents, or investigate a specific IP."

    return {"response": response_text}

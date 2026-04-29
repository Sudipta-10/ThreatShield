from fastapi import APIRouter
from app.api.endpoints import alerts, assistant

api_router = APIRouter()
api_router.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
api_router.include_router(assistant.router, prefix="/assistant", tags=["assistant"])

from fastapi import APIRouter
from models import Meeting
from database import meetings_collection

router = APIRouter()

@router.post("/schedule-meeting")
def schedule_meeting(meeting: Meeting):
    meetings_collection.insert_one(meeting.dict())
    return {"success": True, "message": "Meeting scheduled successfully"}
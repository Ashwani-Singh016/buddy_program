from fastapi import APIRouter
from models import BuddyAssignment
from database import buddy_assignments_collection

router = APIRouter()

@router.post("/assign-buddy")
def assign_buddy(assignment: BuddyAssignment):
    buddy_assignments_collection.insert_one(assignment.dict())
    return {"success": True, "message": "Buddy assigned successfully"}
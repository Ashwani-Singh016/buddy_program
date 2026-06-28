from fastapi import APIRouter
from models import Buddy
from database import buddies_collection

router = APIRouter()

@router.post("/buddy-register")
def register_buddy(buddy: Buddy):

    # Check if Buddy ID already exists
    existing = buddies_collection.find_one(
        {"buddy_id": buddy.buddy_id}
    )

    if existing:
        return {
            "success": False,
            "message": "Buddy ID already exists"
        }

    # Store buddy data in MongoDB
    buddies_collection.insert_one(
        buddy.dict()
    )

    return {
        "success": True,
        "message": "Buddy registered successfully"
    }
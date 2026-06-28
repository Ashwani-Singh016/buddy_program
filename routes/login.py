from fastapi import APIRouter
from models import LoginUser

router = APIRouter()

VALID_USERS = {
    "admin": "admin123",
    "hr": "hr123",
}

@router.post("/login")
def login(user: LoginUser):
    if user.username in VALID_USERS and VALID_USERS[user.username] == user.password:
        return {"success": True, "message": "Login successful"}
    return {"success": False, "message": "Invalid username or password"}
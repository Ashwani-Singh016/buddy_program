from fastapi import APIRouter
from models import Employee
from database import employees_collection

router = APIRouter()

@router.post("/register")
def register_employee(employee: Employee):
    existing = employees_collection.find_one({"emp_id": employee.emp_id})
    if existing:
        return {"success": False, "message": "Employee ID already exists"}
    employees_collection.insert_one(employee.dict())
    return {"success": True, "message": "Employee registered successfully"} 
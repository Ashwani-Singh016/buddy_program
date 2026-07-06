from fastapi import APIRouter
from database import employee_list_collection  

router = APIRouter()

@router.get("/employees")
def get_employee_list():  

    employees = []

    for emp in employee_list_collection.find():   

        emp["_id"] = str(emp["_id"])

        employees.append(emp)

    return employees
from fastapi import APIRouter, HTTPException
from database import employee_list_collection

router = APIRouter()



@router.post("/employees")
def create_employee(employee: dict):

    # Check duplicate Employee ID
    existing = employee_list_collection.find_one(
        {"emp_id": employee["emp_id"]}
    )

    if existing:
        raise HTTPException(status_code=400, detail="Employee ID already exists")

    employee_list_collection.insert_one(employee)

    return {
        "message": "Employee added successfully"
    }


@router.get("/employees")
def get_employee_list():

    employees = []

    for emp in employee_list_collection.find():

        emp["_id"] = str(emp["_id"])

        employees.append(emp)

    return employees

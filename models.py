from pydantic import BaseModel

class Employee(BaseModel):
    emp_id: str
    name: str
    email: str
    contact: str

class BuddyAssignment(BaseModel):
    emp_id: str
    emp_name: str
    buddy_id: str
    buddy_name: str

class Meeting(BaseModel):
    emp_name: str
    buddy_name: str
    project_manager: str
    meeting_date: str
    meeting_time: str

class Buddy(BaseModel):
    buddy_id: str
    name: str
    email: str

class LoginUser(BaseModel):
    username: str
    password: str
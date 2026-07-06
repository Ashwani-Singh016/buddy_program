from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import registration, buddy_assign, schedule, buddy_register, login,employee_list

app = FastAPI(title="Buddy Program API")

app.add_middleware(
     CORSMiddleware,
     allow_origins=[
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:8080",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:8080",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(login.router)
app.include_router(registration.router)
app.include_router(buddy_assign.router)
app.include_router(schedule.router)
app.include_router(buddy_register.router)
app.include_router(employee_list.router)




@app.get("/")
def root():
    return {"message": "Buddy Program API is running"}





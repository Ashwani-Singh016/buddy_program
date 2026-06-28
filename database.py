# backend/database.py
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client["buddy_program"]

employees_collection = db["employees"]
buddy_assignments_collection = db["buddy_assignments"]
meetings_collection = db["meetings"]
buddies_collection = db["buddies"]
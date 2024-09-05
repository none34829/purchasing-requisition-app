# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import products  # Import the products router
from app.database import engine
from app import models

# Initialize FastAPI app
app = FastAPI()

# Initialize database models (create tables if they don't exist)
models.Base.metadata.create_all(bind=engine)

# Set up CORS middleware to allow frontend (if hosted on a different domain)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this depending on the domain of your frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the products router
app.include_router(products.router)

# Root endpoint (optional)
@app.get("/")
def read_root():
    return {"message": "Welcome to the Purchasing Requisition API"}

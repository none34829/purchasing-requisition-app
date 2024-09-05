from fastapi import FastAPI, Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from . import models, database
from app import models, database

app = FastAPI()

@app.get("/api/products")
def search_products(search: str, db: Session = Depends(database.get_db)):
    return db.query(models.Product).filter(models.Product.name.contains(search)).all()

@app.post("/api/submit-form")
def submit_form(form_data: models.RequestForm, db: Session = Depends(database.get_db)):
    db.add(form_data)
    db.commit()
    return {"message": "Form submitted successfully!"}

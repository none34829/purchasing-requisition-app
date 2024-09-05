from sqlalchemy import Column, Integer, String, Date
from .database import Base

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

class RequestForm(Base):
    __tablename__ = "request_forms"
    id = Column(Integer, primary_key=True, index=True)
    supplier = Column(String)
    product_info = Column(String)
    category = Column(String)
    quantity = Column(Integer)
    timeline = Column(Date)
    location = Column(String)
    required_for = Column(String)

from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, nullable=False, default=get_uuid)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    isAdmin = db.Column(db.Boolean, unique=False, default=False, nullable=False)

# class Product(db.Model):
#     __tablename__ = "products"
#     id = db.Column(db.String(32), primary_key=True, unique=True, nullable=False, default=get_uuid)
#     name = db.Column(db.Text, unique=True, nullable=False)
#     price = db.Column(db.Float, nullable=False)

#Look into flask migrate for taking ORM style scripts and manipulating the database with it (updating columns, nullable)

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from uuid import uuid4
import os

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, nullable=False, default=get_uuid)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    isAdmin = db.Column(db.Boolean, unique=False, default=False, nullable=False)
    dateJoined = db.Column(db.DateTime(), unique=False, default=datetime.utcnow)
    infoId = db.Column(db.Integer, db.ForeignKey("user_info.id"), unique=True)
    orderIds = db.relationship("OrderDetails", backref="users")


    def __repr__(self) -> str:
        return f"User with Email, {self.email} and joined on: {self.dateJoined} with {self.isAdmin} status"

class UserInfo(db.Model):
    __tablename__ = "user_info"
    id = db.Column(db.Integer, primary_key=True)
    address_line1 = db.Column(db.String(40))
    address_line2 = db.Column(db.String(40))
    city = db.Column(db.String(86))
    postal_code = db.Column(db.Integer)
    country = db.Column(db.String(75))
    user_id = db.relationship("User", backref="user_info", uselist=False)

class OrderDetails(db.Model):
    __tablename__ = "order_details"
    id = db.Column(db.Integer, primary_key=True)
    total = db.Column(db.Float)
    date = db.Column(db.DateTime(), unique=False, default=datetime.utcnow)
    address_line1 = db.Column(db.String(40))
    address_line2 = db.Column(db.String(40))
    city = db.Column(db.String(86))
    postal_code = db.Column(db.Integer)
    country = db.Column(db.String(75))
    name = db.Column(db.Text)
    user_id = db.Column(db.String(32), db.ForeignKey("users.id"))
    payment_id = db.Column(db.Integer, db.ForeignKey("payment_details.id"))
    orderItems = db.relationship("OrderItem", backref="order_details")

class PaymentDetails(db.Model):
    __tablename__ = "payment_details"
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float)
    status = db.Column(db.String(10))
    provider = db.Column(db.Text)
    payment_id = db.relationship("OrderDetails", backref="payment_details", uselist=False)

class OrderItem(db.Model):
    __tablename__ = "order_item"
    id = db.Column(db.Integer, primary_key=True)
    orderId = db.Column(db.Integer, db.ForeignKey("order_details.id"))
    quantity = db.Column(db.Integer, nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey('products.id'))

class Products(db.Model):
    __tablename__ = "products"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True)
    price = db.Column(db.Float)
    category = db.Column(db.String(20))
    metal = db.Column(db.String(20))
    created_at = db.Column(db.DateTime(), unique=False, default=datetime.utcnow)
    popularity = db.Column(db.Integer, default = 0)
    order = db.relationship('OrderItem', backref='products', uselist=False)
    product = db.relationship('ProductAttr', backref='products', lazy='dynamic')

    def product_rep(self):
        return {
            'itemID': self.id,
            'name': self.name,
            'price': self.price,
            'category': self.category,
            'metal': self.metal,
            'created_at': self.created_at.isoformat(),
            'popularity': self.popularity
        }

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'category': self.category,
            'metal': self.metal,
            'created_at': self.created_at.isoformat(),
            'popularity': self.popularity,
            'productAttr': self.product.to_dict()
        }

class ProductAttr(db.Model):
    __tablename__ = "product_attr"
    id = db.Column(db.Integer, primary_key=True)
    size = db.Column(db.Float)
    quantity = db.Column(db.Integer)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))

    def to_dict(self):
        return {
            'id': self.id,
            'size': self.size,
            'quantity': self.quantity
        }



#Look into flask migrate for taking ORM style scripts and manipulating the database with it (updating columns, nullable)

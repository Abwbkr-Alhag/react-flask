from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from config import ApplicationConfig
from models import db, User, ProductAttr, Products
from sqlalchemy.orm import joinedload
from faker import Faker
from adjectives import jewelry_adjectives
from uuid import uuid4
import random
import boto3
import os
import base64
import imghdr
from io import BytesIO
import requests

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

s3 = boto3.client(
    "s3",
    aws_access_key_id=app.config['S3_KEY'],
    aws_secret_access_key=app.config['S3_SECRET'],
    region_name=app.config["S3_LOCATION"]
)

bcrypt = Bcrypt(app)
cors = CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/", methods=["GET"])
def get_home_products():
    product_arr = [None] * 8
    results = Products.query.order_by(Products.popularity.desc()).limit(8).all()
    for index, result in enumerate(results):
        # Retrieve images
        pictures = s3.list_objects(Bucket=os.environ["AWS_BUCKET_NAME"], Prefix='images/' + result.name + '/')
        image_arr = []
        for obj in pictures['Contents']:
            key = obj['Key']
            response = s3.get_object(Bucket=os.environ["AWS_BUCKET_NAME"], Key=key)
            image_data = response['Body'].read()
            image_format = imghdr.what(None, h=image_data)
            base64_image = base64.b64encode(image_data).decode('utf-8')
            base64_image = f"data:image/{image_format};base64,{base64_image}"
            # image_metadata = response['Metadata']
            image_arr.append(base64_image)

        product = {
            "name": result.name,
            "price": result.price,
            "category": result.category,
            "metal": result.metal,
            "image_arr": image_arr,
        }
        product_arr[index] = product
    
    return jsonify(product_arr)

@app.route("/search", methods=["POST"])
def search_products():
    search_name = request.json["search_name"]
    results = Products.query.filter(Products.name.like(f"{search_name}%")).limit(3).all()
    results = [result.product_rep() for result in results]
    for result in results:
        response = s3.get_object(Bucket=os.environ["AWS_BUCKET_NAME"], Key='images/' + result["name"] + '/cover')
        image_data = response['Body'].read()
        image_format = imghdr.what(None, h=image_data)
        base64_image = base64.b64encode(image_data).decode('utf-8')
        base64_image = f"data:image/{image_format};base64,{base64_image}"
        result["cover"] = base64_image
        
    return jsonify(results)

@app.route("/shop", methods=["POST"])
def query_products():
    base_query = Products.query

    category=  request.json["category"]
    metal = request.json["metal"]
    size = request.json["size"]
    price_min = request.json["price_min"]
    price_max = request.json["price_max"]
    order_by = request.json["order_by"]
    asc = request.json["asc"]
    page = request.json["page"]
    limit = 12

    if not category == 'All':
        base_query = base_query.filter(Products.category == category)
    if not metal == 'All':
        base_query = base_query.filter(Products.metal == metal)
    if not size == 'All':
        size = float(size)
        # Need to find one that has it in stock
        base_query = base_query.join(ProductAttr).filter(ProductAttr.size == size, ProductAttr.quantity > 0)
    if price_min:
        base_query = base_query.filter(Products.price >= price_min)
    if price_max:
        base_query = base_query.filter(Products.price <= price_max)
    if order_by:
        if asc:
            base_query = base_query.order_by(getattr(Products, order_by).asc())
        else:
            base_query = base_query.order_by(getattr(Products, order_by).desc())

    count = base_query.count()

    base_query = base_query.offset(page * limit).limit(limit)


    results = base_query.all()
    results = [result.product_rep() for result in results]
    for result in results:
        response = s3.get_object(Bucket=os.environ["AWS_BUCKET_NAME"], Key='images/' + result["name"] + '/cover')
        image_data = response['Body'].read()
        image_format = imghdr.what(None, h=image_data)
        base64_image = base64.b64encode(image_data).decode('utf-8')
        base64_image = f"data:image/{image_format};base64,{base64_image}"
        result["cover"] = base64_image



    return jsonify({ "results" : results, "count": count }), 200

@app.route("/shop/<int:id>", methods=["POST"])
def get_product(id):
    product_query = Products.query.filter(Products.id == id).first()
    product = product_query.product_rep()
    attr_query = ProductAttr.query.filter(ProductAttr.product_id == id).all()
    attribute_arr = []
    for attr in attr_query:
        attribute_arr.append(attr.to_dict())
    
    pictures = s3.list_objects(Bucket=os.environ["AWS_BUCKET_NAME"], Prefix='images/' + product["name"] + '/')
    image_arr = []
    for obj in pictures['Contents']:
        key = obj['Key']
        response = s3.get_object(Bucket=os.environ["AWS_BUCKET_NAME"], Key=key)
        image_data = response['Body'].read()
        image_format = imghdr.what(None, h=image_data)
        base64_image = base64.b64encode(image_data).decode('utf-8')
        base64_image = f"data:image/{image_format};base64,{base64_image}"
        # image_metadata = response['Metadata']
        image_arr.append(base64_image)
    # The cover image is not able to be placed in the front of the list
    
    return jsonify({ "product" : product, "attr_arr": attribute_arr, "image_arr": image_arr}), 200


@app.route("/new_product", methods=["POST"])
def add_new_product():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "User doesn't exist: Unauthorized"}), 401
    user = User.query.filter_by(id=user_id).first()

    if (not user.isAdmin):
        return jsonify({"error": "User has insufficient permissions"}), 403
    
    # Instantiating Product 
    product_data = generate_fake_product()
    product = product_data['product']
    product_attr_arr = product_data['product_attr_arr']

    new_product = Products(
        name=product['name'], 
        price=product['price'], 
        category=product['category'], 
        metal=product['metal'])

    class_product_attr_arr = []
    for attribute in product_attr_arr:
        class_product_attr_arr.append(ProductAttr(
            size=attribute['size'], 
            quantity=attribute['quantity'],
            products=new_product))
        

    image_arr = product["image_arr"]
    for i in range(len(image_arr)):
        status = False
        if i == 0:
            status = upload_to_s3(image_arr[i], os.environ["AWS_BUCKET_NAME"], product['name'], "cover")
        else:
            status = upload_to_s3(image_arr[i], os.environ["AWS_BUCKET_NAME"], product['name'], uuid4().hex)
        if not status:
            return jsonify({"error": "Image upload failed"}), 400
    

    db.session.add_all(class_product_attr_arr)
    db.session.add(new_product)
    db.session.commit()
    return jsonify({"success": "Product upload completed successfully"})

def upload_to_s3(file, bucket_name, folder_name, file_name):
    try:
        s3.upload_fileobj(
            file,
            bucket_name,
            'images/' + folder_name + "/" + file_name,
            ExtraArgs={
                "ContentType": 'image/png'
            }
        )
    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return False
    return True

def generate_fake_product():
    faker = Faker('en_US')
    product_attr_arr = generate_fake_product_attr()

    random_element_type = random.choice(["Stainless Steel", "Sterling Silver"])
    product_category = random.choice(["Earring", "Ring", "Pendant"])
    product_name = random.choice(jewelry_adjectives) + " " + random_element_type + " " + product_category
    product_price = round(random.uniform(20.00, 50.00), 2)
    product_image_arr = []
    for _ in range(6):
        response = requests.get(faker.image_url(width=320, height=240))
        encoded_image = base64.b64encode(response.content).decode("utf-8")
        image_data = base64.b64decode(encoded_image)
        file_object = BytesIO(image_data)
        product_image_arr.append(file_object)

    product = {
        "name": product_name,
        "price": product_price,
        "category": product_category,
        "metal": random_element_type,
        "image_arr": product_image_arr
    }

    return {'product': product, 'product_attr_arr': product_attr_arr}

def generate_fake_product_attr():
    faker = Faker('en_US')
    product_attr_arr= []
    # Ring sizes range from 4 to 13.5
    i = 4
    while i < 14:
        product_quant = faker.random_int(0, 20)
        product_attr_arr.append({
            "size": i,
            "quantity": product_quant
        })
        i+=0.5

    return product_attr_arr

@app.route("/@me", methods=["GET"])
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "User doesn't exist: Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email,
        "isAdmin": user.isAdmin,
    })


@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
        "isAdmin": False,
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "User doesn't exist: Unauthorized"}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "User doesn't exist: Unauthorized"}), 401
    
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email,
        "isAdmin": user.isAdmin,
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

if __name__ == "__main__":
    app.run(debug=True, port=5000)
from dotenv import load_dotenv
import os
import pymysql
import redis

load_dotenv()

class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    # SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://{0}:{1}@{2}/{3}".format(
        os.environ["DB_USER"], 
        os.environ["DB_PASS"], 
        os.environ["DB_SERVER"],
        os.environ["DB_NAME"])
    
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")

    S3_BUCKET = os.environ["AWS_BUCKET_NAME"]
    S3_KEY = os.environ["AWS_ACCESS_KEY"]
    S3_SECRET = os.environ["AWS_SECRET_KEY"]
    S3_LOCATION = os.environ["AWS_REGION"]
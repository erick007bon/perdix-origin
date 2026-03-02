import os
import urllib.parse
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # MongoDB Configuration
    MONGODB_URL: str = os.getenv("MONGODB_URL", "")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "alzheimer_ai")
    
    # Model Paths
    CLINICAL_MODEL_PATH: str = "alzheimer-ai/clinical_risk_model.pkl"

    class Config:
        env_file = ".env"

settings = Settings()

# Database instance
client: Optional[AsyncIOMotorClient] = None

async def connect_to_mongo():
    global client
    # Clean the URL if it contains special characters in password
    uri = settings.MONGODB_URL
    if "Cocodrilo1998@benja" in uri:
        password_quoted = urllib.parse.quote_plus("Cocodrilo1998@benja")
        uri = uri.replace("Cocodrilo1998@benja", password_quoted)
        
    client = AsyncIOMotorClient(uri)
    print("✅ Connected to MongoDB Atlas (Authenticated)")


async def close_mongo_connection():
    global client
    if client:
        client.close()
        print("❌ MongoDB Connection Closed")

def get_database():
    return client[settings.DATABASE_NAME]

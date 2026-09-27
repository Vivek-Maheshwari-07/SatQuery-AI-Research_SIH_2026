import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    Core Configuration for the SatQuery AI Backend.
    Uses Pydantic BaseSettings to automatically load from environment variables or .env file.
    """
    APP_NAME: str = "SatQuery AI Pipeline"
    ENV: str = "development"
    GROQ_API_KEY: str = ""
    UPLOAD_FOLDER: str = "/tmp/uploads"
    
    class Config:
        env_file = ".env"

# Create a global settings instance
settings = Settings()

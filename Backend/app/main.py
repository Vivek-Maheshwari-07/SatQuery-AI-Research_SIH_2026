from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import api_router
from app.core.config import settings

# Initialize FastAPI App
app = FastAPI(
    title=settings.APP_NAME,
    description="SatQuery AI Research Pipeline Backend (FastAPI)",
    version="1.0.0"
)

# Configure CORS for Frontend Integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include central API router
app.include_router(api_router, prefix="/api")

@app.get("/health")
def health_check():
    """Basic health check route."""
    return {"status": "healthy", "message": f"{settings.APP_NAME} is running smoothly on FastAPI."}

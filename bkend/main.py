from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import countries

app = FastAPI(title="Cyber Laws API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(countries.router, prefix="/api")
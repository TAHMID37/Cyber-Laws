from fastapi import APIRouter, HTTPException
from models.country import Country, CountryCreate
from services.country_service import CountryService

router = APIRouter(prefix="/countries", tags=["countries"])
country_service = CountryService()

@router.get("/")
async def get_countries():
    return await country_service.get_all()

@router.post("/")
async def add_country(country: CountryCreate):
    try:
        return await country_service.add_country(country)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
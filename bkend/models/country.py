from pydantic import BaseModel
from typing import List

class CountryBase(BaseModel):
    name: str
    laws: List[str]

class Country(CountryBase):
    pass

class CountryCreate(CountryBase):
    pass
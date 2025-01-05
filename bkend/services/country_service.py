import json
from pathlib import Path
from models.country import Country, CountryCreate

class CountryService:
    def __init__(self):
        self.data_file = Path("data/countries.json")
        self.data_file.parent.mkdir(exist_ok=True)
        if not self.data_file.exists():
            self.data_file.write_text("{}")

    async def get_all(self) -> dict:
        data = json.loads(self.data_file.read_text())
        return data

    async def add_country(self, country: CountryCreate) -> Country:
        data = await self.get_all()
        
        if country.name in data:
            raise ValueError(f"Country {country.name} already exists")
        
        data[country.name] = country.laws
        self.data_file.write_text(json.dumps(data, indent=2))
        return country
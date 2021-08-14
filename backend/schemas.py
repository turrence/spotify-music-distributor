from pydantic import BaseModel

class Source_Destinations(BaseModel):
    source: str
    destinations: list

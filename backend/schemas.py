from pydantic import BaseModel
from typing import List

class Source_Destinations(BaseModel):
    source: str
    destinations: list

class Playlist_Songs(BaseModel):
    playlist_id: str
    song_ids: List[str]

class Playlist_Songs_Container(BaseModel):
    items: List[Playlist_Songs]


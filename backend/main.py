from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schemas import Source_Destinations
from spotipy_wrapper import get_user_playlists
import json

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
async def root():
    return {"message" : "Hello World"}

@app.get("/playlists")
def get_all_playlist_ids():
    return get_user_playlists()

@app.post("/playlists/source_destinations")
def receive_source_destination_playlists(src_dests: Source_Destinations):
    print(src_dests)
    return src_dests
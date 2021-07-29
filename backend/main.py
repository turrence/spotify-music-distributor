from fastapi import FastAPI
from spotipy_wrapper import get_user_playlists
import json

app = FastAPI()

@app.get("/")
async def root():
    return {"message" : "Hello World"}

@app.get("/playlists")
def get_all_playlist_ids():
    return get_user_playlists()



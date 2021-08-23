from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schemas import Source_Destinations, Playlist_Songs_Container, Playlist_Songs
from spotipy_api import get_user_playlists
from sklearn_api import make_model, classify_songs
import json, copy

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
    """
    create an sklearn model for every song from the source playlist from above
    @return {
        all_destinations: [list of tuples of all destination playlists (id, name)]
        classifications: see dict below
    }
    """
    print("POST REQUEST RECEIVED WITH SOURCE %s and DESTINATION %s" % (src_dests.source, src_dests.destinations))
    model = make_model(src_dests.destinations)
    song_ids_classifications = classify_songs(model, src_dests.source, src_dests.destinations)
    return song_ids_classifications

@app.post("/add_songs")
def receive_songs_ids_and_dest_playlist_ids(data: Playlist_Songs_Container):
    playlist_songs = data.items
    for entry in playlist_songs:
        # add_songs_to_playlists(entry.playlist_id, entry.song_ids)
        print("playlist: " + entry.playlist_id + " songs: " + entry.song_ids)
    return playlist_songs
    
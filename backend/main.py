from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

import spotipy
from spotipy.oauth2 import SpotifyOAuth 
from schemas import Source_Destinations, Playlist_Songs_Container, Playlist_Songs
from spotipy_api import Spotipy_API
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

SCOPES = "playlist-modify-public playlist-modify-private playlist-read-private"
sp_oauth = SpotifyOAuth(scope=SCOPES)
sp_client = None

@app.get("/")
async def root():
    return {"message" : "Hello World"}

@app.get("/login_url")
def login_url():
    global sp_oauth
    
    return {"url" : sp_oauth.get_authorize_url()}

@app.get("/playlists")
def get_all_playlist_ids(code: str = "", error: str = "", state: str =""):
    global sp_oauth
    global sp_client
    
    print("code", code)
    print("error", error)
    print("state", state)

    access_token = ""
    token_info = sp_oauth.get_cached_token()
    print("token_info", token_info)

    if token_info:
        access_token = token_info['access_token']
    elif error == "":
        token_info = sp_oauth.get_access_token(code)
        print("token_info", token_info)
        access_token = token_info['access_token']
    
    if access_token:
        sp_client = Spotipy_API(spotipy.Spotify(access_token))
        return sp_client.get_user_playlists()        
    else:
        print("hi")
        return {"error" : "Unable to gather user data"}

@app.post("/playlists/source_destinations")
def receive_source_destination_playlists(src_dests: Source_Destinations):
    """
    create an sklearn model for every song from the source playlist from above
    @return {
        all_destinations: [list of tuples of all destination playlists (id, name)]
        classifications: see dict in classify songs
    }
    """
    global sp_client
    print("POST REQUEST RECEIVED WITH SOURCE %s and DESTINATION %s" % (src_dests.source, src_dests.destinations))
    model = make_model(sp_client, src_dests.destinations)
    song_ids_classifications = classify_songs(sp_client, model, src_dests.source, src_dests.destinations)
    return song_ids_classifications

@app.post("/add_songs")
def receive_songs_ids_and_dest_playlist_ids(data: Playlist_Songs_Container):
    """
    @return {
        playlist_name: [(song_name, song_id), ....]
        ...
    }
    """
    global sp_client
    playlist_songs = data.items
    ret_dict = {}
    for entry in playlist_songs:
        ret_dict.update(sp_client.add_songs_to_playlists(entry.playlist_id, entry.song_ids))
    # sorts the dictionary by number of songs in the value for the sake of frontend aesthetic
    return {k: v for k,v in sorted(ret_dict.items(),key= lambda x:len(x), reverse=True)}


    
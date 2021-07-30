import os
import spotipy
import sys
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv

SCOPES = "playlist-modify-public playlist-modify-private playlist-read-private"

# check .env to see what environment variables are necessary
load_dotenv()

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=SCOPES))

def get_user_playlists():
    limit, offset = 50, 0
    playlist_name_id_list = {}
    current_user_id = sp.current_user()['id']
    sp_dict = sp.current_user_playlists()
    num_playlists = sp_dict['total']
    while len(playlist_name_id_list) < num_playlists:
        for playlist in sp_dict['items']:
            # only get playlists that the user owns in the future this could include collaborative playlists
            if playlist['owner']['id'] == current_user_id: 
                playlist_name_id_list[playlist['name']] =  playlist['id']
            else:
                num_playlists -= 1
        offset += limit
        sp_dict = sp.current_user_playlists(offset=offset)
    return playlist_name_id_list

# helper function
def get_song_ids_from_playlist(playlist_id: str):
    song_ids = []
    sp_tracks = sp.playlist_tracks(playlist_id, fields="items(track(id)), total")
    num_tracks = sp_tracks['total']
    limit, offset = 100, 0
    while len(song_ids) < num_tracks:
        for track in sp_tracks['items']:
            song_ids.append(track['track']['id'])
        offset += limit
        sp_tracks = sp.playlist_tracks(playlist_id, fields="items(track(id)), total", offset=offset)
    return song_ids

# features that aren't included: mode
FEATURES = ['danceability', 'energy', 'loudness', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo', 'key']
def get_audio_features_from_playlist(playlist_id: str):
    song_ids = get_song_ids_from_playlist(playlist_id)
    playlist_features = [playlist_id]
    limit, offset = 100, 0
    tracks_audio_features = sp.audio_features(song_ids[:limit])
    while len(song_ids) > len(playlist_features) - 1:
        for track in tracks_audio_features:
            track_features = []
            for feature in FEATURES:
                track_features.append(track[feature])
            playlist_features.append(track_features)
        offset += limit
        tracks_audio_features = sp.audio_features(song_ids[offset:offset+limit])
    return playlist_features


# if len(sys.argv) > 1:
#     print(get_audio_features_from_playlist(sys.argv[1]))
# else:
#     print("Whoops, need a username!")
#     print("usage: python user_playlists.py [username]")
#     sys.exit()
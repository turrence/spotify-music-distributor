import os
import spotipy
import sys
from spotipy.oauth2 import SpotifyOAuth
from dotenv import load_dotenv
import traceback
import pprint

pp = pprint.PrettyPrinter(indent=4)
SCOPES = "playlist-modify-public playlist-modify-private playlist-read-private"

# check .env to see what environment variables are necessary
load_dotenv()

class Spotipy_API:

    def __init__(self, client):
        self.sp = client
        self.FEATURES = ['danceability', 'energy', 'loudness', 'speechiness', 'acousticness', 'instrumentalness', 'liveness', 'valence', 'tempo']

    def get_user_playlists(self):
        limit, offset = 50, 0
        playlist_name_id_list = {}
        current_user_id = self.sp.current_user()['id']
        sp_dict = self.sp.current_user_playlists()
        num_playlists = sp_dict['total']
        while len(playlist_name_id_list) < num_playlists:
            for playlist in sp_dict['items']:
                # only get playlists that the user owns in the future this could include collaborative playlists
                if playlist['owner']['id'] == current_user_id: 
                    playlist_name_id_list[playlist['name']] =  playlist['id']
                else:
                    num_playlists -= 1
            offset += limit
            sp_dict = self.sp.current_user_playlists(offset=offset)
        return [(str(k), str(v)) for k, v in playlist_name_id_list.items()]

    # helper function
    def get_song_ids_from_playlist(self, playlist_id: str):
        song_ids = []
        sp_tracks = self.sp.playlist_tracks(playlist_id, fields="items(track(id)), total")
        num_tracks = sp_tracks['total']
        limit, offset = 100, 0
        while len(song_ids) < num_tracks:
            for track in sp_tracks['items']:
                song_ids.append(track['track']['id'])
            offset += limit
            sp_tracks = self.sp.playlist_tracks(playlist_id, fields="items(track(id)), total", offset=offset)
        return song_ids

    # features that aren't included: mode, key
    def get_audio_features_from_playlist(self, playlist_id: str):
        song_ids = self.get_song_ids_from_playlist(playlist_id)
        num_songs = len(song_ids)
        playlist_features = []
        limit, offset = 100, 0
        try:
            tracks_audio_features = self.sp.audio_features(song_ids[:limit])
            while len(playlist_features) < num_songs:
                for track in tracks_audio_features:
                    if track is not None:
                        track_features = []
                        for feature in self.FEATURES:
                            track_features.append(track[feature])
                        playlist_features.append((track['id'], track_features))
                    else:
                        num_songs -= 1
            offset += limit
            tracks_audio_features = self.sp.audio_features(song_ids[offset:offset+limit])
        except:
            print("Error on get_audio_features_from_playlist playlist id: " + playlist_id)
            traceback.print_exc()
        # every element is the (song id, [features]) of the song
        return playlist_features

    def get_track_data(self, song_id: str):
        """
        @return (song_id, song name, and artists)
        """
        song_data = self.sp.track(song_id)
        return (song_id, song_data['name'], song_data['artists'][0]['name'])

    def get_tracks_data(self, song_ids: list):
        """
        @return dict
            key: str, track_id
            value: tuple, [0]: track_name, [1]: track_artist
        """
        songs_data = {}
        limit, offset = 50, 0
        tracks_data = self.sp.tracks(song_ids[:limit])
        num_songs = len(song_ids)
        while len(songs_data) < num_songs:
            for track in tracks_data['tracks']:
                if track['id'] not in songs_data:
                    songs_data[track['id']] = (track['name'], track['artists'][0]['name'])
                else:
                    num_songs -= 1
            offset += limit
            if len(song_ids[offset:offset+limit]) > 0:
                tracks_data = self.sp.tracks(song_ids[offset:offset+limit])
        return songs_data


    def get_playlist_data(self, playlist_id: str):
        """
        @return (playlist id, playlist name)
        """
        playlist_data = self.sp.playlist(playlist_id)   
        return (playlist_id, playlist_data['name'])


    def add_songs_to_playlists(self, playlist_id: str, song_ids: list):
        """
        idk if i need a @return
        """
        self.sp.playlist_add_items(playlist_id, song_ids)


# print(get_track_data("5nEF9aioHwgov5UbhTRMg4"))
# print(get_tracks_data(["5nEF9aioHwgov5UbhTRMg4", "4FUDWkguOUVpLRAVn5C20z"]))
# print(get_playlist_data("3YqslVWmv4OGMhDZmfv1Nq"))



import sys 

from sklearn.neighbors import KNeighborsClassifier
from spotipy_api import Spotipy_API

def make_model(sp: Spotipy_API, playlists: list):
    model_audio_features = []
    classification_for_features = []
    for playlist in playlists:
        audio_features = sp.get_audio_features_from_playlist(playlist)
        model_audio_features += [af[1] for af in audio_features]
        classification_for_features += [playlist for i in range(len(audio_features))]
    model = KNeighborsClassifier(n_neighbors=5)
    model.fit(model_audio_features, classification_for_features)
    return model


def classify_songs(sp: Spotipy_API, model: KNeighborsClassifier, src_playlist_id: str, dest_playlists_id: str):
    song_ids_audio_features = sp.get_audio_features_from_playlist(src_playlist_id)
    # tuple of (song ids, [audio features])
    song_ids_audio_features = [(pair[0], src_playlist_id, model.predict([pair[1]])[0]) for pair in song_ids_audio_features]
    # print (song ids, source_id, destination_id)
    song_data_predictions = organize_song_data(sp, song_ids_audio_features, dest_playlists_id)
    return song_data_predictions
    
        
def organize_song_data(sp: Spotipy_API, song_infos: list, dest_playlists_id: list):
    """
    @param: [(song ids, source, playlist_prediction_destination)]
    @return {
        all_destinations: [list of tuples of all destination playlists (id, name)]
        classifications: see dict below
    }
    """
    sum_data = {}
    all_dest_playlist = []
    tracks_information = sp.get_tracks_data([s[0] for s in song_infos])
    for dest_playlist in dest_playlists_id:
        all_dest_playlist.append(sp.get_playlist_data(dest_playlist))
    sum_data['all_destinations'] = all_dest_playlist
    sum_data['classifications'] = []
    for song_data_prediction in song_infos:
        src_playlist_info = sp.get_playlist_data(song_data_prediction[1])
        dest_playlist_info = sp.get_playlist_data(song_data_prediction[2])
        data_entry = {
            "song_id" : song_data_prediction[0],
            "song_name" : tracks_information[song_data_prediction[0]][0],
            "artist_name": tracks_information[song_data_prediction[0]][1],
            "source_playlist_id": song_data_prediction[1],
            "source_playlist_name" : src_playlist_info[1],
            "destination_playlist_id": song_data_prediction[2],
            "destination_playlist_name" : dest_playlist_info[1],
        }
        sum_data['classifications'].append(data_entry)
    return sum_data

    

# model = make_model(["3YqslVWmv4OGMhDZmfv1Nq", "43seaQpgUt4OApR7Lb13PM"])
# classify_songs(model, "2L7IVXVJqa2RAGav2Wo9Wq")
# print(model.predict([[0.705, 0.659, -7.808, 0.1, 0.727, 0.0732, 0.148, 0.584, 147.967, 9]]))


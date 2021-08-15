import sys 

from sklearn.neighbors import KNeighborsClassifier
from spotipy_api import get_audio_features_from_playlist, get_song_ids_from_playlist, get_track_data, get_playlist_data

def make_model(playlists: list):
    model_audio_features = []
    classification_for_features = []
    for playlist in playlists:
        # returns 
        audio_features = get_audio_features_from_playlist(playlist)
        model_audio_features += [af[1] for af in audio_features]
        classification_for_features += [playlist for i in range(len(audio_features))]
    model = KNeighborsClassifier(n_neighbors=5)
    model.fit(model_audio_features, classification_for_features)
    return model


def classify_songs(model: KNeighborsClassifier, playlist_id: str):
    song_ids_audio_features = get_audio_features_from_playlist(playlist_id)
    # tuple of (song ids, [audio features])
    song_ids_audio_features = [(pair[0], playlist_id, model.predict([pair[1]])[0]) for pair in song_ids_audio_features]
    # print (song ids, source_id, destination_id)
    song_data_predictions = organize_song_data(song_ids_audio_features)
    return song_data_predictions
    
        
def organize_song_data(song_infos: list):
    """
    @param: [(song ids, source, playlistpredictiondestination)]
    @return [see code below]
    """
    sum_data = []
    for song_data_prediction in song_infos:
        more_info = get_track_data(song_data_prediction[0])
        src_playlist_info = get_playlist_data(song_data_prediction[1])
        dest_playlist_info = get_playlist_data(song_data_prediction[2])
        data_entry = {
            "song_id" : song_data_prediction[0],
            "song_name" : more_info[1],
            "artist_name": more_info[2],
            "source_playlist_id": song_data_prediction[1],
            "source_playlist_name" : src_playlist_info[1],
            "destination_playlist_id": song_data_prediction[2],
            "destination_playlist_name" : dest_playlist_info[1],
        }
        sum_data.append(data_entry)
    return sum_data

    

# model = make_model(["3YqslVWmv4OGMhDZmfv1Nq", "43seaQpgUt4OApR7Lb13PM"])
# classify_songs(model, "2L7IVXVJqa2RAGav2Wo9Wq")
# print(model.predict([[0.705, 0.659, -7.808, 0.1, 0.727, 0.0732, 0.148, 0.584, 147.967, 9]]))


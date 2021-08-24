import axios from 'axios';

const host = "http://127.0.0.1:8000/" 

export async function get_playlists(){
    const response = await axios.get(host + "playlists/")
        .then((promise) => {
            console.log(promise);
            return promise.data;
        }).catch(error => {
            console.error(error)});
    return response
}

export async function send_source_destination_playlists(data){
    const response = await axios.post(host + "playlists/source_destinations", data)
        .then((promise) => {
            console.log(promise);
            return promise.data;
        }).catch(error => {
            console.error(error)
        });
    return response
}

export async function send_playlists_and_songs(data){
    const response = await axios.post(host + "add_songs/", data)
        .then((promise) => {
            console.log(promise);
            return promise.data;
        }).catch(error => {
            console.error(error)
        });
    return response
}
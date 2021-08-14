import axios from 'axios';

const host = "http://127.0.0.1:8000/" 

async function get_playlists(){
    const response = await axios.get(host + "playlists/")
        .then((promise) => {
            console.log(promise);
            return promise.data;
        }).catch(error => {
            console.error(error)});
    return response
}

export default get_playlists;
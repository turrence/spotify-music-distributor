import Button from 'react-bootstrap/Button'
import { send_playlists_and_songs } from "../../../api"
import { useHistory } from "react-router-dom"

const AllToPlaylistButton = ({ songs }) => {

    const history = useHistory()

    const handleOnClick =  (songs) => {
        let payload = {
            "items" : []
        }

        // key: playlist_id
        // value: list of song_ids
        let data_dictionary = {}

        songs.forEach((song_playlist) => {
            if (!(song_playlist[1] in data_dictionary)){
                data_dictionary[song_playlist[1]] = [song_playlist[0]]
            } else {
                data_dictionary[song_playlist[1]].push(song_playlist[0])
            }
        });

        for (const [key, value] of Object.entries(data_dictionary)){
            payload.items.push({
                "playlist_id" : key,
                "song_ids": value
            })
        }
        // console.log(payload)
        const redirect_receive_data = async () => {
            const data = await send_playlists_and_songs(payload)
            const path = "/results"

            history.push({
                pathname: path,
                state: data
            })
        }

        redirect_receive_data()
    }

    return (<Button onClick={() => handleOnClick(songs)} variant="secondary">Move ALL Source Songs to Destination Playlist</Button>)
}

export default AllToPlaylistButton;
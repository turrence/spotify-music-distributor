import React from 'react';
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom"
import { CLASSIFIED_SONGS } from "../data"
import { send_source_destination_playlists } from '../../api'

function SendPlaylistsButton( { srcPlaylist, destPlaylists }){

    const history = useHistory()

    function sendOnClick(){
        const data_request = {"source" : srcPlaylist, "destinations" : destPlaylists}
        // --------------------ACTUAL API CALL------------------
        const classified_songs = async () => {
            const data_response = await send_source_destination_playlists(data_request)
            let path = "/selection"
            history.push({
                pathname: path,
                state: data_response
            })
        }
        classified_songs()
        
        // -------------------FOR DEVELOPMENT--------------------
       /*  
       const response = CLASSIFIED_SONGS
        
        let path = "/selection"
        history.push({
            pathname: path,
            state: response
        }) */
    }

    return (<Button disabled={srcPlaylist === "" || destPlaylists.length === 0} 
        onClick={() => sendOnClick()} variant="outline-primary">Submit Source Songs and Destination Playlists</Button>)
}

export default SendPlaylistsButton;
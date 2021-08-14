import React from 'react';
import Button from 'react-bootstrap/Button'
import { send_source_destination_playlists } from '../../api'

function SendPlaylistsButton( { srcPlaylist, destPlaylists }){

    function sendOnClick(){
        const data = {"source" : srcPlaylist, "destinations" : destPlaylists}
        send_source_destination_playlists(data)
    }

    return (<Button disabled={srcPlaylist === "" || destPlaylists.length === 0} 
        onClick={() => sendOnClick()} variant="outline-primary">Submit Source Songs and Destination Playlists</Button>)
}

export default SendPlaylistsButton;
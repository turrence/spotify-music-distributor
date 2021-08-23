import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom"
import { CLASSIFIED_SONGS } from "../../data"
import { send_source_destination_playlists } from '../../../api'
import { BlockReserveLoading } from 'react-loadingg';


function SendPlaylistsButton( { srcPlaylist, destPlaylists }){

    const history = useHistory()

    const [isLoading, setIsLoading] = useState(false)

    function sendOnClick(){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        /* 
        // --------------------ACTUAL API CALL------------------
        const data_request = {"source" : srcPlaylist, "destinations" : destPlaylists}
        // console.log("sending source and destination playlists: " + data_request)
        
        const classified_songs = async () => {
            setIsLoading(true)
            const data_response = await send_source_destination_playlists(data_request)
            let path = "/selection"
            history.push({
                pathname: path,
                state: data_response
            })
        }
        classified_songs() */
        
        // -------------------FOR DEVELOPMENT--------------------
        
       const response = CLASSIFIED_SONGS
        
        let path = "/selection"
        history.push({
            pathname: path,
            state: response
        })
    }

    
    return (
        <div>
            {isLoading ? <BlockReserveLoading></BlockReserveLoading> : 
                <Button disabled={srcPlaylist === "" || destPlaylists.length === 0} 
                onClick={() => sendOnClick()} variant="outline-primary">Submit Source Songs and Destination Playlists</Button>}
        </div>)
        
}

export default SendPlaylistsButton;
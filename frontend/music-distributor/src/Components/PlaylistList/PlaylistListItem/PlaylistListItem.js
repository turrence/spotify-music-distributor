import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import './PlaylistListItem.css'

function PlaylistListItem({playlistData, srcPlaylist, setSrc, setDest, destPlaylists, isSourceList }){
    // playlistData[0]: playlist name
    // playlistData[1]: playlist id

    function destListOnClick(pData){
        let newDestPlaylists = [...destPlaylists];
        // remove the id from state if the playlist id is already in the state
        if (destPlaylists.indexOf(pData[1]) !== -1){
            newDestPlaylists = newDestPlaylists.filter(e => e !== pData[1])
        }
        // add the id to the state
        else {
            
            newDestPlaylists.push(pData[1])
        }
        setDest(newDestPlaylists)
    }

    function sourceListOnClick(pData){
        if (destPlaylists.indexOf(pData[1]) !== -1){
            setDest(pData.filter(e => e !== pData[1]))
        }
        setSrc(pData[1])
    }

    if (isSourceList){
        return (<ListGroup.Item action
            variant={playlistData[1] === srcPlaylist ? "primary" : ""}
            onClick={() => sourceListOnClick(playlistData)}>
            {playlistData[0]}<br/>
            {/* {playlistData[1]}<br/> */}
        </ListGroup.Item>)
    }
    else {
        return (<ListGroup.Item action
            variant={destPlaylists.indexOf(playlistData[1]) !== -1 ? "primary" : ""}
            onClick={() => destListOnClick(playlistData)}
            disabled={srcPlaylist === ""}
            hidden={playlistData[1] === srcPlaylist}>
            {playlistData[0]}<br/>
            {/* {playlistData[1]}<br/> */}
        </ListGroup.Item>)
    }
}

export default PlaylistListItem;
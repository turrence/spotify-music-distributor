import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import './PlaylistListItem.css'

function PlaylistListItem({playlistData, srcPlaylist, clickFunc, destPlaylists, isSourceList }){
    return (<ListGroup.Item action 
        onClick={clickFunc(playlistData[1])}
        disabled={playlistData[1] === srcPlaylist}>
        {playlistData[0]}
    </ListGroup.Item>)
}


export default PlaylistListItem;
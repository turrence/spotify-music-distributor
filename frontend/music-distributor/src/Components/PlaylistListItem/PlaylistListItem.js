import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import './PlaylistListItem.css'

function PlaylistListItem({ playlistName }){
    return (<ListGroup.Item>
        {playlistName}
    </ListGroup.Item>)
}


export default PlaylistListItem;
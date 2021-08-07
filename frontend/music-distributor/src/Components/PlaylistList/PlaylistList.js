import React, { useState } from 'react';
import { PlaylistListItem } from '../components'
import ListGroup from 'react-bootstrap/ListGroup'
import './PlaylistList.css'

function PlaylistList(props){
    // required props
    // list of playlist names
    return (
        <ListGroup variant="flush">
            {props.playlists.map((playlist) => 
                <PlaylistListItem key={playlist[1]} playlistName={playlist[0]}></PlaylistListItem>
            )}
        </ListGroup>
    );
}

export default PlaylistList;

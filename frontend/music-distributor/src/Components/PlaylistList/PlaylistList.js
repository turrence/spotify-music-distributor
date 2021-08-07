import React, { useState } from 'react';
import { PlaylistListItem } from '../components'
import { ListGroup } from 'react-bootstrap'

function PlaylistList(props){
    // required props
    // list of playlist names
    return (
        <ListGroup>
        {props.playlists.map((playlist) => 
            <PlaylistListItem key={playlist[1]} name={playlist[0]}></PlaylistListItem>
        )}
       </ListGroup>
    )
}

export default PlaylistList;

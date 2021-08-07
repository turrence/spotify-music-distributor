import React, { useState } from 'react';
import { PlaylistListItem } from '../components'
import ListGroup from 'react-bootstrap/ListGroup'
import './PlaylistList.css'

function PlaylistList(props){
    // required props
    return (
        <ListGroup variant="flush">
            {props.playlists.map((playlist) => 
                <PlaylistListItem key={playlist[1]} 
                    playlistData={playlist}
                    srcPlaylist={props.srcPlaylist} 
                    clickFunc={props.clickFunc} 
                    destPlaylists={props.destPlaylists}
                    isSourceList={props.isSourceList}
                ></PlaylistListItem>
            )}
        </ListGroup>
    );
}

export default PlaylistList;

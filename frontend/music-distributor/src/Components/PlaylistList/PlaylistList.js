import React from 'react';
import { PlaylistListItem } from '../components'
import ListGroup from 'react-bootstrap/ListGroup'
import './PlaylistList.css'

function PlaylistList(props){
    // required props
    return (
        <ListGroup>
            {props.playlists.map((playlist) => 
                <PlaylistListItem key={playlist[1]} 
                    playlistData={playlist}
                    srcPlaylist={props.srcPlaylist} 
                    setSrc={props.setSrc} 
                    setDest={props.setDest}
                    destPlaylists={props.destPlaylists}
                    isSourceList={props.isSourceList}
                ></PlaylistListItem>
            )}
        </ListGroup>
    );
}

export default PlaylistList;

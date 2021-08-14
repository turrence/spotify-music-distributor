import React, { useState } from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { PlaylistList } from '../components'

import './PlaylistListContainer.css';

function PlaylistListContainer({ playlists }) {
    // pass ids instead of playlist names
    const [sourcePlaylist, setSourcePlaylist] = useState("")
    const [destinationPlaylists, setDestinationPlaylists] = useState([])

    console.log(playlists)

    function setSource(playlistId){
        setSourcePlaylist(playlistId)
        console.log("src: " + sourcePlaylist)
    }

    function setDestination(playlistIds){
        setDestinationPlaylists(playlistIds)
        console.log("dest: " + destinationPlaylists)
    }

    return (
        <Container>
            <Row>
                <Col id="srcList" md={4}>
                    <PlaylistList playlists={playlists} 
                        srcPlaylist={sourcePlaylist} 
                        setSrc={setSource} 
                        setDest={setDestination}
                        destPlaylists={destinationPlaylists} 
                        isSourceList={true}></PlaylistList>
                </Col>
                <Col id="destList" md={{span:4, offset: 4}} hidden={sourcePlaylist === ""}>
                    <PlaylistList playlists={playlists} 
                        srcPlaylist={sourcePlaylist} 
                        setSrc={setSource} 
                        setDest={setDestination}
                        destPlaylists={destinationPlaylists} 
                        isSourceList={false}></PlaylistList>
                </Col>
            </Row>
        </Container>
    );
}

export default PlaylistListContainer;

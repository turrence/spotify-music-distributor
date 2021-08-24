import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { PlaylistList } from '../components'
import SendPlaylistsButton from "./Buttons/SendPlaylistsButton"
import ClearPlaylistsButton from "./Buttons/ClearPlaylistsButton"
import { CLASSIFIED_SONGS, PLAYLIST_LIST } from '../data'
import { RollBoxLoading } from 'react-loadingg';


import { get_playlists } from '../../api';

import './PlaylistListContainer.css';

function PlaylistListContainer() {
    // pass ids instead of playlist names
    const [playlists , setPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        
        const api_get_playlists = async () => {
            const data = await get_playlists()
            setPlaylists(data)
            setIsLoading(false)
        }
        
        // --------------------ACTUAL API CALL------------------
        api_get_playlists(playlists);
        // -------------------FOR DEVELOPMENT--------------------
        // setPlaylists(PLAYLIST_LIST)
        
    }, [...playlists]);

    const [sourcePlaylist, setSourcePlaylist] = useState("")
    const [destinationPlaylists, setDestinationPlaylists] = useState([])

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
            {isLoading ? <RollBoxLoading></RollBoxLoading> :
            <Row>
                <Col id="srcList" md={4}>
                    <PlaylistList playlists={playlists} 
                        srcPlaylist={sourcePlaylist} 
                        setSrc={setSource} 
                        setDest={setDestination}
                        destPlaylists={destinationPlaylists} 
                        isSourceList={true}></PlaylistList>
                </Col>
                <Col id="destList" md={{span:4, offset: 4}}>
                    <PlaylistList playlists={playlists} 
                        srcPlaylist={sourcePlaylist} 
                        setSrc={setSource} 
                        setDest={setDestination}
                        destPlaylists={destinationPlaylists} 
                        isSourceList={false}></PlaylistList>
                </Col>
            </Row>
            }
            <Row>
                <Col>
                    <ClearPlaylistsButton srcClick={setSource} destClick={setDestination}></ClearPlaylistsButton> 
                </Col>
                <Col> 
                    <SendPlaylistsButton
                        srcPlaylist={sourcePlaylist} 
                        destPlaylists={destinationPlaylists}></SendPlaylistsButton>
                </Col>
            </Row>
        </Container>
    );
}

export default PlaylistListContainer;

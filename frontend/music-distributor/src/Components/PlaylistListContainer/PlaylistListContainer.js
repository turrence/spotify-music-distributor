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

        /* const format_url_params = () => {
            const queryString = window.location.search
            const urlParams = new URLSearchParams(queryString)
            // should be code and state
            return {
                "code" : urlParams.get("code"),
                "state" : urlParams.get("state")
            }
        } */
        
        const api_get_playlists = async () => {
            const data = await get_playlists(window.location.search)
            setPlaylists(data)
            setIsLoading(false)
        }
        
        // --------------------ACTUAL API CALL------------------
        api_get_playlists(playlists);
        // -------------------FOR DEVELOPMENT--------------------
        // setPlaylists(PLAYLIST_LIST)
        
    }, []);

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
                    <b>Source Playlist</b><br/>
                    <PlaylistList playlists={playlists} 
                        srcPlaylist={sourcePlaylist} 
                        setSrc={setSource} 
                        setDest={setDestination}
                        destPlaylists={destinationPlaylists} 
                        isSourceList={true}></PlaylistList>
                </Col>
                <Col md={4}>
                    <ol class="description-text">
                        <li>Select a <strong>source playlist</strong></li>
                            <ul><li>songs from the source playlist will be categorized into selected destination playlists</li></ul>
                        <li>Select <b>destination playlists</b></li>
                            <ul>
                                <li>songs from your source playlist will be sorted into these playlists</li>
                                <li>you can change the destination of a song on the next page</li>
                            </ul>
                    </ol>
                </Col>
                <Col id="destList" md={4}>
                    <b>Destination Playlists</b><br/>
                    <PlaylistList playlists={playlists} 
                        srcPlaylist={sourcePlaylist} 
                        setSrc={setSource} 
                        setDest={setDestination}
                        destPlaylists={destinationPlaylists} 
                        isSourceList={false}></PlaylistList>
                </Col>
            </Row>
            }
            <Row class="buttons" md={12}>
                <Col md={4}>
                    <ClearPlaylistsButton srcClick={setSource} destClick={setDestination}></ClearPlaylistsButton> 
                </Col>
                <Col md={{size: 4, offset: 8}}> 
                    <SendPlaylistsButton
                        srcPlaylist={sourcePlaylist} 
                        destPlaylists={destinationPlaylists}></SendPlaylistsButton>
                </Col>
            </Row>
        </Container>
    );
}

export default PlaylistListContainer;

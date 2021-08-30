import { useState } from 'react';
import SelectionRow from "./SelectionRow"
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import SongsToPlaylistButton from "./Buttons/SongsToPlaylistButton"
import PlaylistSelectionButton from "./Buttons/PlaylistSelectionButton"
import AllToPlaylistButton from "./Buttons/AllToPlaylistButton"

import './SelectionTable.css'

function SelectionTable(props) {
    
    // list of tuples: [data.song_id, data.destination_playlist_id]
    const [selectedSongs, setSelectedSongs] = useState([])

    const data = props.location.state || {}
    let counter = 1

    // list of tuples: [data.song_id, data.destination_playlist_id] 
    const [allSongs, setAllSongs] = useState(data.classifications.map(entry => {return [entry.song_id, entry.destination_playlist_id]}))

    return (
        <Container>
            <Table striped bordered hover> 
                <thead>
                    <tr>
                        <th>Song</th>
                        <th>Artist</th>
                        <th>Source Playlist</th>
                        <th>Destination Playlist</th>
                        <th>Selected</th>
                    </tr>
                </thead>
                <tbody>
                    {data.classifications.map((entry) => {
                        return (<SelectionRow
                            key={entry.song_id + counter++}
                            data={entry} 
                            destPlaylists={data.all_destinations}
                            selectedSongs={selectedSongs} 
                            selectSongs={setSelectedSongs}
                            allSongs={allSongs}
                            setAllSongs={setAllSongs}></SelectionRow>)
                    })}
                </tbody>
            </Table>
            <Row>
                <Col>
                    <PlaylistSelectionButton/>
                </Col>
                <Col>
                    {/* only real data is song_id and destination playlist */}
                    <AllToPlaylistButton songs={allSongs}/>
                </Col>
                <Col>
                    {/* the only real data i need to send is the song_id and the destination playlist */}
                    <SongsToPlaylistButton songs={selectedSongs}/>
                </Col>
            </Row>
        </Container>
    )

}

export default SelectionTable;
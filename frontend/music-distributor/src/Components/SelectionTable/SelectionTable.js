import { useState } from 'react';
import SelectionRow from "./SelectionRow"
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import SongsToPlaylistButton from "./Buttons/SongsToPlaylistButton"
import PlaylistSelectionButton from "./Buttons/PlaylistSelectionButton"
import AllToPlaylistButton from "./Buttons/AllToPlaylistButton"

function SelectionTable(props) {
    // allSongs is required when the eventual ability to change the destination playlist
    const [allSongs, setAllSongs] = useState([])
    const [selectedSongs, setSelectedSongs] = useState([])

    const data = props.location.state || {}

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
                    {data.map((entry) => {
                        return (<SelectionRow
                            key={entry.song_id}
                            data={entry} 
                            selectedSongs={selectedSongs} 
                            selectSongs={setSelectedSongs}
                            setAllSongs={setAllSongs}></SelectionRow>)
                    })}
                </tbody>
            </Table>
            <Row>
                <Col>
                    {/* the only real data i need to send is the song_id and the destination playlist */}
                    <SongsToPlaylistButton songs={selectedSongs}/>
                </Col>
                <Col>
                    {/* only real data is song_id and destination playlist */}
                    <AllToPlaylistButton songs={allSongs}/>
                </Col>
                <Col>
                    <PlaylistSelectionButton/>
                </Col>
            </Row>
        </Container>
    )

}

export default SelectionTable;

import { PLAYLISTS_SONGS } from '../data'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import PlaylistSelectionButton from '../SelectionTable/Buttons/PlaylistSelectionButton'

import './ResultsTable.css'

function ResultsTable(props){

    // const data = PLAYLISTS_SONGS
    const data = props.location.state || {}
    
    let num_playlists = Object.keys(data).length
    let num_songs = 0

    for (let arr of Object.values(data)){
        num_songs += arr.length
    }

    return (
        <Container className="results-table">
            <h3>The following {num_songs} songs were added to the following {num_playlists} playlists!</h3>
            <Row md={2}>
            {
                Object.entries(data).map(([key, value]) => {
                    return (
                    <Col>
                        <Card className="playlist-card">
                            <Card.Header><b>{key}</b></Card.Header>
                            <ListGroup variant="flush">
                                {value.map(song_artist => {
                                    return (
                                    <ListGroup.Item>
                                        {song_artist[0]} - {song_artist[1]} 
                                    </ListGroup.Item>)
                                })}
                            </ListGroup>
                        </Card>
                    </Col>)
                })
            }
            </Row>
            <Row>
                <Col>
                    <PlaylistSelectionButton/>
                </Col>
            </Row>
        </Container>
    )

}

export default ResultsTable;
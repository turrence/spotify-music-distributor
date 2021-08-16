import { useState } from 'react';
import SelectionRow from "./SelectionRow"
import Table from 'react-bootstrap/Table'

function SelectionTable({ data }) {
    const [selectedSongs, setSelectedSongs] = useState([])

    return (
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
                        selectSongs={setSelectedSongs}></SelectionRow>)
                })}
            </tbody>
        </Table>
    )

}

export default SelectionTable;
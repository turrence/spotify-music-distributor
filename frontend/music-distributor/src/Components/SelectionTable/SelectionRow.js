import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'

function SelectionRow({data, selectedSongs, selectSongs}) {

    function rowSelection(data){
        let newSelectedSongs = [...selectedSongs]
        if(selectedSongs.indexOf(data.song_id) !== -1){
            newSelectedSongs = newSelectedSongs.filter(e => e !== data.song_id)
        }
        else {
            newSelectedSongs.push(data.song_id)
        }
        
        selectSongs(newSelectedSongs)
    }

    return (<tr onClick={() => rowSelection(data)}>
        <td>{data.song_name}</td>
        <td>{data.artist_name}</td>
        <td>{data.source_playlist_name}</td>
        <td>{data.destination_playlist_name}</td>
        <td><InputGroup.Checkbox 
            aria-label="Selected" 
            checked={selectedSongs.indexOf(data.song_id) !== -1}
            readOnly={true}></InputGroup.Checkbox>
        </td>
    </tr>)

}

export default SelectionRow;
import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'

function SelectionRow({data, selectedSongs, selectSongs, setAllSongs}) {

    function rowSelection(data){
        let newSelectedSongs = [...selectedSongs]
        if(selectedSongs.map((song_playlist) => {
            return song_playlist[0]
        }).indexOf(data.song_id) !== -1){
            newSelectedSongs = newSelectedSongs.filter(e => e[0] !== data.song_id)
        }
        else {
            newSelectedSongs.push([data.song_id, data.destination_playlist_id])
        }
        
        console.log(newSelectedSongs)
        selectSongs(newSelectedSongs)
    }

    return (<tr onClick={() => rowSelection(data)}>
        <td>{data.song_name}<br/><i>{data.song_id}</i></td>
        <td>{data.artist_name}</td>
        <td>{data.source_playlist_name}</td>
        {/* this will eventually be a dropdown of all playlists that the user selected */}
        <td>{data.destination_playlist_name}</td>
        <td><InputGroup.Checkbox 
            aria-label="Selected" 
            checked={selectedSongs.map((song_playlist) => {
                return song_playlist[0]
            }).indexOf(data.song_id) !== -1}
            readOnly={true}></InputGroup.Checkbox>
        </td>
    </tr>)

}

export default SelectionRow;
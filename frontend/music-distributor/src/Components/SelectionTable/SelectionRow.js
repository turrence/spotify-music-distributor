import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

function SelectionRow({data, destPlaylists, selectedSongs, selectSongs, allSongs, setAllSongs}) {
    /* 
        data = {
            all_destinations: [list of tuples of all destination playlists (id, name)]
            classifications: [list of all songs and sources and their data] 
        }
    */

    const handleOptionChange = (event) => {
        let newAllSongs = allSongs.map(song_playlist => {
            if (song_playlist[0] === data.song_id)
                return [data.song_id, event.target.value]
            else
                return song_playlist
        })
        setAllSongs(newAllSongs)
    }

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

    return (<tr>
        <td onClick={() => rowSelection(data)}>{data.song_name}<br/><i>{data.song_id}</i></td>
        <td onClick={() => rowSelection(data)}>{data.artist_name}</td>
        <td onClick={() => rowSelection(data)}>{data.source_playlist_name}</td>
        <td>
            <Form.Control as="select" aria-label="options" onChange={handleOptionChange}>
                <option value={data.destination_playlist_id}>{data.destination_playlist_name}</option>
                {destPlaylists.map(id_name => {
                    if (id_name[0] !== data.destination_playlist_id){
                        return (<option value={id_name[0]}>{id_name[1]}</option>)
                    }
                })}
            </Form.Control>
        </td>
        <td onClick={() => rowSelection(data)}><InputGroup.Checkbox 
            aria-label="Selected" 
            checked={selectedSongs.map((song_playlist) => {
                return song_playlist[0]
            }).indexOf(data.song_id) !== -1}
            readOnly={true}></InputGroup.Checkbox>
        </td>
    </tr>)

}

export default SelectionRow;
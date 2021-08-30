import React from 'react';
import Button from 'react-bootstrap/Button'

function ClearPlaylistsButton( { srcClick, destClick }){
    function clearOnClick(){
        srcClick("")
        destClick([])
    }

    return (<div className="clear-playlists">
        <Button variant="danger" onClick={()=>clearOnClick()}>Clear Selection</Button>
    </div>)

}

export default ClearPlaylistsButton;
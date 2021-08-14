import React from 'react';
import Button from 'react-bootstrap/Button'

function ClearPlaylistsButton( { srcClick, destClick }){
    function clearOnClick(){
        srcClick("")
        destClick([])
    }

    return (<Button variant="outline-danger" onClick={()=>clearOnClick()}>Clear Selection</Button>)


}

export default ClearPlaylistsButton;
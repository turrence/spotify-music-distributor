import React from 'react'
import { ListGroup } from 'react-bootstrap';

function PlaylistListItem({ name }){
    return (<ListGroup.Item>
        {name}
    </ListGroup.Item>)
}


export default PlaylistListItem;
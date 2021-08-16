import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom"

const PlaylistSelectionButton = () => {
    const history = useHistory()

    const handleClick = () => {
        history.push("/playlists")
    }

    return (<Button variant="outline-info" onClick={() => handleClick()}>Select NEW Source and Destination Playlists</Button>)
}

export default PlaylistSelectionButton;
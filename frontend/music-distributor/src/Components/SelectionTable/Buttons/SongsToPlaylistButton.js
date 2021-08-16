import Button from 'react-bootstrap/Button'

const SongsToPlaylistButton = ({ songs }) => {
    return (<Button variant="outline-primary" disabled={songs.length === 0}>Move Selected Songs to Destination Playlist</Button>)
}

export default SongsToPlaylistButton;
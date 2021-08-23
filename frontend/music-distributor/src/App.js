import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { get_playlists } from './api';
import { PlaylistListContainer, SelectionTable } from './Components/components'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { CLASSIFIED_SONGS, PLAYLIST_LIST } from './Components/data'

function App() {
    const [playlists , setPlaylists] = useState([]);
    
    // this could probably be moved to PlaylistListcontainer
    useEffect(() => {
        
        const api_get_playlists = async () => {
            const data = await get_playlists()
            setPlaylists(data)
        }
        
        // --------------------ACTUAL API CALL------------------
        // api_get_playlists(playlists);
        // -------------------FOR DEVELOPMENT--------------------
        setPlaylists(PLAYLIST_LIST)
        
    }, []);
    
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/playlists">
                        <PlaylistListContainer playlists={playlists}></PlaylistListContainer>
                    </Route>
                    <Route path="/selection" component={SelectionTable}>
                    </Route>
                </Switch>
            </Router>
        </div>
        );
    }
    
const Home = () => {
    return (
        <ul>
            <li>
                <Link to="/playlists">Playlist Selection</Link>
            </li>
            <li>
                <Link to="/selection">Song Selection</Link>
            </li>
        </ul>
        )
    }
        
export default App;

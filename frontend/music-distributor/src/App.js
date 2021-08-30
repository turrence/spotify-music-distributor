import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { PlaylistListContainer, SelectionTable } from './Components/components'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { get_login_url } from "./api"
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button'
import logo from './static/Spotify_Icon_RGB_White.png'
import image1 from './static/preview_banner.png'
import tableImage from './static/selection_table.png'

function App() {
    const [loginURL, setLoginURL] = useState("")

    useEffect(() => {
        document.title = "Spotify Music Distributor"

        const request_login_url = async () => {
            const response = await get_login_url()
            setLoginURL(response.url)
            return response
        }

        request_login_url()

    }, [loginURL])

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home url={loginURL}/>
                    </Route>
                    <Route path="/playlists">
                        <PlaylistListContainer></PlaylistListContainer>
                    </Route>
                    <Route path="/selection" component={SelectionTable}>
                    </Route>
                </Switch>
            </Router>
        </div>
        );
    }
    
const Home = ({ url }) => {
    return (
        <Container className="home">
            <div class="title-text">
                <h1>Spotify Distributor</h1>
                <h2>Automate the distribution of songs to your other playlists, however you want</h2>
            </div>
            <img class="image1" src={image1}/>
            <div class="image-text1">
                1. Select playlists from your Spotify account
            </div>
            <div class="middle-text">
                2. Using machine learning, our program automatically decides what playlist a song should be in
            </div>            
            <img class="image-table" src={tableImage}/>
            <div class="table-caption">
                3. Don't like the resulting destination playlist? Have the final say before adding the song to your playlist!
            </div>
            <div class="login-div">
                <a href={url}>
                    <Button className="login-btn">
                        <img class="login-logo" src={logo} alt="" width="40"/>Login and try it here!
                    </Button>
                </a>
                <a href="https://github.com/turrence/spotify-music-distributor">Source</a>
            </div>
        </Container>
        )
    }
        
export default App;

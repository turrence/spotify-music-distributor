import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { PlaylistListContainer, SelectionTable } from './Components/components'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { get_login_url } from "./api"
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button'
import logo from './static/Spotify_Icon_RGB_White.png'


function App() {
    const [loginURL, setLoginURL] = useState("")

    useEffect(() => {
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
        <Container>
            <a href={url}>
                <Button class="login-btn">
                    <img class="login-logo" src={logo} alt="" width="40"/>Login
                </Button>
            </a>
        </Container>
        )
    }
        
export default App;

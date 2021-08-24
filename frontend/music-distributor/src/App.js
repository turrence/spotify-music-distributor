import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { PlaylistListContainer, SelectionTable } from './Components/components'
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button'
import logo from './static/Spotify_Icon_RGB_White.png'


function App() {    
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home/>
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
    
const Home = () => {
    return (
        <Container>
            <Button class="login-btn">
                <img class="login-logo" src={logo} alt="" width="40"/>Login
            </Button>
        </Container>
        )
    }
        
export default App;

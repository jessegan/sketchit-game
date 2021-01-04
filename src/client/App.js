import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './css/app.css'

import HomePage from './components/Home/HomePage'
import LobbyPage from './components/Lobby/LobbyPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' render={routerProps => (<HomePage {...routerProps} />) } />
        <Route path='/lobby/:code' render={routerProps => (<LobbyPage {...routerProps} />)} />
      </Switch>
    </Router>
  );
}

export default App;

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './css/app.css'

import HomePage from './components/Home/HomePage'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' render={routerProps => (<HomePage {...routerProps} />) } />
      </Switch>
    </Router>
  );
}

export default App;

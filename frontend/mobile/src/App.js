import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Homepage from './pages/HomePage'


class App extends Component {
    render() {
        return (
            <Switch>
              <Route exact path='/' component={Homepage} />
            </Switch>
        );
    }
}

export default App;
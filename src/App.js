import React, { Component } from "react"
import { BrowserRouter , Switch, Route } from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login'
import AuthenticatedComponent from './services/AuthenticatedComponent'
import Profile from './components/Profile'
import NotFound from './components/NotFound'

import Maintenance from './components/maintenance/MaintenanceOne'


export default class App extends Component {
  render() {
    return (
      <BrowserRouter >
        <Switch>
          <Route exact path="/login" component={Login} />
          
          <AuthenticatedComponent>
            <Route exact path="/" component={Home} />
            <Route exact path="/maintenance" component={Maintenance} />
            <Route exact path="/profile" component={Profile} />
            

          </AuthenticatedComponent>
        </Switch>
      </BrowserRouter>
    )
  }
}

import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login'
import Protected from './components/Protected'
import AuthenticatedComponent from './services/AuthenticatedComponent'
import TestPage from './components/TestPage'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          
          <AuthenticatedComponent>
            <Route exact path="/" component={Home} />
            <Route exact path="/protected" component={Protected} />
            <Route exact path="/TestPage" component={TestPage} />
          </AuthenticatedComponent>
        </Switch>
      </BrowserRouter>
    )
  }
}

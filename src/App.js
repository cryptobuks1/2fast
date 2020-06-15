import React, { Component } from "react"
import { BrowserRouter , Switch, Route } from "react-router-dom"
//import Home from './components/Home'
//import Login from './components/Login'
//import AuthenticatedComponent from './services/AuthenticatedComponent'
//import Profile from './components/Profile'
import Loadable from 'react-loadable'
//import Maintenance from './components/maintenance/MaintenanceOne'
import LazyLoad from 'react-lazyload'
class App extends Component {
  render() {

    const Login = Loadable({
      loader: () => import('./components/Login'),
      loading: () => null
    });
    const Home = Loadable({
      loader: () => import('./components/Home'),
      loading: () => null
    });
    const Profile = Loadable({
      loader: () => import('./components/Profile'),
      loading: () => null
    });
    const Maintenance = Loadable({
      loader: () => import('./components/maintenance/MaintenanceOne'),
      loading: () => null
    });
    const AuthenticatedComponent = Loadable({
      loader: () => import('./services/AuthenticatedComponent'),
      loading: () => null
    });

    return (
      <BrowserRouter >
        <Switch>
          <Route exact path="/login" component={Login} />
          
          <AuthenticatedComponent>
          <LazyLoad>
            <Route exact path="/" component={Home} />
            <Route exact path="/maintenance" component={Maintenance} />
            <Route exact path="/profile" component={Profile} />
            
          </LazyLoad>
          </AuthenticatedComponent>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default  App
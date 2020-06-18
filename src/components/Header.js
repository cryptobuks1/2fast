import React, { Component } from 'react'
import axios from 'axios'
import { getjwt } from '../components/helpers/jwt'
import { withRouter } from "react-router-dom"
import './header.css'
import IconSwipeableDrawer from './swipeableDrawer/IconSwipeableDrawer'
import Loadable from 'react-loadable'
class Header extends Component {
    constructor(props){
        super(props)
        
        this.logout = this.logout.bind(this)
        
    }

    logout(){
        localStorage.removeItem('user')
        localStorage.removeItem( 'user_id')
        this.props.history.push('/login')
    }

    render() {

        return (
        <div className="container-fluid" style={{marginTop:'20px'}}>
            <div>
                <IconSwipeableDrawer onLogout={this.logout}  />
            </div>
        </div>
        )
    }
}

export default withRouter(Header)
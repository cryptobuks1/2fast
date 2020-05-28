import React, { Component } from 'react'
import axios from 'axios'
import { getjwt } from '../components/helpers/jwt'
import Button from '@material-ui/core/Button'
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"
import './header.css'
import IconSwipeableDrawer from './swipeableDrawer/IconSwipeableDrawer'
import Profile from './Profile'

class Header extends Component {
    constructor(props){
        super(props)
        
        this.logout = this.logout.bind(this)
        
    }

    componentDidMount(){
        const jwt = getjwt()
        if(!jwt) {
            this.props.history.push('/login')
        }
        axios.get('http://54.254.141.16:3000/api/client' , 
        { 
            headers : { 'x-access-token' : jwt  } 
        })
        .then( res => {
            
        }).catch( err => {
            localStorage.removeItem('user')
            this.props.history.push('/login')
        })
    }

    logout(){
        localStorage.removeItem('user')
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
import React, { Component } from 'react'
import axios from 'axios'
import { getjwt } from '../components/helpers/jwt'
import Header from './Header'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
        
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
            <div>
            <Header onLogout={this.logout.bind(this)} />

            </div>
        )
    }
}

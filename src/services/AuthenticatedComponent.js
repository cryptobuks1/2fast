import React, { Component } from 'react'
import { getjwt } from '../components/helpers/jwt'
import { withRouter } from "react-router-dom"
import axios from 'axios'
import Logo from '../image/newFast.png'

class AuthenticatedComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            user : undefined
        }
    }

    componentDidMount(){
        const jwt = getjwt()
        if(!jwt) {
            this.props.history.push('/login')
        }
        axios.get('http://54.254.141.16:3000/api/client' , 
        { headers : { 'x-access-token' : jwt } } )
        .then( res => this.setState({
            user : res.data
        })).catch( err => {
            localStorage.removeItem('user')
            this.props.history.push('/login')
        })

    }

    render() {
        if(this.state.user === undefined){
            return (
                <div>
                   Loading ...
                </div>
            )
        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(AuthenticatedComponent)
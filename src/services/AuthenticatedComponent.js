import React, { Component } from 'react'
import { getjwt } from '../components/helpers/jwt'
import { withRouter } from "react-router-dom"
import axios from 'axios'

import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";
const override = css`
position:absolute;
top:0;
left:0;
right:0;
bottom:0;
margin:auto;
`;

var IPModule = require('../components/helpers/Ip')
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
        axios.get(`http://${IPModule.getIP()}:5001/api/v1/GetUserData` , 
        { headers : { 'x-access-token' : jwt } } )
        .then( res => {
            this.setState({
                user : res.data
            })
        }).catch( err => {
            localStorage.removeItem('user')
            this.props.history.push('/login')
        })

    }

    render() {
        if(this.state.user === undefined){
            return (
                <div>
                <div style={{  
                    height:' 100%',
                    width:'100%' }}>
                  <DotLoader
                  css={override}
                  size={100}
                  color={"#E8DA10"}
            
                />
                </div>
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
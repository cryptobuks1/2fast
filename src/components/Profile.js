import React, { Component } from 'react'
import axios from 'axios'
import { getjwt } from '../components/helpers/jwt'
import unimageuser from '../image/unimageuser.jpg'
import Header from './Header'
import LazyLoad from 'react-lazyload'
import Loadable from 'react-loadable'

var IPModule = require('./helpers/Ip')
export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            rolesName : 'ไม่มีตำแหน่ง',
            name : ' '
        }
    }

    componentDidMount(){
        const jwt = getjwt()
        if(!jwt) {
            this.props.history.push('/login')
        }
        axios.get(`http://${IPModule.getIP()}:5001/api/v1/GetUserData` , 
        { 
            headers : { 'x-access-token' : jwt  } 
        })
        .then( res => {
            this.setState({
                name: res.data.username
            })
            
        }).catch( err => {
            localStorage.removeItem('user')
            this.props.history.push('/login')
        })
    }


    render() {
        const {name, rolesName} = this.state
        const imageUser = {
            width:'50%', 
            maxWidth: '250px',
            borderRadius: '50%', 
            padding:'10px',
            top:'10px' ,
            marginRight:'auto',
            marginLeft:'auto'
        }

        return (
        <div className="container-fluid">
        <LazyLoad>
            <div className="row">
                <div className="col-2 col-md-2">
                    <Header />
                </div>                
            </div>

            <div className="row">
                <div className="col-12 col-md-12 text-center">
                    <img alt="imageUser" src={unimageuser} style={imageUser}/>
                </div>
            </div>
            
            <div className="row">
                <div className="col-4 col-md-4"></div>
                <div className="col-8 col-md-8" style={{top:'10px'}}>
                    <p class="font-weight-bold">{ name }</p>
                    <p class="font-weight-bold">{ rolesName }</p>
                </div>
            </div>
            </LazyLoad>
        </div>
        )
    }
}

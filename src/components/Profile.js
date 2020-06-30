import React, { Component } from 'react'
import axios from 'axios'
import { getjwt } from '../components/helpers/jwt'
import unimageuser from '../image/unimageuser.jpg'
//import Header from './Header'
import LazyLoad from 'react-lazyload'
import Loadable from 'react-loadable'

var IPModule = require('./helpers/Ip')
var RemoveLocal = require('./helpers/removeLocal')

const Header = Loadable({
    loader: () => import('./Header'),
    loading: () => null
  });

export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            rolesName : 'ไม่มีตำแหน่ง',
            companyName : ' ',
            name : ' '
        }
    }

    componentDidMount(){
        const jwt = getjwt()
        if(!jwt) {
            this.props.history.push('/login')
        }
        const userID = localStorage.getItem('user_id')
        axios.get(`${IPModule.getIP()}:5002/api/v1/GetUserData/${userID}` , 
        { 
            headers : { 'x-access-token' : jwt  } 
        })
        .then( res => {
            this.setState({
                name: res.data.username,
                companyName : res.data.companyName,
                rolesName: res.data.rolename
            })
            localStorage.removeItem('teamproject_ID')

        }).catch( err => {
            RemoveLocal.removeDataLocalStorage()
            this.props.history.push('/login')
        })
        
    }


    render() {
        const {name, rolesName, companyName} = this.state
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
                <div className="col-3 col-md-3"></div>
                <div className="col-9 col-md-9" style={{top:'10px'}}>
                    <p class="font-weight-bold">ชื่อ : { name }</p>
                    <p class="font-weight-bold">ตำแหน่ง : { rolesName }</p>
                    <p class="font-weight-bold">บริษัท : { companyName }</p>
                </div>
            </div>
            </LazyLoad>
        </div>
        )
    }
}

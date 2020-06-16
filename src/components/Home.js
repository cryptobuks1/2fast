import React, { Component } from 'react'
import axios from 'axios'
import { getjwt } from '../components/helpers/jwt'
import Header from './Header'
import Alert from 'react-bootstrap/Alert'
import { Link } from "react-router-dom"
import Loadable from 'react-loadable'
import LazyLoad from 'react-lazyload'

var IPModule = require('./helpers/Ip')
class Home extends Component {
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
        axios.get(`${IPModule.getIP()}:5001/api/v1/GetUserData` , 
        { 
            headers : { 'x-access-token' : jwt  } 
        })
        .then( res => {

            
        }).catch( err => {
            localStorage.removeItem('user')
            this.props.history.push('/login')
        })
    }

    render() {
        const styleButton = {
            backgroundColor:'#E8DA10',
            top:'10px'
        }
        const oudddt = {
            position:'relative',
            width: '100%',
            
        }
        const iinnnn = {
            position:'relative',
            float: 'left',
            clear: 'both' ,
            width:'100%'
            
        }

        
        return (
            <div className="container-fluid">
            <LazyLoad>
            <Header />
            <h2 className="text-center" style={{marginTop:'5%'}}>
                งานที่ต้องติดตั้ง
            </h2>
            <br />
        <div style={oudddt}>

           <div style={iinnnn}>
           <Link className="text-warning" to="/maintenance">
                <Alert variant="success" > งานที่โรงพยาบาล </Alert>
            </Link>
           </div>

           <div style={iinnnn}>
           <Link className="text-warning" to="/maintenance">
                <Alert variant="success" > งานที่เรือนจำ </Alert>
            </Link>
           </div>

           <div style={iinnnn}>
           <Link className="text-warning" to="/maintenance">
                <Alert variant="danger" > งานที่โรงพยาบาล </Alert>
            </Link>
           </div>
        </div>
        </LazyLoad>
            </div>
        )
    }
}

export default Home

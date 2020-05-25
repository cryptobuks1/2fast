import React, { Component } from 'react'
import axios from 'axios'
import { getjwt } from '../components/helpers/jwt'
import Header from './Header'
import Alert from 'react-bootstrap/Alert'
import { Link } from "react-router-dom"

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
        const styleButton = {
            backgroundColor:'#E8DA10',
            top:'10px'
        }
        const oudddt = {
            position:'absolute'
            
        }
        const iinnnn = {
            position:'absolute',
            float: 'right'
            
        }
        return (
            <div>
            <Header />
            <h2 className="text-center">
                งานที่ต้องติดตั้ง
            </h2>
        <div style={{oudddt}}>

           <div style={{iinnnn}}>
           <Link className="text-warning" to="/maintenancepage">
                <Alert variant="success" style={{width:'30%'}}> งานที่โรงพยาบาล </Alert>
            </Link>
           </div>

           <div style={{iinnnn}}>
           <Link className="text-warning" to="/maintenancepage">
                <Alert variant="success" style={{width:'30%'}}> งานที่โรงพยาบาล </Alert>
            </Link>
           </div>

           <div style={{iinnnn}}>
           <Link className="text-warning" to="/maintenancepage">
                <Alert variant="danger" style={{width:'30%'}}> งานที่โรงพยาบาล </Alert>
            </Link>
           </div>
        </div>

            </div>
        )
    }
}

export default Home

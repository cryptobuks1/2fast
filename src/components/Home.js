import React, { Component } from 'react'
import axios from 'axios'
import { getjwt } from '../components/helpers/jwt'
//import Header from './Header'
//import Alert from 'react-bootstrap/Alert'
import { Link } from "react-router-dom"
import Loadable from 'react-loadable'

  
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

        const Header = Loadable({
            loader: () => import('./Header'),
            loading: () => null
          });
          const Alert = Loadable({
            loader: () => import('react-bootstrap/Alert'),
            loading: () => null
          });
        
        return (
            <div className="container-fluid">
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

            </div>
        )
    }
}

export default Home

import React, { Component } from 'react'
import axios from 'axios'
import { getjwt } from '../components/helpers/jwt'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from '@material-ui/core/Button'
import unimageuser from '../image/unimageuser.jpg'
import { Link } from "react-router-dom"

export default class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            name : '',
            email : '',
            rolesName : []

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
            this.setState({
                name : res.data.meta_client.user_meta.name,
                email : res.data.meta_client.user_meta.email,
                rolesName : res.data.meta_client.user_meta.roles
            })
            
        }).catch( err => {
            localStorage.removeItem('user')
            this.props.history.push('/login')
        })
    }

    showRoles(rolesName){
        if(!rolesName || rolesName.length === 0 ){
            return <p>ไม่มีตำแหน่ง</p>
        } else {
            return rolesName.map( chech => {
                    return <p key={chech.id}> {chech.name}</p>
                } )
        }
    }

    render() {
        const {name, email, rolesName} = this.state
        const imageUser = {
            width:'100%', 
            borderRadius: '50%', 
            padding:'10px',
            top:'10px' 
        }
        const styleButton = {
            backgroundColor:'#E8DA10',
            top:'10px'
        }
        const widthLabel = {
            display:'block',
            marginTop:'2%'
    }
        return (
            /*  style={{position:'fixed', top:'0', overflow:'hidden'}}  */
        <div style={{marginLeft:'5%'}}>
            <Row>
                <Col >
                <img alt="imageUser" src={unimageuser} style={imageUser}/>
                </Col>
                <Col style={{top:'10px'}}>
                    <p>{name}</p>
                    { this.showRoles(rolesName) }
                </Col>
                <Col>

                    <Button onClick={() => this.props.onLogout() } style={styleButton}>Logout</Button>

                </Col>
            </Row>
            <Row>
                <div>
                <ul className="list-inline" style={widthLabel}>
                    <li className="list-inline-item"> <Link className="text-warning" to="/">Main</Link> </li>
                    <li className="list-inline-item">|</li>
                    <li className="list-inline-item"> <Link className="text-warning" to="/maintenancepage" >Maintenance Page</Link> </li>
                    <li className="list-inline-item">|</li>
                </ul>
                </div>
            </Row>
        </div>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios'
import { getjwt } from '../components/helpers/jwt'
import Button from '@material-ui/core/Button'
import unimageuser from '../image/unimageuser.jpg'
import { Link } from "react-router-dom"
import { withRouter } from "react-router-dom"
import './header.css'
import IconSwipeableDrawer from './swipeableDrawer/IconSwipeableDrawer'

class Header extends Component {
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

    logout(){
        localStorage.removeItem('user')
        this.props.history.push('/login')
    }

    render() {
        const {name, email, rolesName} = this.state
        const imageUser = {
            width:'50%', 
            borderRadius: '50%', 
            padding:'10px',
            top:'10px' ,
            marginRight:'auto',
            marginLeft:'auto'
        }
        const divImageUser = {
            width:'30%'
        }
        const styleButton = {
            backgroundColor:'#E8DA10',
            top:'10px'
        }
        const widthLabel = {
            display:'block',
            marginTop:'2%',
            marginRight: 'auto',
            marginLeft: 'auto'
    }
        return (
            /*  style={{position:'fixed', top:'0', overflow:'hidden'}}  */
        <div className="container-fluid" style={{marginTop:'5px'}}>
            <div className="row">
                <div className="col-5 col-md-5" style={divImageUser}>
                    <img alt="imageUser" src={unimageuser} style={imageUser}/>
                </div>
                <div className="col-5 col-md-5" style={{top:'10px'}}>
                    <p>{name}</p>
                    { this.showRoles(rolesName) }
                </div>
                <div className="col-2 col-md-2">
        { /*   <Button onClick={ this.logout.bind(this)} style={styleButton}>Logout</Button> */}

                <IconSwipeableDrawer onLogout={this.logout}  />

                </div>
 
            </div>
            <hr />
            <div className="row">
                <div className="list-inline text-center col-md-12" style={widthLabel}>
                <ul>
                    <li className="list-inline-item"> <Link className="text-warning" to="/">Main</Link> </li>
                    <li className="list-inline-item">|</li>
                    <li className="list-inline-item"> <Link className="text-warning" to="/maintenance" >Maintenance Page</Link> </li>
                </ul>
                </div>
            </div>
            
        </div>
        )
    }
}

export default withRouter(Header)
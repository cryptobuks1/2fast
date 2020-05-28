import React, { Component } from 'react'
import axios from 'axios'
import { getjwt } from '../components/helpers/jwt'
import unimageuser from '../image/unimageuser.jpg'
import Header from './Header'

export default class Profile extends Component {
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
        return (
        <div className="container-fluid">
            <div className="row">
            <div className="col-2 col-md-2">
               <Header />
            </div>

            
                <div className="col-5 col-md-5" style={divImageUser}>
                    <img alt="imageUser" src={unimageuser} style={imageUser}/>
                </div>
                <div className="col-5 col-md-5" style={{top:'10px'}}>
                    <p>{name}</p>
                    { this.showRoles(rolesName) }
                </div>
                </div>
        </div>
        )
    }
}

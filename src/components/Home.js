import React, { Component } from 'react'
import axios from 'axios'
import { getjwt } from '../components/helpers/jwt'

export default class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            name : '',
            email : '',
            rolesName : []

        }
        this.logout = this.logout.bind(this)
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
            console.log('name = ' + res.data.meta_client.user_meta.roles )
        }).catch( err => {
            localStorage.removeItem('user')
            this.props.history.push('/login')
        })
    }

    logout(){
        localStorage.removeItem('user')
        this.props.history.push('/login')
    }

    showRoles(rolesName){
        if(!rolesName || rolesName.length === 0 ){
            return <p>ไม่มีตำแหน่ง</p>
        } else {
            return rolesName.map( chech => {
                    return <p>มีตำแหน่งเป็น {chech.name}</p>
                } )
        }
    }

    render() {
        const {name, email, rolesName} = this.state
        return (
            <div>
                Homeeeeeeeeeeee
                <p>ชื่อ = {name}</p>
                <p>Email = {email}</p>
                
                { this.showRoles(rolesName) }
                
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

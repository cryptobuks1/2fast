import React, { Component } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import logo from '../image/newFast.svg'
import NokSoft from '../image/newLogo.svg'
import Spinner from 'react-bootstrap/Spinner'
import LazyLoad from 'react-lazyload'
import Loadable from 'react-loadable'

var IPModule = require('./helpers/Ip')
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username : '',
            password : '',
            spinnerS : false,
            message : '',
            alertMessage : false
        }
        this.change = this.change.bind(this)
        this.submit = this.submit.bind(this)
    }

    change(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    submit(e){
        e.preventDefault()
        this.startSpinnerLoad()
        axios.post(`${IPModule.getIP()}:5001/login` , {
            username : this.state.username,
            password : this.state.password
        })
        .then( res => {
                    localStorage.setItem( 'user' , res.data.token)
                    this.props.history.push('/')
                    this.stoptSpinnerLoad()
        }).catch( error => {
            console.log('error login page = ' + error)
            this.stoptSpinnerLoad()
            this.setState({
                message : error.response.data.Error
            })
            this.showMessage()
        }  )
    }

    startSpinnerLoad(){
    return    this.setState({
            spinnerS : true
        })
    }
    stoptSpinnerLoad(){
    return    this.setState({
            spinnerS : false
        })
    }

    showMessage(){
        this.setState({
            alertMessage : true
        })
        if( this.state.alertMessage === true){
                setTimeout(() => {
                    this.setState({
                        alertMessage : false
                    }) 
                }, 3000);
        }   
    }

    render() {
        const { spinnerS, alertMessage, message } = this.state
        const widthLabel = {
            width:'280px',
            display:'block',
            marginLeft:'auto', 
            marginRight:'auto'
        }
        
        return (
            <div className="container-fluid">
              <div>
                <LazyLoad>
                    <img alt="logo" src={logo} style={{
                                    marginLeft:'auto', 
                                    marginRight:'auto', 
                                    display:'block', 
                                    marginBottom:'50px' , 
                                    maxWidth:'60%',
                                    marginTop:'20%'
                                }}/>
                </LazyLoad>
              </div>
                <form  onSubmit={ e => this.submit(e) }>
                  <TextField
                    style={widthLabel}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="id"
                    id="id"
                    label="ID"
                    autoComplete="id"
                    autoFocus
                    name="username" 
                    onChange={ e => this.change(e)} 
                    value={this.state.username}
                  />
                  <TextField
                    style={widthLabel}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    typeof="password"
                    label="Password"
                    type="password"
                    id="password"
                    name="password" 
                    onChange={ e => this.change(e)} 
                    value={this.state.password}
                    autoComplete="current-password"
                  />
                  { alertMessage? 
                    <p className="text-center" style={{
                         color:'red', marginTop:'3px', textAlign: 'center'}}>{message}</p> : null
                    }
                  <Button
                  style={{backgroundColor:'#E8DA10', marginTop:'5px', height:' 45px', width:'280px', display:'block',marginLeft:'auto', marginRight:'auto',}}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                  { spinnerS ? <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    style={{marginRight:'5%'}}
                  /> : null

                   }
                    <span>Sign In</span>
                  </Button>
                </form>
                <div style={{marginTop:"25%"}}>
                <LazyLoad>
                <img alt="logo" src={NokSoft} style={{width:"30%", marginLeft:'auto', marginRight:'auto', display: "block"}} />
                </LazyLoad>
                </div>
            </div>
        
        )
    }
}

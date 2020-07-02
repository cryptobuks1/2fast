import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { getjwt } from '../helpers/jwt'
import { MDBInput } from "mdbreact"

var IPModule = require('../helpers/Ip')
var RemoveLocal = require('../helpers/removeLocal')

export default class MaintenanceTwo extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : ' ',
            locationToSetup : ' ',
            imgBLOB : ' ',
            problem : 'ปัญหาที่พบเจอขณะติดตั้ง',
            fixed : 'วิธีแก้ไข',
            message : null
        }
    }

    async componentDidMount(){
        const jwt = getjwt()
        if(!jwt) {
            this.props.history.push('/login')
        }
        axios.get(`${IPModule.getIP()}:3000/api/v1/posts` , 
        { 
            headers : { 'x-access-token' : jwt  } 
        })
        .then( res => {
            if( res.data.rows[0].data[0].problem && res.data.rows[0].data[0].fixed ){
                this.setState({
                    id : res.data.rows[0].id,
                    locationToSetup : res.data.rows[0].data[0].locationToSetup,
                    imgBLOB : res.data.rows[0].data[0].imgBLOB,
                    problem : res.data.rows[0].data[0].problem,
                    fixed : res.data.rows[0].data[0].fixed,
                })
            } else {
                this.setState({
                    id : res.data.rows[0].id,
                    locationToSetup : res.data.rows[0].data[0].locationToSetup,
                    imgBLOB : res.data.rows[0].data[0].imgBLOB
                })
            }
        }).catch( err => {
            RemoveLocal.removeDataLocalStorage()
            this.props.history.push('/login')
        })
        
    }

    onChange = e => {
        const { name, value } = e.target
        this.setState({
          [name]: value
        })
      }

    async  sendData(){
      const teamID = await localStorage.getItem('teamproject_ID')
      const jwt = await getjwt()
        if(!jwt) {
            this.props.history.push('/login')
        }
        axios({
          method: 'put',
          url: `${IPModule.getIP()}:3000/api/v1/posts/${this.state.id}`,
          headers : { 'x-access-token' : jwt  } ,
            data: {
              "project_pair_key" : `${teamID}`,
              "data" : {
                      "locationToSetup" : `${this.state.locationToSetup}`,
                      "imgBLOB" : `${this.state.imgBLOB}`,
                      "problem" : `${this.state.problem}`,
                      "fixed" : `${this.state.fixed}`,
              }
          }
        }).then( res => {
          this.setState({
            message : 'ส่งข้อมูลสำเร็จ'
          })
        }).catch( error => {

          this.setState({
            message : 'ส่งข้อมูลไม่สำเร็จ'
          })
          
        })
      }

      showMessageUpload(){
        if(this.state.message){
          if(this.state.message === "ส่งข้อมูลสำเร็จ"){
              return <p style={{ marginTop:'3px', color:'green' }} >{this.state.message}</p>
          } else if(this.state.message === "ส่งข้อมูลไม่สำเร็จ"){
              return <p style={{ marginTop:'3px', color:'red' }} >{this.state.message}</p>
          } else {
              return <p style={{ marginTop:'3px', color:'red' }} >internet error</p>
          }
        }

      }

    render() {
        return (
        <div>

            <form>
                <MDBInput label={`${this.state.problem}`} name="problem" onChange={this.onChange}/>
                <h6>วิธีแก้ไข</h6>
                <MDBInput label={`${this.state.fixed}`} name="fixed" onChange={this.onChange}/>
            </form>
            <div className="container-fluid">
            <Button variant="btn btn-block btn-success" onClick={ () => this.sendData()}>ส่งข้อมูล</Button>{' '}
            <br />
            {this.showMessageUpload()}
            </div>

        </div>
        )
    }
}

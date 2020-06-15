import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import { MDBInput } from "mdbreact"
import LazyLoad from 'react-lazyload'
import Loadable from 'react-loadable'
export default class MaintenanceTwo extends Component {
    constructor(props){
        super(props)
        this.state = {
            StepTwoFieldOne : '',
            StepTwoFieldTwo : ''
        }
    }

    onChange = e => {
        const { name, value } = e.target
        this.setState({
          [name]: value
        })
      }

      sendData(){
          console.log("ปัญหาที่พบเจอ = " + this.state.StepTwoFieldOne)
          console.log("วิธีแก้ไข = " + this.state.StepTwoFieldTwo)
      }

    render() {
        return (
        <div>
        <LazyLoad>
            <form>
                <MDBInput label="ปัญหาที่พบเจอ" name="StepTwoFieldOne" onChange={this.onChange}/>
                <h6>วิธีแก้ไข</h6>
                <MDBInput label="วิธีแก้ไข" name="StepTwoFieldTwo" onChange={this.onChange}/>
            </form>
            <div className="container-fluid">
            <Button variant="btn btn-block btn-success" onClick={ () => this.sendData()}>ส่งข้อมูล</Button>{' '}
            <br />
            </div>
        </LazyLoad>
        </div>
        )
    }
}

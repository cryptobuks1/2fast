import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import { MDBInput } from "mdbreact"

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
          console.log("2-1 = " + this.state.StepTwoFieldOne)
          console.log("2-2 = " + this.state.StepTwoFieldTwo)
      }

    render() {
        return (
        <div>
            <form action="" method="post">
                <MDBInput label="2-1" name="StepTwoFieldOne" onChange={this.onChange}/>
                <MDBInput label="2-2" name="StepTwoFieldTwo" onChange={this.onChange}/>
            </form>
            <div className="container-fluid">
            <Button variant="btn btn-block btn-success" onClick={ () => this.sendData()}>ส่งข้อมูล</Button>{' '}
            <br />
            </div>
        </div>
        )
    }
}

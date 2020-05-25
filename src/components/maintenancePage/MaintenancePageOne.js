import React, { Component } from 'react'
import Header from '../Header'
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBCardBody, MDBInput } from "mdbreact"
import UploadImage from './UploadImage'
import MaintenancePageTwo from './MaintenancePageTwo'
import MaintenancePageThree from './MaintenancePageThree'
import { Button } from 'react-bootstrap';

export default class MaintenancePageOne extends Component {

    constructor(props){
        super(props)
        this.state = {
            formActivePanel1: 1,
            formActivePanel1Changed: false,
        }
    }

    swapFormActive = (a) => (param) => (e) => {
        this.setState({
          ['formActivePanel' + a]: param,
          ['formActivePanel' + a + 'Changed']: true
        });
      }
      
      handleNextPrevClick = (a) => (param) => (e) => {
        this.setState({
          ['formActivePanel' + a]: param,
          ['formActivePanel' + a + 'Changed']: true
        });
      }
      
      calculateAutofocus = (a) => {
        if (this.state['formActivePanel' + a + 'Changed']) {
          return true
        }
      }

      onChange = e => {
        const { name, value } = e.target
    
        this.setState({
          [name]: value
        })
      }

    render() {
        return (
            <div>
            <Header />
                <div className="container-fluid">
                    <MDBContainer>
      <MDBRow>
        <MDBCol xl="6" lg="7" md="10">
          
            <MDBCardBody>
              <h2 className="text-center font-weight-bold pt-4 pb-5">
                <strong>การติดตั้ง</strong>
              </h2>
              <MDBStepper form>
                <MDBStep form>
                  <span onClick={this.swapFormActive(1)(1)}>
                    <MDBBtn color={ this.state.formActivePanel1===1 ? "indigo" : "default" } circle>
                      รูป1
                    </MDBBtn>
                  </span>
                  <p>ขั้นที่ 1</p>
                </MDBStep>

                <MDBStep form>
                  <span onClick={this.swapFormActive(1)(2)}>
                    <MDBBtn color={ this.state.formActivePanel1===2 ? "indigo" : "default" } circle>
                    รูป2
                    </MDBBtn>
                  </span>
                  <p>ขั้นที่ 2</p>
                </MDBStep>

                <MDBStep form>
                  <span onClick={this.swapFormActive(1)(3)}>
                    <MDBBtn color={ this.state.formActivePanel1===3 ? "indigo" : "default" } circle>
                    รูป3
                    </MDBBtn>
                  </span>
                  <p>ขั้นที่ 3</p>
                </MDBStep>
              </MDBStepper>

              <form action="" method="post">
                <MDBRow>

                  {this.state.formActivePanel1 === 1 && (
                  <MDBCol md="12">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>ขั้นที่ 1</strong>
                    </h3>

                    <UploadImage />
                    
                    <Button color="primary" rounded className="float-right" onClick={this.handleNextPrevClick(1)(2)}>
                      ต่อไป
                    </Button>
                  </MDBCol>
                  )}

                  {this.state.formActivePanel1 === 2 && (
                  <MDBCol md="12">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>ขั้นที่ 2</strong>
                    </h3>
                    <MaintenancePageTwo />
                    <Button color="warning" rounded className="float-left" onClick={this.handleNextPrevClick(1)(1)}>
                    ย้อนกลับ
                    </Button>
                    <Button color="primary" rounded className="float-right" onClick={this.handleNextPrevClick(1)(3)}>
                      ต่อไป
                    </Button>
                  </MDBCol>
                  )}

                  {this.state.formActivePanel1 === 3 && (
                  <MDBCol md="12">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>ขั้นที่ 3</strong>
                    </h3>
                    
                    <MaintenancePageThree />
                    <div>
                    <Button color="warning" rounded className="float-left" onClick={this.handleNextPrevClick(1)(2)}
                    autoFocus={this.calculateAutofocus(1)}>
                    ย้อนกลับ
                  </Button>
                    </div>
                  </MDBCol>
                  )}

                </MDBRow>
              </form>
              
            </MDBCardBody>
         
        </MDBCol>
      </MDBRow>
    </MDBContainer>
                </div>

            </div>
        )
    }
}

import React, { Component } from 'react'
import Header from '../Header'
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBCardBody, MDBInput } from "mdbreact"
import UploadImage from './UploadImage'
import MaintenanceTwo from './MaintenanceTwo'
import MaintenanceThree from './MaintenanceThree'
import { Button } from 'react-bootstrap';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

export default class MaintenanceOne extends Component {
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

      logout(){
        localStorage.removeItem('user')
        this.props.history.push('/login')
      }


    render() {
      const styleButton = {
        backgroundColor:'#E8DA10',
        top:'10px'
    }
        return (
            <div className="container-fluid">
            <Header />
                <div>
                    <MDBContainer>
      <MDBRow>
        <MDBCol xl="12" lg="12" md="12">
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
                      <strong>สถานที่ติดตั้ง</strong>
                    </h3>

                    <UploadImage />
                    
                    <Button color="primary" rounded className="float-right" onClick={this.handleNextPrevClick(1)(2)}>
                      <ArrowForwardIcon />
                    </Button>
                  </MDBCol>
                  )}

                  {this.state.formActivePanel1 === 2 && (
                  <MDBCol md="12">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>ปัญหาที่พบเจอขณะติดตั้ง</strong>
                    </h3>
                    <MaintenanceTwo />

                    <Button color="warning" rounded className="float-left" onClick={this.handleNextPrevClick(1)(1)}>
                    <ArrowBackIcon />
                    </Button>
                    <Button color="primary" rounded className="float-right" onClick={this.handleNextPrevClick(1)(3)}>
                    <ArrowForwardIcon />
                    </Button>
                    
                  </MDBCol>
                  )}

                  {this.state.formActivePanel1 === 3 && (
                  <MDBCol md="12">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>ขั้นที่ 3</strong>
                    </h3>
                    
                    <MaintenanceThree />
                    
                    <Button color="warning" rounded className="float-left" onClick={this.handleNextPrevClick(1)(2)}
                    autoFocus={this.calculateAutofocus(1)}>
                    <ArrowBackIcon />
                    </Button>
                   
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

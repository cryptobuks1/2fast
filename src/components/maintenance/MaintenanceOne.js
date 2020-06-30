import React, { Component } from 'react'
//import Header from '../Header'
import axios from 'axios'
import { getjwt } from '../helpers/jwt'
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBCardBody, MDBInput } from "mdbreact"
//import UploadImage from './UploadImage'
//import MaintenanceTwo from './MaintenanceTwo'
//import MaintenanceThree from './MaintenanceThree'
import Button  from 'react-bootstrap/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HelpIcon from '@material-ui/icons/Help';
import GradeIcon from '@material-ui/icons/Grade';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import Loadable from 'react-loadable'

const Header = Loadable({
  loader: () => import('../Header'),
  loading: () => null
});
const UploadImage = Loadable({
  loader: () => import('./UploadImage'),
  loading: () => null
});
const MaintenanceTwo = Loadable({
  loader: () => import('./MaintenanceTwo'),
  loading: () => null
});
const MaintenanceThree = Loadable({
  loader: () => import('./MaintenanceThree'),
  loading: () => null
});

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

            <div>
            <Header />
            </div>
                <div style={{marginTop:'5%'}}>
                    <MDBContainer>
      <MDBRow>
        <MDBCol xl="12" lg="12" md="12">
            <MDBCardBody>
              <h2 className="text-center font-weight-bold">
                <strong>การติดตั้ง</strong>
              </h2>
              <br />
              <MDBStepper form>
                <MDBStep form>
                  <span onClick={this.swapFormActive(1)(1)}>
                    <MDBBtn color={ this.state.formActivePanel1===1 ? "indigo" : "default" } circle>
                      <LocationOnIcon fontSize="small" />
                    </MDBBtn>
                  </span>
                  <p>ขั้นที่ 1</p>
                </MDBStep>

                <MDBStep form>
                  <span onClick={this.swapFormActive(1)(2)}>
                    <MDBBtn color={ this.state.formActivePanel1===2 ? "indigo" : "default" } circle>
                      <HelpIcon fontSize="small" />
                    </MDBBtn>
                  </span>
                  <p>ขั้นที่ 2</p>
                </MDBStep>

                <MDBStep form>
                  <span onClick={this.swapFormActive(1)(3)}>
                    <MDBBtn color={ this.state.formActivePanel1===3 ? "indigo" : "default" } circle>
                      <GradeIcon fontSize="small" />
                    </MDBBtn>
                  </span>
                  <p>ขั้นที่ 3</p>
                </MDBStep>
              </MDBStepper>

              <form>
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
                      <strong>ประเมินความพึงพอใจการติดตัง</strong>
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

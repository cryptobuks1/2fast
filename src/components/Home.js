import React, { Component } from 'react'
import axios from 'axios'
import { getjwt } from '../components/helpers/jwt'
import Header from './Header'
import Alert from 'react-bootstrap/Alert'
import { Link } from "react-router-dom"
import Loadable from 'react-loadable'

var IPModule = require('./helpers/Ip')
var RemoveLocal = require('./helpers/removeLocal')
class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            projectList: [ ]
        }
        
    }

    componentDidMount(){
        const jwt = getjwt()
        if(!jwt) {
            this.props.history.push('/login')
        }
       
        axios.get(`${IPModule.getIP()}:5003/api/v1/teamproject` , 
        { 
            headers : { 'x-access-token' : jwt  } 
        })
        .then( res => {
                this.setState({
                    projectList : res.data.projectList
                })
                localStorage.removeItem('teamproject_ID')
        }).catch( err => {
            RemoveLocal.removeDataLocalStorage()
            this.props.history.push('/login')
        })
    }

    showJobList(projectList){
    return projectList.map( jobList => {
        if( jobList.status_name === "Active"){
            return (
                <div style={{   position:'relative',
                                float: 'left',
                                clear: 'both' ,
                                width:'100%'    }}>
                                
                <Link className="text-warning"  to="/ProjectJob" 
                      onClick={ () => localStorage.setItem( 'teamproject_ID' , jobList.teamprojecthasproject_public_id)} >
                    <Alert variant="warning" > 
                        <p><h3>กำลังรอปฎิบัติงาน</h3></p> 
                        <p> ทีม {jobList.teamproject_name}</p> 
                        <p> ชื่อโปรเจค {jobList.project_name}</p> 
                        <p> สร้างเมื่อเวลา {jobList.created}</p> </Alert>
                </Link>
                </div> 
            )
        } else {
            return (
                <div style={{   position:'relative',
                                float: 'left',
                                clear: 'both' ,
                                width:'100%'    }}>
                <Link className="text-warning"  to="/ProjectJob"   
                      onClick={ () => localStorage.setItem( 'teamproject_ID' , jobList.teamprojecthasproject_public_id)} >
                    <Alert variant="success" > 
                        <p><h3>ปฎิบัติงานเสร็จเรียบร้อยแล้ว</h3></p> 
                        <p> ทีม {jobList.teamproject_name}</p> 
                        <p> ชื่อโปรเจค {jobList.project_name}</p> 
                        <p> สร้างเมื่อเวลา {jobList.created}</p> </Alert>
                </Link>
                </div> 
            )
        }
    }) 
    }

    render() {
        const projectList = this.state.projectList
        const styleButton = {
            backgroundColor:'#E8DA10',
            top:'10px'
        }
        const oudddt = {
            position:'relative',
            width: '100%',
            
        }
        const iinnnn = {
            position:'relative',
            float: 'left',
            clear: 'both' ,
            width:'100%'
            
        }

        
        return (
            <div className="container-fluid">
                
                <Header />
                    <h2 className="text-center" style={{marginTop:'5%'}}>
                        งานที่ต้องติดตั้ง
                    </h2>
                    <br />
                    <div style={oudddt}>
                        {this.showJobList(projectList)}
                    </div>
                
            </div>
        )
    }
}

export default Home

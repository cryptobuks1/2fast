import React, { Component } from 'react'
//import Header from './Header'
import axios from 'axios'
import { getjwt } from '../components/helpers/jwt'
import { Link } from "react-router-dom"
import Alert from 'react-bootstrap/Alert'
import Loadable from 'react-loadable'

var IPModule = require('./helpers/Ip')
var RemoveLocal = require('./helpers/removeLocal')

const Header = Loadable({
    loader: () => import('./Header'),
    loading: () => null
  });
export default class ProjectJob extends Component {
    constructor(props){
        super(props)
        this.state = {
            projectList : [ ]
        }
    }

async    componentDidMount(){
        const jwt = getjwt()
        if(!jwt) {
            this.props.history.push('/login')
        }
        const teamID = await localStorage.getItem('teamproject_ID')
        axios.get(`${IPModule.getIP()}:5003/api/v1/projectjob/${teamID}` , 
        { 
            headers : { 'x-access-token' : jwt  } 
        })
        .then( res => {
                this.setState({
                    projectList : res.data.projectList
                })
        }).catch( err => {
            RemoveLocal.removeDataLocalStorage()
            this.props.history.push('/login')
        })
        
    }

    showProjectList(projectList){
        return  projectList.map( listProject => {
                    return (
                        <Link className="text-warning" to="/maintenance" >
                            <Alert variant="warning" > 
                                <p>{listProject.job_name}</p> 
                                <p>{listProject.job_created}</p> 
                            </Alert>
                        </Link>
                    )
                } )
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
                        {this.showProjectList(projectList)}
                    </div>
            </div>
        )
    }
}

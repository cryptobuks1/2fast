import React, { Component } from 'react'
import { MDBInput } from "mdbreact"
import Button from 'react-bootstrap/Button'
import { Rating } from 'semantic-ui-react'
import SignaturePad from 'react-signature-canvas'
import axios from 'axios'
import { getjwt } from '../helpers/jwt'
import './styles.module.sig.css'

var IPModule = require('../helpers/Ip')
var RemoveLocal = require('../helpers/removeLocal')

export default class MaintenanceThree extends Component {
    constructor(props){
        super(props)
        this.state={
            id : ' ',
            locationToSetup : ' ',
            imgBLOB : ' ',
            problem : 'ปัญหาที่พบเจอขณะติดตั้ง',
            fixed : 'วิธีแก้ไข',
            message : null,

            SignatureName: 'ชื่อผู้ดูแลสถานที่ติดตั้ง',
            valueStar : ' ',
            messageRating : 'โปรดประเมินการติดตั้ง',
            suggestion : 'ข้อเสนอแนะ',
            imgSignatureBLOB : null
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
          if( res.data.rows[0].data[0].SignatureName && res.data.rows[0].data[0].valueStar ){
              this.setState({
                  id : res.data.rows[0].id,
                  locationToSetup : res.data.rows[0].data[0].locationToSetup,
                  imgBLOB : res.data.rows[0].data[0].imgBLOB,
                  problem : res.data.rows[0].data[0].problem,
                  fixed : res.data.rows[0].data[0].fixed,

                  SignatureName : res.data.rows[0].data[0].SignatureName,
                  valueStar : res.data.rows[0].data[0].valueStar,
                  messageRating : res.data.rows[0].data[0].messageRating,
                  suggestion : res.data.rows[0].data[0].suggestion,
                  imgSignatureBLOB : res.data.rows[0].data[0].imgSignatureBLOB
              })
          } else {
              this.setState({
                  id : res.data.rows[0].id,
                  locationToSetup : res.data.rows[0].data[0].locationToSetup,
                  imgBLOB : res.data.rows[0].data[0].imgBLOB,
                  problem : res.data.rows[0].data[0].problem,
                  fixed : res.data.rows[0].data[0].fixed,
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

    handleRate = async (e, { rating }) =>{
      await this.addNumbwe(e, { rating })
            this.showText()
    }
  
    addNumbwe = (e, { rating }) => {
      this.setState({ valueStar : rating })
    }
  
    showText = () =>{
          switch (this.state.valueStar){
            case 5 :
              return this.setState({ messageRating : "ประทับใจ" })
              break
            case 4 :
              return this.setState({ messageRating : "ดีมาก" }) 
              break
            case 3 :
              return this.setState({ messageRating : "ดี" }) 
              break
            case 2 :
              return this.setState({ messageRating : "พอใช้" }) 
              break
            case 1 :
              return this.setState({ messageRating : "ต้องปรับปรุง" }) 
              break
            default:
              return null
          }
    }

    clear = () => {
      this.sigPad.clear()
      this.setState({
        imgSignatureBLOB: null
      })
    }
    trim = () => {
      this.convertImageToBlob()
    }

    b64toBlob(b64, onsuccess, onerror) {
      var img = new Image();
      img.onerror = onerror;
      img.onload = function onload() {
          var canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(onsuccess);
      };
      img.src = b64;
    }

  async  convertImageToBlob(){
    var imgs = this.sigPad.getTrimmedCanvas().toDataURL('image/jpg')
    await  this.b64toBlob( imgs ,
        (blob) => {
              var url = window.URL.createObjectURL(blob);
              this.setState({ imgSignatureBLOB : url })
        }, (error) => {
            console.log("error = "+error)
        });
    }

    async  sendDataThree(){
      await  this.trim()
      await  this.uploadImage() 
    }

  async  uploadImage(){
      const teamID = await localStorage.getItem('teamproject_ID')
      const jwt = await getjwt()
        if(!jwt) {
            this.props.history.push('/login')
        }
      setTimeout(() => {
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
                      "SignatureName" : `${this.state.SignatureName}`,
                      "valueStar" : `${this.state.valueStar}`,
                      "messageRating" : `${this.state.messageRating}`,
                      "suggestion" : `${this.state.suggestion}`,
                      "imgSignatureBLOB" : `${this.state.imgSignatureBLOB}`,
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

      }, 500);
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

    render () {
      const { messageRating, imgSignatureBLOB} = this.state

      return(
        <div>

        <form>
          <MDBInput label={`${this.state.SignatureName}`} name="SignatureName" onChange={this.onChange}/>
        </form>
          <br />
          <div>
          {messageRating}
        </div>
        <div>
          <Rating maxRating={5} icon='star' size='massive' onRate={this.handleRate}/>
        </div>
        <form>
        <MDBInput label={`${this.state.suggestion}`} name="suggestion" onChange={this.onChange}/>
        </form>

        <form>
        <div className="container">
          <div className="sigContainer">
            <SignaturePad 
              canvasProps={{className: "sigPad"}}
              backgroundColor = '#ffffcc'
              ref={(ref) => { this.sigPad = ref }} 
            />
          </div>
        </div>
        <br />
          <div className="container-fluid">
            <Button variant="btn btn-block btn-warning" onClick={() => this.clear()} color="primary"> แก้ไขลายเซ็น </Button>{' '}
          </div>
        </form>
        <br />
          <div className="container-fluid">
            <Button variant="btn btn-block btn-success" onClick={() => this.sendDataThree()} color="primary"> ส่งชื่อ </Button>{' '}
            <br />
            {this.showMessageUpload()}
          </div>
        <br />
        <div className="container-fluid">
        { this.state.imgSignatureBLOB &&  ( <img  className="sigImage" alt="signature" src={imgSignatureBLOB} /> ) }
        </div>
        
      </div>
      )
    }
  }
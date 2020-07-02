import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { getjwt } from '../helpers/jwt'
import ImageUploader from "react-images-upload"
import { MDBInput } from "mdbreact"
import Loadable from 'react-loadable'

var IPModule = require('../helpers/Ip')
var RemoveLocal = require('../helpers/removeLocal')
export default class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
              pictures: [] ,
              img : [] ,
              locationToSetup : ' ',
              imgBLOB : null,
              message : null,
            };
        this.onDrop = this.onDrop.bind(this);
      }

  async componentDidMount(){
        const jwt = getjwt()
        if(!jwt) {
            this.props.history.push('/login')
        }
        const teamID = await localStorage.getItem('teamproject_ID')
        axios.get(`${IPModule.getIP()}:3000/api/v1/posts` , 
        { 
            headers : { 'x-access-token' : jwt  } 
        })
        .then( res => {
            if(res.data.rows[0].data[0].locationToSetup && res.data.rows[0].data[0].imgBLOB){
              this.setState({ 
                locationToSetup : res.data.rows[0].data[0].locationToSetup,
                imgBLOB : res.data.rows[0].data[0].imgBLOB
               })
            } else {
              this.setState({ locationToSetup : 'สถานที่ติดตั้ง',  imgBLOB : null })
            }
        }).catch( err => {
            RemoveLocal.removeDataLocalStorage()
            this.props.history.push('/login')
        })
        
    }


      onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
          pictures : pictureFiles,
          img : pictureDataURLs,
        });

      }

      showNameImageUpload(pictures){
        if(!pictures || pictures.length === 0){
          return (
          <div>
            <p>อัพโหลดรูปภาพ</p>
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              onChange={this.onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".jpeg", ".gif"]}
              label={"Upload image"}
              maxFileSize={15189789}
            />
          </div>
            )
        } else {
        return  pictures.map( image => {
            return (
                <p>{image.name}</p>
            )
          })
        }
      }

      showImageUpload(img){
        if(!img || img.length === 0){

        } else {
        return  img.map( pic => {
            return (
              <li style={{marginTop:'20px'}}>
                <img src={pic} style={{width: '100%'}}/>
              </li>
            )
          })
        }
      }

      onChange = e => {
        const { name, value } = e.target
        this.setState({
          [name]: value
        })
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

    async  sendImage(){
      await  this.b64toBlob(this.state.img,
          (blob) => {
                var url = window.URL.createObjectURL(blob);
                this.setState({ imgBLOB : url })
                this.sentImageToDatabase()
          }, (error) => {
              console.log("error = "+error)
          });

      }

  async sentImageToDatabase(){
      const teamID = await localStorage.getItem('teamproject_ID')
      const jwt = await getjwt()
        if(!jwt) {
            this.props.history.push('/login')
        }

        axios({
          method: 'post',
          url: `${IPModule.getIP()}:3000/api/v1/posts/`,
          headers : { 'x-access-token' : jwt  } ,
            data: {
              "project_pair_key" : `${teamID}`,
              "data" : {
                      "locationToSetup" : `${this.state.locationToSetup}`,
                      "imgBLOB" : `${this.state.imgBLOB}`
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

      showImageAfterUpload(){
        if(this.state.imgBLOB === null){
          return <p style={{color:'red'}} >ยังไม่ได้อัพโหลดรูป</p>
        } else {
          return (
            <div style={{marginTop:'20px'}}>
              <img alt="ds" src={this.state.imgBLOB} style={{width: '100%'}}/>
            </div>
          )
        }
      }

      editImage(){
      return  this.setState({
          pictures: [] ,
          img : [] ,
          imgBLOB : null
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
        const { pictures, img, imgBLOB } = this.state

        return (
          <div>
          
          <div>
          
          <form action="" method="post">
            <MDBInput label={`${this.state.locationToSetup}`} name="locationToSetup" onChange={this.onChange}/>
          </form>

      {/*  <ImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={this.onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".jpeg", ".gif"]}
        label={"Upload image"}
        maxFileSize={5242880}
        />
      */}
        
        <ul  className="list-inline">
          {this.showNameImageUpload(pictures)}
          {this.showImageUpload(img)}
        </ul>

        <div className="container-fluid">
        <Button variant="btn btn-block btn-success" onClick={ () => this.sendImage()}>ส่งรูปภาพ</Button>
          { this.state.imgBLOB != null &&  (<br />) }
          { this.state.imgBLOB != null && (
              <Button variant="btn btn-block btn-warning" onClick={ () => this.editImage()}>แก้ไขรูปภาพ</Button>
          ) }
          <br />
          { this.state.imgBLOB != null &&  (
            this.showMessageUpload()
          //  <p style={{ marginTop:'3px', color:'green'}}>{message}</p>
          ) }
          <br />
        { this.showImageAfterUpload(imgBLOB) }
        </div>
          
        </div>
        </div>
        )
      }
}

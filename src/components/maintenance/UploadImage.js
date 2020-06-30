import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import { getjwt } from '../helpers/jwt'
import ImageUploader from "react-images-upload"
import { MDBInput } from "mdbreact"
import Loadable from 'react-loadable'

export default class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
              pictures: [] ,
              img : [] ,
              locationToSetup : '',
              imgBLOB : null,
              message : null,
            };
        this.onDrop = this.onDrop.bind(this);
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
                  <li>
                    <p>{image.name}</p>
                  </li>
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

      sentImageToDatabase(){
        console.log(this.state.imgBLOB)
        this.showMessageUploadComplete()
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

      showMessageUploadComplete(){
        this.setState({
          message : 'อัพโหลดรูปภาพแล้ว'
        })
        if( this.state.message !== undefined ){
                setTimeout(() => {
                    this.setState({
                      message : null
                    }) 
                }, 3000);
        }   
    }

      render() {
        const { pictures, img, imgBLOB, message } = this.state

        return (
          <div>
          
          <div>
          
          <form action="" method="post">
            <MDBInput label="สถานที่ติดตั้ง" name="locationToSetup" onChange={this.onChange}/>
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
            <p style={{ color:'green', marginTop:'3px'}}>{message}</p>
          ) }
          <br />
        { this.showImageAfterUpload(imgBLOB) }
        </div>
          
        </div>
        </div>
        )
      }
}

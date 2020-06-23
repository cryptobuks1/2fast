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
              imgBLOB : ' '
            };
        this.onDrop = this.onDrop.bind(this);
      }

      onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
          pictures : pictureFiles,
          img : pictureDataURLs,
        });
        //console.log('pictureDataURLs = '+ pictureDataURLs)
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

      sendImage(){
        var base64Data = this.state.img
        this.b64toBlob(base64Data,
          function(blob) {
              var url = window.URL.createObjectURL(blob);
              console.log(url)
          }, function(error) {
              console.log("error = "+error)
          });


      }

      showImageAfterUpload(){
        if(this.state.imgBLOB === null){
            console.log("this.state.imgBLOB = "+this.state.imgBLOB)
        } else {
          return (
            <div style={{marginTop:'20px'}}>
              <img alt="ds" src={this.state.imgBLOB} style={{width: '100%'}}/>
            </div>
          )
        }
      }

      render() {
        const { pictures, img, imgBLOB } = this.state

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
        <Button variant="btn btn-block btn-success" onClick={ () => this.sendImage()}>ส่งข้อมูล</Button>{' '}
        <br />
        </div>
          { this.showImageAfterUpload(imgBLOB) }
        </div>
        </div>
        )
      }
}

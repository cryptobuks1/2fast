import React, { Component } from 'react'
import { MDBInput } from "mdbreact"
import Button from 'react-bootstrap/Button'
import { Rating } from 'semantic-ui-react'
import SignaturePad from 'react-signature-canvas'
import './styles.module.sig.css'

export default class MaintenanceThree extends Component {
    constructor(props){
        super(props)
        this.state={
            SignatureName: ' ',
            valueStar : ' ',
            messageRating : 'โปรดประเมินการติดตั้ง',
            suggestion : ' ',
            imgBLOB : null
        }
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
        imgBLOB: null
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
              this.setState({ imgBLOB : url })
        }, (error) => {
            console.log("error = "+error)
        });
    }

    async  sendDataThree(){
      await  this.trim()
        console.log('SignatureName = '+ this.state.SignatureName)
        console.log('valueStar = '+ this.state.valueStar)
        console.log('suggestion = '+  this.state.suggestion)
        this.uploadImage()
        
    }

    uploadImage(){
      setTimeout(() => {
        console.log('img blob = '+ this.state.imgBLOB)
      }, 500);
    }

    render () {
      const { messageRating, imgBLOB} = this.state

      return(
        <div>

        <form>
          <MDBInput label="ชื่อผู้ดูแลสถานที่ติดตั้ง" name="SignatureName" onChange={this.onChange}/>
        </form>
          <br />
          <div>
          {messageRating}
        </div>
        <div>
          <Rating maxRating={5} icon='star' size='massive' onRate={this.handleRate}/>
        </div>
        <form>
        <MDBInput label="ข้อเสนอแนะ" name="suggestion" onChange={this.onChange}/>
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
          </div>

        <br />
        <div className="container-fluid">
        { this.state.imgBLOB &&  ( <img  className="sigImage" alt="signature" src={imgBLOB} /> ) }
        </div>
        
      </div>
      )
    }
  }
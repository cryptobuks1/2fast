import React, { Component } from 'react'
import { MDBInput } from "mdbreact"
import { Button } from 'react-bootstrap'
import { Rating } from 'semantic-ui-react'
import SignaturePad from 'react-signature-canvas'

export default class MaintenanceThree extends Component {
    constructor(props){
        super(props)
        this.state={
            signature: null,
            SignatureName: '',
            valueStar : ' ',
            messageRating : 'โปรดประเมินการติดตั้ง',
            suggestion : ' '
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
        signature: null
      })
    }
    trim = () => {
      this.setState({signature: this.sigPad.getTrimmedCanvas()
        .toDataURL('image/jpg')})
    }

    async  sendDataThree(){
      await  this.trim()
        console.log('SignatureName = '+ this.state.SignatureName)
        console.log('valueStar = '+ this.state.valueStar)
        console.log('suggestion = '+  this.state.suggestion)
        console.log('signature = '+ this.state.signature)

    }
    render () {
      const { signature, messageRating} = this.state
      
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
          <div style={{ width:'100%' , maxWidth:'100%' }}>
            <SignaturePad 

              backgroundColor = '#ffffcc'
              ref={(ref) => { this.sigPad = ref }} 
            />
          </div>

          <div>
            <Button variant="btn btn-success" onClick={() => this.clear()} color="primary"> แก้ไขลายเซ็น </Button>{' '}
          </div>
        </form>

          <div className="container-fluid">
            <Button variant="btn btn-block btn-success" onClick={() => this.sendDataThree()} color="primary"> ส่งชื่อ </Button>{' '}
          </div>
        <br />

        {signature
          ? <img
            alt="signature"
            src={signature} />
          : null }

      </div>
      )
    }
  }
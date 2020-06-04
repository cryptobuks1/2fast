import React, { Component } from 'react'
import SignaturePad from 'react-signature-canvas'
import styles from './stylesmodule.css'
import { MDBInput } from "mdbreact"
import { Button } from 'react-bootstrap'
import { Rating } from 'semantic-ui-react'

export default class MaintenanceThree extends Component {
    constructor(props){
        super(props)
        this.state={
            trimmedDataURL: null,
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

    sendDataThree(){
        console.log('SignatureName = '+this.state.SignatureName)
        console.log('valueStar = '+ this.state.valueStar)
        console.log('suggestion = '+  this.state.suggestion)
    }
    render () {
      const { trimmedDataURL, SignatureName, messageRating} = this.state
      
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
          <div className="container-fluid">
            <Button variant="btn btn-block btn-success" onClick={() => this.sendDataThree()} color="primary"> ส่งชื่อ </Button>{' '}
          </div>
        <br />
        
      { /*  <div className={styles.sigContainer}>
          <SignaturePad 
          canvasProps={{className: styles.sigPad}}
            ref={(ref) => { this.sigPad = ref }} 
            styles={{height: '200px', color : '#EEEE'}}
            />
        </div>
        <div>
          
        </div>
      {trimmedDataURL ? <img src="sig" className={styles.sigImage} src={trimmedDataURL} /> : null}  */}
      </div>
      )
    }
  }
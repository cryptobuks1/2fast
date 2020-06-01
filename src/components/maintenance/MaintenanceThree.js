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
            messageRating : 'โปรดประเมินการติดตั้ง'
        }
    }

    sigPad = {}

    clear = () => {
      this.sigPad.clear()
    }

    trim = () => {
      this.setState({
          trimmedDataURL: this.sigPad.getTrimmedCanvas()
            .toDataURL('image/png')
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

  submit(e){
    alert(this.state.SignatureName ," ", this.state.valueStar)
  }
    render () {
      const { trimmedDataURL, SignatureName, messageRating} = this.state
      
      return(
        <div>
        <form onSubmit={ e => this.submit(e) }>
          <MDBInput label="ชื่อผู้ดูแลสถานที่ติดตั้ง" name="SignatureName" type="text" onChange={this.onChange}/>
          
          <div>
          {messageRating}
        </div>
        
        <div>
          <Rating maxRating={5} icon='star' size='massive' onRate={this.handleRate}/>
        </div>

            <Button variant="btn btn-block btn-success" type="submit" fullWidth color="primary"> ส่งชื่อ </Button>
            <br />
        </form>
        
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
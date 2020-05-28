import React, { Component } from 'react'
import SignaturePad from 'react-signature-canvas'
import styles from './stylesmodule.css'
import { MDBInput } from "mdbreact"
import { Button } from 'react-bootstrap';

export default class MaintenanceThree extends Component {
    constructor(props){
        super(props)
        this.state={
            trimmedDataURL: null,
            SignatureName: ''
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

  submit(e){
    console.log(this.state.SignatureName)
  }
    render () {
      const { trimmedDataURL, SignatureName} = this.state
      const widthLabel = {
        width:'280px',
        display:'block',
        marginLeft:'auto', 
        marginRight:'auto'
}
      return(
        <div>
        <form  onSubmit={ e => this.submit(e) }>
          <MDBInput label="ชื่อผู้ดูแลสถานที่ติดตั้ง" name="SignatureName" type="text" onChange={this.onChange}/>
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
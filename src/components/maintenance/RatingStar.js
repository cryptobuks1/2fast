import React, { Component } from 'react'
import { Rating } from 'semantic-ui-react'

export default class RatingStar extends Component {
  constructor(props){
    super(props)
    this.state = {
      valueStar : ' ',
      messageRating : 'โปรดประเมินการติดตั้ง'
    }
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

  next(){
      console.log('valueStar = ',this.state.valueStar)
      console.log('messageRating = ',this.state.messageRating)
  }
  
  render() {
    const {valueStar, messageRating} = this.state
    return (
      <div>
        <div>
          {messageRating}
        </div>
        
        <div>
          <Rating maxRating={5} icon='star' size='massive' onRate={this.handleRate}/>
        </div>
      </div>
    )
  }
}

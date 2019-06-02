import TextareaAutosize from 'react-autosize-textarea'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import MobileHeader from '../../components/MobileHeader'
import { postPlaceMessage } from '../../store/PlaceMessages/operations'
import {Redirect} from "react-router-dom";

class AddPlaceMessage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: '',
      isSubmitted: false
    }
  }

  handleChange = (event) => {
    this.setState({message: event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const placeId = +this.props.match.params.placeId
    const { message } = this.state
    if (message !== '') {
      postPlaceMessage(message, placeId, this).then(() => {
        this.setState({
          isSubmitted: true
        })
      })
    }
  }

  render () {
    const placeId = +this.props.match.params.placeId

    if (this.state.isSubmitted) {
      return <Redirect to={`/mobile/my-places/${placeId}`} />
    }

    return (
      <div className='parallax-container'>
        <MobileHeader
          backLink={`/mobile/my-places/${placeId}`}
          header={'Add new message'}
          bgImage={'https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2012/12/Envelopes.jpg'} />
        <div className="section">
          <form onSubmit={this.handleSubmit}>
            <div className="send-place-messages__container">
              <TextareaAutosize
                className="send-place-messages__text-area"
                value={this.state.message}
                onChange={this.handleChange}
                placeholder="Write a comment..."
                style={{resize: 'none'}}
              />
              <button className="send-place-messages__submit-btn">
                  Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(null, null)(AddPlaceMessage)

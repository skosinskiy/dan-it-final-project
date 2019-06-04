import TextareaAutosize from 'react-autosize-textarea'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import MobileHeader from '../../components/MobileHeader'
import { postPlaceMessage } from '../../store/places/operations'
import {Redirect} from 'react-router-dom'
import Preloader from '../../components/Preloader'

class AddPlaceMessage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: '',
      isSubmitted: false
    }
  }

  handleChange = (event) => {
    this.setState({
      message: event.target.value
    })
  }

  handleSubmit = (event, placeId) => {
    event.preventDefault()
    const { message } = this.state
    if (message !== '') {
      this.props.postPlaceMessage(message, placeId).then(() => {
        this.setState({
          isSubmitted: true
        })
      })
    }
  }

  render () {
    const placeId = this.props.currentPlace.id

    if (this.props.isLoading) {
      return <Preloader/>
    }

    if (this.state.isSubmitted) {
      return <Redirect to={`/mobile/home`} />
    }

    return (
      <div className='parallax-container'>
        <MobileHeader
          backLink={`/mobile/home`}
          header={'Add new message'}
          bgImage={'https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2012/12/Envelopes.jpg'} />
        <div className="section">
          <form onSubmit={event => this.handleSubmit(event, placeId)}>
            <div className="send-place-messages__container">
              <TextareaAutosize
                className="send-place-messages__text-area"
                value={this.state.message}
                onChange={this.handleChange}
                placeholder="Write a message..."
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
    currentPlace: state.users.currentUser.currentPlace,
    isLoading: state.places.isBusinessesEventsDataLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postPlaceMessage: (message, placeId) => dispatch(postPlaceMessage(message, placeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlaceMessage)

import React, { Component } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
import ChatHeader from '../../components/ChatHeader'
import './create-chat.scss'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import { createNewChat } from '../../store/chats/operations'
import Preloader from '../../components/Preloader'

const defaultChat = {
  name: 'Somechat',
  users: []
}

const customStyles = {
  menu: (provided) => ({
    ...provided,
    width: 'calc(100vw - 30px)'
  })
}

class CreateChatPage extends Component {
  state = {
    selectedOptions: [],
    title: ''
  }

  submitSelection = () => {
    const {selectedOptions, title} = this.state
    const {currentUser, createNewChat} = this.props
    defaultChat.name = title
    currentUser.friends.forEach(user => {
      selectedOptions.forEach(item => {
        if (item.value === user.id) {
          defaultChat.users.push(user)
        }
      })
    })
    defaultChat.users.push(currentUser)
    console.log(defaultChat)
    createNewChat(defaultChat)
  }

  handleChange = event => {
    this.setState({
      title: event.target.value
    })
  }

  render () {
    const { selectedOptions, title } = this.state
    const {currentUser, isCurrentUserLoading} = this.props

    if (isCurrentUserLoading) {
      return <Preloader/>
    }

    const data = currentUser.friends.map(user => {
      return {
        label: user.firstName,
        value: user.id
      }
    })

    return (
      <div className="create-chat">
        <ChatHeader title={'Current location'} />
        <input className="create-chat__title-input" onChange={this.handleChange} type="text" placeholder="Title" value={title}/>
        <Select
          className="multi-select"
          value={selectedOptions}
          onChange={value => this.setState({ selectedOptions: value })}
          closeMenuOnSelect={false}
          components={makeAnimated()}
          styles={customStyles}
          maxMenuHeight={300}
          isMulti
          autoFocus
          options={data}
        />
        <NavLink to={`/dialogs`}>
          <button
            className="create-chat__submit-button"
            type='button'
            onClick={() => this.submitSelection()}
          >
          Create!
          </button>
        </NavLink>
      </div>
    )
  }
}

CreateChatPage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  isCurrentUserLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    isCurrentUserLoading: state.users.isCurrentUserLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewChat: (chat) => dispatch(createNewChat(chat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChatPage)

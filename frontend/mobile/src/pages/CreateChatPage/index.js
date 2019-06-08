import React, { Component } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
import ChatHeader from '../../components/ChatHeader'
import './create-chat.scss'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { createNewChat } from '../../store/chats/operations'
import { getUsersByPlace } from '../../store/users/operations'
import Preloader from '../../components/Preloader'

const defaultChat = {
  name: 'Somechat',
  users: []
}

const customStyles = {
  menu: (provided) => ({
    ...provided,
    width: '100%',
    padding: 0
  })
}

class CreateChatPage extends Component {
  state = {
    selectedOptions: [],
    title: ''
  }

  componentDidMount () {
    const {getUsersByPlace, currentUser} = this.props
    const placeId = currentUser && currentUser.currentPlace && currentUser.currentPlace.id
    if (placeId) {
      getUsersByPlace(placeId)
    }
  }

  submitSelection = () => {
    const {selectedOptions, title} = this.state
    const {currentUser, createNewChat, usersListByPLace} = this.props
    defaultChat.name = title
    usersListByPLace.forEach(user => {
      selectedOptions.forEach(item => {
        if (item.value === user.id) {
          defaultChat.users.push(user)
        }
      })
    })
    console.log(defaultChat)
    if (defaultChat.users.length) {
      defaultChat.users.push(currentUser)
      createNewChat(defaultChat)
    }
  }

  handleChange = event => {
    this.setState({
      title: event.target.value
    })
  }

  render () {
    const { selectedOptions, title } = this.state
    const {usersListByPLace, usersListByPLaceIsLoading, currentUser, isCurrentUserLoading} = this.props

    if (usersListByPLaceIsLoading || isCurrentUserLoading) {
      return <Preloader/>
    }

    const users = usersListByPLace.map(user => {
      return {
        label: user.firstName,
        value: user.id
      }
    })

    const data = users.filter(user => {
      return user.value !== currentUser.id
    })

    return (
      <div className="create-chat">
        <ChatHeader title={'Create new chat'} />
        <div className={'create-chat__content'}>
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
          <div className="create-chat__submit-button">
            <NavLink
              to={`/mobile/messages`}
              className="button-link"
              onClick={() => this.submitSelection()}
            >
              Create
            </NavLink>
          </div>
        </div>

      </div>
    )
  }
}

CreateChatPage.propTypes = {
  usersListByPLace: PropTypes.array.isRequired,
  usersListByPLaceIsLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  console.log(state.users)
  return {
    usersListByPLace: state.users.usersListByPLace,
    usersListByPLaceIsLoading: state.users.usersListByPLaceIsLoading,
    currentUser: state.users.currentUser,
    isCurrentUserLoading: state.users.isCurrentUserLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createNewChat: (chat) => dispatch(createNewChat(chat)),
    getUsersByPlace: (placeId) => dispatch(getUsersByPlace(placeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChatPage)

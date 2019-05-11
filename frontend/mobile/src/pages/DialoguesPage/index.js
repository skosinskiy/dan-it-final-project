import React, {Component} from 'react'
import DialogueList from './DialogueList'
import BlueButton from '../../components/BlueButton'
import './dialogue-page.scss'
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import Preloader from '../../components/Preloader'
import {getAllChatsForCurrentUser} from '../../store/chats/operations'

class DialoguesPage extends Component {
  componentDidMount () {
    const {getAllChatsForCurrentUser} = this.props
    getAllChatsForCurrentUser()
  }

  render () {
    const {curentUserChats, isChatsLoaded} = this.props
    if (!isChatsLoaded) {
      return <Preloader/>
    }

    return (
      <div className='dialogue-page'>
        <div className='dialogue-page__header'>
          <div className='dialogue-page__title'>Messages</div>
          <a href=' ' className='dialogue-page__header-menu' > </a>
        </div>
        <DialogueList dialogues={curentUserChats} />
        <NavLink to={'create-chat'}><BlueButton /></NavLink>
      </div>
    )
  }
}

DialoguesPage.propTypes = {
  currentUser: PropTypes.object,
  isCurrentUserLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    isCurrentUserLoading: state.users.isCurrentUserLoading,
    curentUserChats: state.chats.curentUserChats,
    isChatsLoaded: state.chats.isChatsLoaded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllChatsForCurrentUser: (userId) => dispatch(getAllChatsForCurrentUser(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialoguesPage)

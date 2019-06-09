import React, { Component } from 'react'
import './contact-item.scss'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class ContactItem extends Component {
  render () {
    const {item, location, chat} = this.props
    return (
      <NavLink to={`/mobile/messages/${chat}`} className="chat-link">
        <li className='contact-list__item'>
          <div className='contact-list__img-container'>
            <div>{`${(item.firstName.charAt(0) + item.lastName.charAt(0)).toUpperCase()}`}</div>
          </div>
          <div className='contact-list__text-container'>
            <div className='contact-list__names'>
              <p>{item.firstName}</p>
              <p>{item.lastName}</p>
            </div>
            <div className='contact-list__location' >
              <p>{location}</p>
            </div>
          </div>
        </li>
      </NavLink>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.users.currentUser,
    isCurrentUserLoading: state.users.isCurrentUserLoading
  }
}

export default connect(mapStateToProps, null)(ContactItem)

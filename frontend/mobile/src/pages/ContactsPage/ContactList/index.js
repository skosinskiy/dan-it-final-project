import React, {Component} from 'react'
import ContactItem from './ContactItem'
import './contact-list.scss'

class ContactList extends Component {
  render () {
    const {location, currentUserChats, contacts} = this.props
    return (
      <ul className='contact-list'>
        {contacts.map(item => {
          const chatWithUser = currentUserChats.find(chat => {
            return chat.users.length === 2 && chat.users.find(user => user.id === item.id)
          })
          const chatId = chatWithUser ? chatWithUser.id : `new/${item.id}`
          return <ContactItem item={item} key={item.id} chat={chatId} location={location}/>
        })}
      </ul>
    )
  }
}

export default ContactList

import React, {Component} from 'react'
import ContactList from './ContactList'
import './contacts-page.scss'
import contactIcon1 from '../../img/ContactsPage/contact-icon1.jpg'

class ContactsPage extends Component {

  state = {
    contacts: [
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
    ]
  }

  render () {
    return (
      <div className='contactsPage parallax-container'>
        <div>
          <p>Contacts</p>
        </div>
        <ContactList contacts={this.state.contacts} />
      </div>
    )
  }
}

export default ContactsPage

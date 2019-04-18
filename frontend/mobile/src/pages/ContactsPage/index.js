import React, {Component } from 'react'
import ContactList from './ContactList'
import MobileHeader from '../../components/MobileHeader'
import contactIcon1 from '../../img/ContactsPage/contact-icon1.jpg'
import headerImage from '../../img/ContactsPage/contactsTemporaryHeaderBg.png'
import headerIcon from '../../img/ContactsPage/home-icon.png'
import './contacts-page.scss'

class ContactsPage extends Component {
  state = {
    contacts: [
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1},
      {name: 'Leto', surname: 'Atreides', location: 'Silver Breeze', image: contactIcon1}
    ]
  }

  render () {
    return (
      <div className='contactsPage parallax-container'>
        <MobileHeader bgImage={headerImage} header='Contacts' location='Pechersky Lypky' icon={headerIcon}/>
        <ContactList contacts={this.state.contacts} />
      </div>
    )
  }
}

export default ContactsPage

import React, {Component} from 'react'
import ContactItem from './ContactItem'

class ContactList extends Component {

  render () {
    return (
      <ul className='contact-list'>
        {this.props.contacts.map((item, index) => <ContactItem item={item} key={index} />)}
      </ul>
    )
  }
}

export default ContactList

import React, {Component} from 'react'
import ContactItem from './ContactItem'
import './contact-list.scss'

class ContactList extends Component {
  render () {
    const {location} = this.props
    return (
      <ul className='contact-list'>
        {this.props.contacts.map((item, index) => <ContactItem item={item} key={item.id} location={location}/>)}
      </ul>
    )
  }
}

export default ContactList

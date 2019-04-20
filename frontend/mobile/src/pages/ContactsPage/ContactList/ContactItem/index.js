import React, {Component} from 'react'
import './contact-item.scss'

class ContactItem extends Component {
  render () {
    const {item} = this.props
    return (
      <li className='contact-list__item'>
        <div className='contact-list__img-container'>
          <img src={item.image} alt=' ' />
        </div>
        <div className='contact-list__text-container'>
          <div className='contact-list__names'>
            <p>{item.name}</p>
            <p>{item.surname}</p>
          </div>
          <div className='contact-list__location' >
            <p>{item.location}</p>
          </div>
        </div>
      </li>
    )
  }
}

export default ContactItem

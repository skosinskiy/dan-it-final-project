import React, {Component} from 'react'
import './contact-item.scss'

class ContactItem extends Component {
  render () {
    const {item} = this.props
    return (
      <li className='contact-list__list-item'>
        <div className='list-item__img-container'>
          <img src={item.image} alt=' ' />
        </div>
        <div className='list-item__text-container'>
          <div className='text-container__names'>
            <p>{item.name}</p>
            <p>{item.surname}</p>
          </div>
          <div className='text-container__location' >
            <p>{item.location}</p>
          </div>
        </div>
      </li>
    )
  }
}

export default ContactItem

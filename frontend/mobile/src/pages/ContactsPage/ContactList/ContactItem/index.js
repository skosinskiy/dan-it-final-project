import React, {Component} from 'react'

class ContactItem extends Component {

  render () {
    const {item} = this.props
    return (
      <li>
        <img src={item.image} alt=' ' />
        <div>
          <p>{item.name}</p>
          <p>{item.surname}</p>
        </div>
      </li>
    )
  }
}

export default ContactItem

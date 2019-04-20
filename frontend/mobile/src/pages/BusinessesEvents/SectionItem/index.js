import React, {Component} from 'react'
import './section-item.scss'

class SectionItem extends Component {
  render () {
    const {item} = this.props
    return (
      <div className="section-item">
        <div className="section-item_img" style={{backgroundImage: `url(https://images.unsplash.com/photo-1519869325930-281384150729?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)`}}></div>
        <div className="section-item_text">
          <div className="section-item_title">{item.title}</div>
          <div className="section-item_address">{item.address}</div>
        </div>
      </div>
    )
  }
}

export default SectionItem
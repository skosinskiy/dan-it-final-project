import React, {Component} from 'react'
import './section-item.scss'

class SectionItem extends Component {
  render () {
    const {item} = this.props
    return (
      <div className="section-item">
        <div className="section-item_img" style={{backgroundImage: `url(${item.photo})`}}></div>
        <div className="section-item_text">
          <div className="section-item_title">{item.title}</div>
          <div className="section-item_address">{item.address}</div>
        </div>
      </div>
    )
  }
}

export default SectionItem
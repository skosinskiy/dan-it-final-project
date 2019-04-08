import React, {Component} from 'react'
import './business-item.scss'

class BusinessItem extends Component {
  render () {
    const background = `https://storage.googleapis.com/chydlx/codepen/blog-cards/image-2.jpg`
    return (
      <div className="business-item">
        <div className="photo" style={{backgroundImage: `url(${background})`}}></div>
        <div className="description">
          <h1>Learning to Code</h1>
          <h2>Opening a door to the future</h2>
          <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta
              praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
        </div>
      </div>
    )
  }
}

export default BusinessItem
import React, {Component} from 'react'
import './customScrollbar.scss'

class ScrollbarTest extends Component {
  render () {
    return (
      <div>
        <ul className='scrollbarTest'>
          {this.props.newsItems}
        </ul>
      </div>
    )
  }
}

export default ScrollbarTest

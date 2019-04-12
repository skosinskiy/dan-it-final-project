import React, {Component} from 'react'
import './parallaxHeader.scss'

class ParallaxHeader extends Component {
  render () {
    const style = {
      backgroundImage: `url("${this.props.bgImage}")`
    }
    return (
      <div className='section parallax-header' style={style} >content </div>
    )
  }
}

export default ParallaxHeader

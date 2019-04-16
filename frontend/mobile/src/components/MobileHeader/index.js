import React, {Component} from 'react'
import './parallaxContainer.scss'

class ParallaxHeader extends Component {
  render () {
    const style = {
      backgroundImage: `url("${this.props.bgImage}")`,
      backgroundRepeat: 'no-repeat'
    }
    return (
      <div className='parallax__layer parallax__layer--parallax-header' style={style} />
    )
  }
}

export default ParallaxHeader

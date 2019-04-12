import React, {Component} from 'react'
import './parallaxContainer.scss'
import parallaxHeaderImg1 from '../../img/header-bg1.png'

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

class ParallaxContainer extends Component {
  render () {
    return (
      <div className='parallax-container'>
        <div className='parallax__group'>
          <ParallaxHeader bgImage={parallaxHeaderImg1} />
          <div className='parallax__layer parallax__layer--static'>
            <p>static section</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ParallaxContainer

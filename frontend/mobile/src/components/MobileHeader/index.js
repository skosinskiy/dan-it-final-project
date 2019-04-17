import React, {Component} from 'react'
import './mobileHeader.scss'
import {ReactComponent as Camera} from '../../img/NewsPage/camera.svg'

class ParallaxHeader extends Component {
  render () {
    const style = {
      backgroundImage: `url("${this.props.bgImage}")`,
      backgroundRepeat: 'no-repeat'
    }
    return (
      <div className='parallax-section header' style={style} >
        <div className='header-container'>
          <Camera />
          <a href=' ' className='header-menu' > </a>
        </div>
        <div className='header-container__text-box'>
          <p className='header-container__text-box--link'>{this.props.text}</p>
        </div>
      </div>
    )
  }
}

export default ParallaxHeader

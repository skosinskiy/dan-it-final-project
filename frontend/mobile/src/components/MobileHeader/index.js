import React, {Component} from 'react'
import './mobileHeader.scss'
import {ReactComponent as Camera} from '../../img/NewsPage/camera.svg'

class ParallaxHeader extends Component {
  render () {
    const style = {
      backgroundImage: `url("${this.props.bgImage}")`,
      backgroundRepeat: 'no-repeat'
    }

    const iconStyle = {
      backgroundImage: `url("${this.props.icon}")`
    }
    return (
      <div className='parallax-section header' style={style} >
        <div className='header__outer-wrapper'>
          <div className='header__cam-container'>
            <Camera />
            <a href=' ' className='header__menu' > </a>
          </div>
          <div className='header__text-container' style={iconStyle}>
            <p className='header__title'>{this.props.header}</p>
            <p className='header__location'>{this.props.location}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ParallaxHeader

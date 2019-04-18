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
    const optionalComponent = this.props.extraComponent
    // const optionalIcon = this.props.extraIcon
    return (
      <div className='parallax-section header' style={style} >
        <div className='header-outer-container'>
          <div className='header-container'>
            <Camera />
            <a href=' ' className='header-menu' > </a>
          </div>
          <div className='header-container__text-box' style={iconStyle}>
            <p className='text-box__header'>{this.props.header}</p>
            <p className='text-box__location'>{this.props.location}</p>
          </div>
        </div>
        {optionalComponent}
      </div>
    )
  }
}

export default ParallaxHeader

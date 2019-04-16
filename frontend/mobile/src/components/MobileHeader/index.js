import React, {Component} from 'react'
import './parallaxContainer.scss'
import {ReactComponent as Camera} from '../../img/NewsPage/camera.svg'

class ParallaxHeader extends Component {
  render () {
    const style = {
      backgroundImage: `url("${this.props.bgImage}")`,
      backgroundRepeat: 'no-repeat'
    }
    return (
      <div className='parallax__layer parallax__layer--parallax-header' style={style} >
        <div className='parallax-header__items'>
          <Camera />
          <a href=' ' className='parallax-header__items__menu' > </a>
        </div>
        <div className='parallax-header__text'>
          <p className='parallax-header__text__link'>{this.props.text}</p>
        </div>
      </div>
    )
  }
}

export default ParallaxHeader

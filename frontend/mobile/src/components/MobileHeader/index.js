import React, { Component } from 'react'
import './mobileHeader.scss'
import ReactSwipe from 'react-swipe'

class ParallaxHeader extends Component {
  render () {
    const iconStyle = {
      backgroundImage: `url("${this.props.icon}")`
    }

    const images = this.props.photos ? this.props.photos.map(photo => {
      return <div key={photo.id}
        style={{
          backgroundImage: `url("${photo.imageUrl}")`,
          height: '230px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'}}
      />
    }) : <div
      style={{
        backgroundImage: `url("${this.props.bgImage}")`,
        height: '230px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}
    />

    return (
      <div className='parallax-section header' >
        <ReactSwipe
          style={{
            container: {
              height: '235px',
              width: '100%',
              position: 'relative',
              overflow: 'visible'
            },
            wrapper: {
              position: 'relative'
            },
            child: {
              float: 'left',
              width: '100%',
              position: 'relative'
            }
          }}
        >
          {images}
        </ReactSwipe>
        <div className='header__outer-wrapper'>
          <div className='header__cam-container'>
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

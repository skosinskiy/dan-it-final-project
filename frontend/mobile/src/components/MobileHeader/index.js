import React, { Component } from 'react'
import './mobileHeader.scss'
import ReactSwipe from 'react-swipe'
import {Redirect} from 'react-router-dom'

class ParallaxHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isReturnClicked: false
    }
  }

  redirectToPreviousPage = () => {
    this.setState({
      isReturnClicked: true
    })
  }

  render () {
    if (this.state.isReturnClicked) {
      return <Redirect to={this.props.backLink}/>
    }

    const iconStyle = {
      backgroundImage: `url("https://rion-up-project.s3.eu-central-1.amazonaws.com/${this.props.icon}")`,
      backgroundSize: 'cover'
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

    const backButton = this.props.backLink ? (
      <h2 onClick={this.redirectToPreviousPage} className='header__back-button'>&#8249;</h2>
    ) : null

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
          <div className='header__back-container'>
            {backButton}
          </div>
          <div
            className={'header__text-container'}
            style={iconStyle}>
            <p className='header__title'>{this.props.header}</p>
            <p className='header__location'>{this.props.location}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ParallaxHeader

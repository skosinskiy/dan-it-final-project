import React, {Component} from 'react'
import './parallaxContainer.scss'

function withHeader (WrappedComponent, headerImage) {
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

  return class extends Component {
    render () {
      return (
        <div className='parallax-container'>
          <div className='parallax-group'>
            <ParallaxHeader bgImage={headerImage} />
            <div className='parallax__layer parallax__layer--content'>
              <WrappedComponent />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default withHeader

import React, {Component} from 'react'
import './parallaxContainer.scss'

function withHeader (WrappedComponent, headerImage) {
  /* Parallax header HOC
  * arg1: any component that requires header
  * arg2: image to be used in header background
  * currently hardcoded for parallax container width of 375px
  *
  * example:
  * import Component from './components/Component'
  * import image from './images/some-image.jpg'
  * const Content1 = withHeader(Component, image)
  *
  * return(){
  *   render(
  *     <Content1 />
  * )}
  *
  * */
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

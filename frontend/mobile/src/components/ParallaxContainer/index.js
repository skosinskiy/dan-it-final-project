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

class ParallaxContainer extends Component {
  render () {
    const Content = this.props.content
    return (
      <div className='parallax-container'>
        <div className='parallax-group'>
          <ParallaxHeader bgImage={this.props.headerImage} />
          <div className='parallax__layer parallax__layer--content'>
            <Content />
          </div>
        </div>
      </div>
    )
  }
}

export default ParallaxContainer

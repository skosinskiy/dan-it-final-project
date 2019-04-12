import React, {Component} from 'react'
import ParallaxHeader from '../ParallaxHeader'
import './testComponent.scss'
import parallaxHeaderImg1 from '../../img/header-bg1.png'

class TestComponent extends Component {
  render () {
    return (
      <div className='wrapper'>
        <ParallaxHeader bgImage={parallaxHeaderImg1} />
        <section className='section static'>
          <h1>static section</h1>
        </section>
      </div>
    )
  }
}

export default TestComponent

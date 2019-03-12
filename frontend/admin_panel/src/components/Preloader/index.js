import React, {Component} from 'react'
import './preloader.scss'

export default class Preloader extends Component {
    state = {
      fullscreen: false
    }

    render () {
      const items = []
      const fullScreen = this.state.fullscreen ? ' full_screen_preloader' : ''
      for (let i = 0; i < 9; i++) {
        items.push(<div className={`item-${i + 1}`}><div></div></div>)
      }

      return (
        <div className={'preloader' + fullScreen}>
          {items}
        </div>
      )
    }
}
import React, {Component} from 'react'
import {Dots} from 'react-preloaders'
import BottomMenu from '../BottomMenu'

export default class Preloader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showMenu: !props.withoutMenu
    }
  }

  render () {
    return (
      <>
        <Dots/>
        {this.state.showMenu ? null : <BottomMenu/>}
      </>
    )
  }
}
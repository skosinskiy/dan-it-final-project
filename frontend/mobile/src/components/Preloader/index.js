import React, {Component} from 'react'
import {Dots} from 'react-preloaders'
import BottomMenu from '../BottomMenu'

export default class Preloader extends Component {
  render () {
    return (
      <>
        <Dots/>
        <BottomMenu/>
      </>
    )
  }
}
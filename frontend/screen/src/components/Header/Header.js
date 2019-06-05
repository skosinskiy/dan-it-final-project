import React, {Component} from 'react'
import CurTime from './CurTime/CurTime.js'
import MainLogo from './MainLogo/MainLogo'
import CurTrafficConditions from './CurTrafficConditions/CurTrafficConditions'
import CurWeather from './CurWeather/CurWeather'
import {default as Menu} from '../../components/Menu'
import './Header.scss'

export default class Header extends Component {
  render () {
    const {screenId} = this.props
    return (
      <div className='container'>
        <Menu screenId={screenId}/>
        <MainLogo screenId={screenId}/>
        <div className='right-side-info'>
          <CurTrafficConditions />
          <CurWeather />
          <CurTime />
        </div>
      </div>
    )
  }
}
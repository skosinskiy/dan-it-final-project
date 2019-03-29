import React, {Component} from 'react'
import {ReactComponent as WeatherCloud} from '../../../img/icons/cloud.svg'
import './CurWeather.scss'

export default class CurWeather extends Component {
  render () {
    return (
      <div className='current-weather'>
        <div className='current-weather__icon'>
          <WeatherCloud />
        </div>
        <div className='current-weather__info'>
          <div className='current-weather__info-item'>Cloudy</div>
          <div className='current-weather__info-item'>+7 C</div>
        </div>
      </div>
    )
  }
}
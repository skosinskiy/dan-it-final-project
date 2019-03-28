import React, {Component} from 'react'
import {ReactComponent as WeatherCloud} from '../../../img/icons/cloud.svg'
import './CurWeather.scss'

export default class CurWeather extends Component {
  render () {
    return (
      <div className='header-current-weather'>
        <div className='header-current-weather-icon'>
          <WeatherCloud />
        </div>
        <div className='header-current-weather-info'>
          <div className='header-weather-info-item'>Cloudy</div>
          <div className='header-weather-info-item'>+7 C</div>
        </div>
      </div>
    )
  }
}
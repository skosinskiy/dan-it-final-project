import React, {Component} from 'react'
import {ReactComponent as WeatherCloud} from '../../../img/icons/cloud.svg'
import './CurWeather.scss'
import axios from "axios";

export default class CurWeather extends Component {
  state = {
    temperature : null,
    summary: null,
    icon: null
  }

  componentDidMount() {
    this.onTemperatureSet()
  }

  onTemperatureSet() {
    const KEY = 'a703fcfbb171e3e5416b8eb644e88afb'
      axios({
          url: `https://api.darksky.net/forecast/${KEY}/${50.4547},${30.5238}?units=ca`, // add api key to the path
          json: true,
          method: 'GET',
          mode: 'cors'
        }
    ).then((res) =>{
    this.setState({
      temperature: Math.round(res.data.currently.temperature),
      summary: res.data.currently.summary,
      icon: res.data.currently.icon
    })
        console.log(res.data)
    })
  }

  render () {
    const curIcon = '../../../img/icons/weather/clear-day.png'
    console.log(curIcon)
    return (
      <div className='current-weather'>
        <div className='current-weather__icon' style={{ backgroundImage: `url(${curIcon}")`}}>
        </div>
        <div className='current-weather__info'>
          <div className='current-weather__info-item'>{this.state.summary}</div>
          <div className='current-weather__info-item'>{`${this.state.temperature} C`}</div>
        </div>
      </div>
    )
  }
}
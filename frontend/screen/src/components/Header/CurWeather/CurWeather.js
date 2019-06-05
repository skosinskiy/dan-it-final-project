import React, {Component} from 'react'
import './CurWeather.scss'

export default class CurWeather extends Component {
  state = {
    temperature: null,
    summary: null,
    icon: null
  }

  componentDidMount () {
    this.onTemperatureSet()
  }

  onTemperatureSet () {
    const KEY = 'c976e190e926b434152fe68625c996ee'

    fetch('https://api.openweathermap.org/data/2.5/weather?q=kiev&units=metric&appid=' + KEY)
      .then((resp) => { return resp.json() })
      .then((data) => {
        this.setState({
          temperature: Math.round(data.main.temp),
          summary: data.weather[0].main,
          icon: data.weather[0].icon
        })
      })
      .catch(() => {
        console.log('Something wrong')
      })
  }

  render () {
    return (
      <div className='current-weather'>
        <div className={`icon__${this.state.icon} current-weather__icon`} ></div>
        <div className='current-weather__info'>
          <div className='current-weather__info-item'>{this.state.summary}</div>
          <div className='current-weather__info-item'>{`${this.state.temperature}`}&deg;C</div>
        </div>
      </div>
    )
  }
}
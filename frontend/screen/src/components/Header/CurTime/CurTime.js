import React, {Component} from 'react'
import './CurTime.scss'

export default class CurTime extends Component {
    state = {
      currentTime: new Date()
    }

  timeOptions = {
    hour: '2-digit',
    minute: '2-digit'
  }
  dayOptions = {
    month: 'long',
    day: 'numeric'
  }

  componentDidMount () {
    setInterval(() => {
      this.setState({
        currentTime: new Date()
      })
    }, 1000)
  }

  render () {
    return (
      <div className='current-time'>
        <div className={'current-time-main'}>{this.state.currentTime.toLocaleTimeString('en-GB', this.timeOptions)}</div>
        <div className={'current-time-day'}>{this.state.currentTime.toLocaleDateString('en-US', this.dayOptions)}</div>
      </div>
    )
  }
}
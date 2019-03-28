import React, {Component} from 'react'
import {ReactComponent as TrafCar} from '../../../img/icons/car.svg'
import './CurTrafficConditions.scss'

export default class CurTrafficConditions extends Component {
  render () {
    return (
      <div className='header-traffic-condition'>
        <div className='header-traffic-condition-icon'>
          <TrafCar />
        </div>
        <div className='header-traffic-condition-info'>
          <div className='header-traffic-condition-info-item'>Traffic</div>
          <div className='header-traffic-condition-info-item green'>Low</div>
        </div>
      </div>
    )
  }
}
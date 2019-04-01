import React, {Component} from 'react'
import {ReactComponent as TrafCar} from '../../../img/icons/car.svg'
import './CurTrafficConditions.scss'

export default class CurTrafficConditions extends Component {
  render () {
    return (
      <div className='traffic-condition'>
        <div className='traffic-condition__icon'>
          <TrafCar />
        </div>
        <div className='traffic-condition__info'>
          <div className='traffic-condition__info-item'>Traffic</div>
          <div className='traffic-condition__info-item green'>Low</div>
        </div>
      </div>
    )
  }
}
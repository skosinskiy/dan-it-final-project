import React from 'react'
import { NavLink } from 'react-router-dom'
import {ReactComponent as Logo} from '../../../img/icons/MainLogo.svg'
import './MainLogo.scss'

class MainLogo extends React.Component {
  render () {
    const {screenId} = this.props
    return (
      <NavLink to={`/screen/${screenId}`}>
        <div className='main-logo'>
          <Logo />
        </div>
      </NavLink>
    )
  }
}

export default MainLogo
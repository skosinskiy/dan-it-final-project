import React from 'react'
import { NavLink } from 'react-router-dom'
import {ReactComponent as Logo} from '../../../img/icons/MainLogo.svg'
import './MainLogo.scss'

const MainLogo = () => {
  return (
    <NavLink to="/">
      <div className='main-logo'>
        <Logo />
      </div>
    </NavLink>
  )
}

export default MainLogo
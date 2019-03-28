import React from 'react'
import {ReactComponent as ServicesLogo} from '../../../img/icons/services.svg'
import {ReactComponent as FunLogo} from '../../../img/icons/fun.svg'
import {ReactComponent as FoodLogo} from '../../../img/icons/food.svg'
import {ReactComponent as ShopsLogo} from '../../../img/icons/shops.svg'
import {ReactComponent as MapLogo} from '../../../img/icons/map.svg'
import './index.scss'
import { NavLink } from 'react-router-dom'

const Menu = (props) => (
  <div className="menu" onClick={props.onClick}>
      <div className={'menu-hamburger'}>
          <div className={`menu-icon ${props.isOpen ? 'menu-icon-crossed' : ''}`}></div>
          <div className={`menu-icon ${props.isOpen ? 'menu-hidden' : 'menu-visible'}`}></div>
          <div className={`menu-icon ${props.isOpen ? 'menu-icon-crossed-reverse' : ''}`}></div>
      </div>
      <div className={props.isOpen ? 'menu-visible' : 'menu-hidden'}>
          <NavLink to="/Services"><div className={'menu-item'}><ServicesLogo />Services</div></NavLink>
          <NavLink to="/Fun"><div className={'menu-item'}><FunLogo />Fun</div></NavLink>
          <NavLink to="/Shops"><div className={'menu-item'}><ShopsLogo />Shops</div> </NavLink>
          <NavLink to="/Food"><div className={'menu-item'}><FoodLogo />Food</div></NavLink>
          <NavLink to="/Map"><div className={'menu-item'}><MapLogo />Map</div></NavLink>
    </div>
  </div>
)

export default Menu
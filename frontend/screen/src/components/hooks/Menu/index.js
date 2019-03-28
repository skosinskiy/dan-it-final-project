import React from 'react'
import {ReactComponent as ServicesLogo} from '../../../img/icons/services.svg'
import {ReactComponent as FunLogo} from '../../../img/icons/fun.svg'
import {ReactComponent as FoodLogo} from '../../../img/icons/food.svg'
import {ReactComponent as ShopsLogo} from '../../../img/icons/shops.svg'
import {ReactComponent as MapLogo} from '../../../img/icons/map.svg'
import './index.scss'
import { NavLink } from 'react-router-dom'

const Menu = (props) => (
  <div className="menu">
    <div onClick={props.onClick} className={'menu-hamburger'}>
      <div className={`menu-icon ${props.isOpen ? 'menu-icon-crossed' : ''}`}></div>
      <div className={`menu-icon ${props.isOpen ? 'menu-hidden' : 'menu-visible'}`}></div>
      <div className={`menu-icon ${props.isOpen ? 'menu-icon-crossed-reverse' : ''}`}></div>
    </div>
    <div className={props.isOpen ? 'menu-visible' : 'menu-hidden'}>
      <div className={'menu-item'}><NavLink to="/Services"><ServicesLogo /><div>Services</div></NavLink></div>
      <div className={'menu-item'}><NavLink to="/Fun"><FunLogo /><div>Fun</div></NavLink></div>
      <div className={'menu-item'}><NavLink to="/Shops"><ShopsLogo /><div>Shops</div></NavLink></div>
      <div className={'menu-item'}><NavLink to="/Food"><FoodLogo /><div>Food</div></NavLink></div>
      <div className={'menu-item'}><NavLink to="/Map"><MapLogo /><div>Map</div></NavLink></div>
    </div>
  </div>
)

export default Menu
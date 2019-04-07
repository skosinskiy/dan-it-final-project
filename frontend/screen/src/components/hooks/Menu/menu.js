import React from 'react'
import {ReactComponent as ServicesLogo} from '../../../img/icons/services.svg'
import {ReactComponent as FunLogo} from '../../../img/icons/fun.svg'
import {ReactComponent as FoodLogo} from '../../../img/icons/food.svg'
import {ReactComponent as ShopsLogo} from '../../../img/icons/shops.svg'
import {ReactComponent as MapLogo} from '../../../img/icons/map.svg'
import './menu.scss'
import { NavLink } from 'react-router-dom'

const Menu = (props) => (
  <div className="menu">
    <div onClick={props.onClick} className={'menu-hamburger'}>
      <div className={`menu__icon ${props.isOpen ? 'menu__icon-crossed' : ''}`}></div>
      <div className={`menu__icon ${props.isOpen ? 'menu-hidden' : 'menu-visible'}`}></div>
      <div className={`menu__icon ${props.isOpen ? 'menu__icon-crossed-reverse' : ''}`}></div>
    </div>
    <div className={props.isOpen ? 'menu-visible' : 'menu-hidden'}>
      <div className={'menu__item'}><NavLink to="/services"><ServicesLogo /><div>Services</div></NavLink></div>
      <div className={'menu__item'}><NavLink to="/fun"><FunLogo /><div>Fun</div></NavLink></div>
      <div className={'menu__item'}><NavLink to="/shops"><ShopsLogo /><div>Shops</div></NavLink></div>
      <div className={'menu__item'}><NavLink to="/food"><FoodLogo /><div>Food</div></NavLink></div>
      <div className={'menu__item'}><NavLink to="/map"><MapLogo /><div>Map</div></NavLink></div>
    </div>
  </div>
)

export default Menu
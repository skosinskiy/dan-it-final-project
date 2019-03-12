import React from 'react'
import './index.scss'
import { NavLink } from 'react-router-dom'

const Menu = (props) => (
  <div className="menu" onClick={props.onClick}>
    <div className={`menu-icon ${props.isOpen ? 'menu-icon-crossed' : ''}`}></div>
    <div className={`menu-icon ${props.isOpen ? 'menu-hidden' : 'menu-visible'}`}></div>
    <div className={`menu-icon ${props.isOpen ? 'menu-icon-crossed-reverse' : ''}`}></div>
    <ul className={props.isOpen ? 'menu-visible' : 'menu-hidden'}>
      <NavLink to="/Restaurants"><li>Restaurants</li></NavLink>
      <NavLink to="/Cinema"><li>Cinema</li></NavLink>
      <NavLink to="/Shops"><li>Shops</li></NavLink>
      <NavLink to="/Lorem"><li>Lorem</li></NavLink>
      <NavLink to="/Services"><li>Services</li></NavLink>
      <NavLink to="/FunnyCats"><li>Funny cats</li></NavLink>
      <NavLink to="/Extra"><li>Extra</li></NavLink>
    </ul>
  </div>
)

export default Menu
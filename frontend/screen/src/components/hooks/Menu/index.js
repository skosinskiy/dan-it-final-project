import React from 'react'
import './index.scss'

const Menu = (props) => (
  <div className="menu" onClick={props.onClick}>
    <div className={`menu-icon ${props.isOpen ? 'menu-icon-crossed' : ''}`}></div>
    <div className={`menu-icon ${props.isOpen ? 'menu-hidden' : 'menu-visible'}`}></div>
    <div className={`menu-icon ${props.isOpen ? 'menu-icon-crossed-reverse' : ''}`}></div>
    <ul className={props.isOpen ? 'menu-visible' : 'menu-hidden'}>
      <li>Restaurants</li>
      <li>Cinema</li>
      <li>Shops</li>
      <li>Lorem</li>
      <li>Services</li>
      <li>Funny cats</li>
      <li>Extra</li>
    </ul>
  </div>
)

export default Menu
import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'

export default class Login extends Component {
  render () {
    return (
      <div>
         LoginPage
        <NavLink to={'/forgot-password'}><button>Forgot Password</button></NavLink>
      </div>
    )
  }
}
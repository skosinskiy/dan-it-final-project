import React, {Component} from 'react'
// eslint-disable-next-line camelcase
import SignIn from '../components/SignIn'
import { NavLink } from 'react-router-dom'

export default class Login extends Component {
  render () {
    return (
      <div>
        <SignIn />
        <NavLink to={'/forgot-password'}><button>Forgot Password</button></NavLink>
      </div>
    )
  }
}
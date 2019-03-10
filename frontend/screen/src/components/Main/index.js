import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'

export default class Main extends Component {
  render () {
    return (
      <div>
         Main Page
        <NavLink to={'/login'}><button>Login</button></NavLink>
        <NavLink to={'/admin'}><button>Admin</button></NavLink>
      </div>
    )
  }
}
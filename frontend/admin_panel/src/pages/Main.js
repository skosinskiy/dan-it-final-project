import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'

export default class Main extends Component {
  render () {
    return (
      <div>
<<<<<<< HEAD:frontend/admin_panel/src/pages/Main.js
                Main Page
=======
        Main Page
>>>>>>> master:frontend/admin_panel/src/pages/Main.js
        <NavLink to={'/login'}><button>Login</button></NavLink>
        <NavLink to={'/admin'}><button>Admin</button></NavLink>
      </div>
    )
  }
}
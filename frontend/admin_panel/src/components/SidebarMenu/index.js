import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'
import LayersIcon from '@material-ui/icons/Layers'
import {hasGrant} from '../../utils/roles'
import {Grant} from '../../utils/permissions'
import {connect} from 'react-redux'
import './sidebar-menu.scss'

class SidebarMenu extends Component {
  render () {
    const {user} = this.props
    return (
      <div>
        {
          hasGrant(user, Grant.MANAGE_BUSINESS_CATEGORIES) &&
          <NavLink to={'/admin/business-categories'} className="sidebarItem">
            <ListItem button>
              <ListItemIcon>
                <DashboardIcon/>
              </ListItemIcon>
              <ListItemText primary={'Business Categories'}/>
            </ListItem>
          </NavLink>
        }
        {
          hasGrant(user, Grant.MANGAE_USER_ROLES) &&
          <NavLink to={'/admin/managing-roles'} className="sidebarItem">
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon/>
              </ListItemIcon>
              <ListItemText primary={'Managing Roles'}/>
            </ListItem>
          </NavLink>
        }
        {
          hasGrant(user, Grant.MANAGE_PLACES) &&
          <NavLink to={'/admin/places'} className="sidebarItem">
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon/>
              </ListItemIcon>
              <ListItemText primary="Places"/>
            </ListItem>
          </NavLink>
        }
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Link 4" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Link 5" />
        </ListItem>
      </div>
    )
  }
}

const mapStateToProps = ({users}) => {
  return {
    user: users.currentUser
  }
}

export default connect(mapStateToProps)(SidebarMenu)
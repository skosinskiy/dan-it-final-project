import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import StoreIcon from '@material-ui/icons/Store'
import BarChartIcon from '@material-ui/icons/BarChart'
import LayersIcon from '@material-ui/icons/Layers'
import './sidebar-menu.scss'

export default class SidebarMenu extends Component {
  render () {
    return (
      <div>
        <NavLink to={'/admin/business-categories'} className="sidebarItem">
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={'Business Categories'}/>
          </ListItem>
        </NavLink>
        <NavLink to={'/admin/managing-roles'} className="sidebarItem">
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary={'Managing Roles'}/>
          </ListItem>
        </NavLink>
        <NavLink to={'/admin/places'} className="sidebarItem">
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Places" />
          </ListItem>
        </NavLink>
        <NavLink to={'/admin/buildings'} className="sidebarItem">
          <ListItem button>
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary="Buildings" />
          </ListItem>
        </NavLink>
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
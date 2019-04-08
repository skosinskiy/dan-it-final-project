import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import EventIcon from '@material-ui/icons/Event'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import BusinessIcon from '@material-ui/icons/BusinessCenter'
import {hasGrant} from '../../utils/roles'
import {Grant} from '../../constants/permissions'
import {connect} from 'react-redux'
import LayersIcon from '@material-ui/icons/Layers'
import './sidebar-menu.scss'
import PropTypes from 'prop-types'

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
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={'Business Categories'} />
            </ListItem>
          </NavLink>
        }
        {
          hasGrant(user, Grant.MANAGE_USER_ROLES) &&
          <NavLink to={'/admin/managing-roles'} className="sidebarItem">
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary={'Managing User Roles'} />
            </ListItem>
          </NavLink>
        }

        {
          hasGrant(user, Grant.MANAGE_ROLES) &&
          <NavLink to={'/admin/roles'} className="sidebarItem">
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary={'Managing Roles'} />
            </ListItem>
          </NavLink>
        }

        {
          hasGrant(user, Grant.MANAGE_PLACES) &&
          <NavLink to={'/admin/places'} className="sidebarItem">
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Places" />
            </ListItem>
          </NavLink>
        }

        {
          hasGrant(user, Grant.MANAGE_BUSINESSES) &&
          <NavLink to={'/admin/businesses'} className="sidebarItem">
            <ListItem button>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary="Businesses" />
            </ListItem>
          </NavLink>
        }


        {
          hasGrant(user, Grant.MANAGE_BUSINESS_CATEGORIES) &&
          <NavLink to={'/admin/place-categories'} className="sidebarItem">
            <ListItem button>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="PlaceCategories" />
            </ListItem>
          </NavLink>
        }

        {
          hasGrant(user, Grant.MANAGE_EVENT_CATEGORIES) &&
          <NavLink to={'/admin/event-categories'} className="sidebarItem">
            <ListItem button>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary={'Event Categories'} />
            </ListItem>
          </NavLink>
        }
      </div>
    )
  }
}

SidebarMenu.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = ({users}) => {
  return {
    user: users.currentUser
  }
}

export default connect(mapStateToProps)(SidebarMenu)

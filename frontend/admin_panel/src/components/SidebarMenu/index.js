import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import EventIcon from '@material-ui/icons/EventAvailable'
import EventCategoryIcon from '@material-ui/icons/SpeakerNotes'
import SuperviserUserIcon from '@material-ui/icons/SupervisorAccount'
import PlaceIcon from '@material-ui/icons/Business'
import PlaceCategoryIcon from '@material-ui/icons/Place'
import BusinessIcon from '@material-ui/icons/Store'
import BusinessCategoryIcon from '@material-ui/icons/BusinessCenter'
import {hasGrant} from '../../utils/roles'
import {Grant} from '../../constants/permissions'
import {connect} from 'react-redux'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import './sidebar-menu.scss'
import PropTypes from 'prop-types'

class SidebarMenu extends Component {
  render () {
    const {user} = this.props
    return (
      <div>

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
          <NavLink to={'/admin/business-categories'} className="sidebarItem">
            <ListItem button>
              <ListItemIcon>
                <BusinessCategoryIcon />
              </ListItemIcon>
              <ListItemText primary={'Business Categories'} />
            </ListItem>
          </NavLink>
        }

        {
          hasGrant(user, Grant.MANAGE_EVENTS) &&
          <NavLink to={'/admin/events'} className="sidebarItem">
            <ListItem button>
              <ListItemIcon>
                <EventIcon />
              </ListItemIcon>
              <ListItemText primary={'Events'} />
            </ListItem>
          </NavLink>
        }

        {
          hasGrant(user, Grant.MANAGE_EVENT_CATEGORIES) &&
          <NavLink to={'/admin/event-categories'} className="sidebarItem">
            <ListItem button>
              <ListItemIcon>
                <EventCategoryIcon />
              </ListItemIcon>
              <ListItemText primary={'Event Categories'} />
            </ListItem>
          </NavLink>
        }

        {
          hasGrant(user, Grant.MANAGE_PLACES) &&
          <NavLink to={'/admin/places'} className="sidebarItem">
            <ListItem button>
              <ListItemIcon>
                <PlaceIcon />
              </ListItemIcon>
              <ListItemText primary="Places" />
            </ListItem>
          </NavLink>
        }

        {
          hasGrant(user, Grant.MANAGE_PLACE_CATEGORIES) &&
          <NavLink to={'/admin/place-categories'} className="sidebarItem">
            <ListItem button>
              <ListItemIcon>
                <PlaceCategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Place Categories" />
            </ListItem>
          </NavLink>
        }

        {
          hasGrant(user, Grant.MANAGE_ROLES) &&
          <NavLink to={'/admin/roles'} className="sidebarItem">
            <ListItem button>
              <ListItemIcon>
                <VerifiedUserIcon />
              </ListItemIcon>
              <ListItemText primary={'Roles'} />
            </ListItem>
          </NavLink>
        }

        {
          hasGrant(user, Grant.MANAGE_USERS) &&
          <NavLink to={'/admin/users'} className="sidebarItem">
            <ListItem button>
              <ListItemIcon>
                <SuperviserUserIcon />
              </ListItemIcon>
              <ListItemText primary={'User Roles'} />
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

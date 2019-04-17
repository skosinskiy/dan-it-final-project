import React, {Component} from 'react'
import SearchBar from '../Searchbar'
import EventsList from './EventsList'
import Button from '@material-ui/core/Button'
import {NavLink} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
//
// import './manageEvents.scss'

const styles = theme => ({
  buttons: {
    textDecoration: 'none',
    margin: '10px',
    'min-width': '227px',
    height: '100%'
  }
})

class ManagingBusinesses extends Component {
  render () {

    const {classes} = this.props

    return (
      <div>
        <div className='searchbar-flexbox'>
          <SearchBar searchtype='event_by_title' />
          <NavLink to={'/admin/events/add-new'} className={classes.buttonLink}>
            <Button size="large" variant="contained" color="primary" className={classes.button}>Add new business</Button>
          </NavLink>
        </div>

        <EventsList />
      </div>
    )
  }
}

export default withStyles(styles)(ManagingBusinesses)

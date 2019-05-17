import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'
import PlaceCategoryTable from './PlaceCategoryTable'

const styles = theme => ({
  newItemButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    textDecoration: 'none',
    marginBottom: theme.spacing.unit * 3,
  }
})

function PlaceCategories({classes}) {
  return (
    <div>
      <div style={{textAlign: 'right'}}>
        <NavLink className={classes.newItemButton} style={{display: 'inline-block'}} to={'/admin/place-categories/add-new'}>
          <Button variant="outlined" size="large" color="primary">
            Add New Place Category
          </Button>
        </NavLink>
      </div>
      <PlaceCategoryTable/>
    </div>
  )
}

PlaceCategories.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PlaceCategories)
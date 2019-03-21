import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import { getPlaces } from '../../../actions/places'
import PlaceItem from './PLaceItem'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
})

class Places extends Component {
  componentDidMount () {
    const {getAllPlaces} = this.props
    getAllPlaces()
  }

  render () {
    const { classes, places } = this.props
    const placeList = places.map((place) => {
      return <PlaceItem key={place.id} place={place}/>
    })
    return (
      <div className="placeList">
        <List className={classes.root}>
          {placeList}
        </List>
        <NavLink to={'/admin/places/add-new'}>
          <Button onClick={this.editPlace} variant="contained" color="primary" className={classes.button}>Add New PLace</Button>
        </NavLink>
      </div>
    )
  }
}

Places.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    places: state.places.places
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPlaces: () => dispatch(getPlaces())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Places))
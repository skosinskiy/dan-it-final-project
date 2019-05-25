import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import SearchBar from '../../../../components/Searchbar'
import PlaceTable from './PlaceTable'

import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {placesOperations} from '../../../../store/places'

const styles = theme => ({
  button: {
    textDecoration: 'none',
  },

  searchbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

class Places extends Component {

  render () {
    const {classes, getAllPlaces, size, searchParam} = this.props

    return (
      <div className="placeList">
        <div className={classes.searchbar}>
          <SearchBar
            searchFunc={getAllPlaces}
            size={size}
            value={searchParam}
            placeholder={'Search places'}
          />
          <NavLink to={'/admin/places/add-new'} className={classes.button}>
            <Button size="large" variant="outlined" color="primary">Add new place</Button>
          </NavLink>
        </div>
        <PlaceTable/>
      </div>
    )
  }
}

Places.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllPlaces: PropTypes.func.isRequired,
  searchParam: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  return {
    size: state.places.size,
    searchParam: state.places.searchParam
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPlaces: (param, page, size) => dispatch(placesOperations.getAllPlaces(param, page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Places))

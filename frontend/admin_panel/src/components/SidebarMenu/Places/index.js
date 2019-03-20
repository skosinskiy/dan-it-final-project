import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles/index'
import {getUserRoles} from '../../../actions/places'

class Places extends Component {
  componentDidMount () {
    this.props.getAllPlaces()
  }

  render () {
    const {places} = this.props.places
    console.log(places)
    return (
      <>
        </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    places: state.places
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllPlaces: () => dispatch(getUserRoles())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles()(Places))
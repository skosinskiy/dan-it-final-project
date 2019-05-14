import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Preloader from '../../../../components/Preloader';
import PlaceCategoryTable from './PlaceCategoryTable';
import {placesCategoriesOperations} from 'store/placeCategory'


const styles = theme => ({
  newItemButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    textDecoration: 'none',
    marginBottom: theme.spacing.unit * 3
  }
})

class PlaceCategories extends Component {
  componentDidMount () {
    this.props.reloadData()
  }

  render () {
    const {classes, isLoading} = this.props

    if (isLoading) {
      return <Preloader/>
    }

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
}

PlaceCategories.propTypes = {
  classes: PropTypes.object.isRequired,
  reloadData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

const mapStateToProps = ({placeCategories}) => {
  return {
    isLoading: placeCategories.isLoading
  }
}

const mapDispatchToProps = dispatch => ({
  reloadData: () => dispatch(placesCategoriesOperations.reloadData()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlaceCategories))
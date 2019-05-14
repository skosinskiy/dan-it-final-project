import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {businessCategoryOperations} from 'store/businessCategory'
import BusinessCategoryTable from './BusinessCategoryTable'

import {NavLink} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Preloader from '../../../../components/Preloader'

const styles = theme => ({
  newItemButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    textDecoration: 'none',
    marginBottom: theme.spacing.unit * 3
  }
})

class BusinessCategories extends Component {
  componentDidMount() {
    const {getAllBusinessCategories} = this.props
    getAllBusinessCategories()
  }

  render() {
    const {classes, isBusinessCategoriesLoading} = this.props

    if (isBusinessCategoriesLoading) {
      return <Preloader/>
    }

    return (
      <div>
        <div>
          <NavLink className={classes.newItemButton} to={'/admin/business-categories/add-new'}>
            <Button variant="outlined" size="large" color="primary">Add New Business Category</Button>
          </NavLink>
        </div>
        <BusinessCategoryTable/>
      </div>
    )
  }
}

BusinessCategories.propTypes = {
  classes: PropTypes.object.isRequired,
  getAllBusinessCategories: PropTypes.func.isRequired,
  isBusinessCategoriesLoading: PropTypes.bool.isRequired
}

const mapStateToProps = ({businessCategory}) => {
  return {
    isBusinessCategoriesLoading: businessCategory.isBusinessCategoryDataLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBusinessCategories: () => dispatch(businessCategoryOperations.getAllBusinessCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BusinessCategories))

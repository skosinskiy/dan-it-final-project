import React, {Component} from 'react'
import SearchBar from '../../../../components/Searchbar'
import BusinessTable from './BusinessTable'
import Button from '@material-ui/core/Button'
import {NavLink} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {businessOperations} from '../../../../store/businesses'

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

class ManagingBusinesses extends Component {

  render() {

    const {classes, getBusinessesByTitle, searchParam, size} = this.props

    return (
      <div>
        <div className={classes.searchbar}>
          <SearchBar
            searchFunc={getBusinessesByTitle}
            size={size}
            value={searchParam}
            placeholder={'Search by company name'}
          />
          <NavLink to={'/admin/businesses/add-new'} className={classes.button}>
            <Button size="large" variant="outlined" color="primary">Add new business</Button>
          </NavLink>
        </div>
        <BusinessTable/>
      </div>
    )
  }
}

ManagingBusinesses.propTypes = {
  classes: PropTypes.object.isRequired,
  getBusinessesByTitle: PropTypes.func.isRequired,
  searchParam: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  return {
    size: state.businesses.size,
    searchParam: state.businesses.searchParam
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessesByTitle: (title, page, size) => dispatch(businessOperations.getBusinessesByTitle(title, page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ManagingBusinesses))

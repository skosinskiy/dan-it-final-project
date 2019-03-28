import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import {getAllBusinessCategories} from '../../actions/businessCategories'
import BusinessCategoryItem from './BusinessCategoryItem'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },

  buttons: {
    textDecoration: 'none',
    marginRight: '10px'
  }
})

class BusinessCategories extends Component {
  componentDidMount () {
    const {getAllBusinessCategories} = this.props
    getAllBusinessCategories()
  }

  render () {
    const { classes, businessCategories } = this.props

    const businessCategoryItems = businessCategories.map((category) => {
      return <BusinessCategoryItem key={category.id} category={category}/>
    })
    return (
      <div>
        <List className={classes.root}>
          {businessCategoryItems}
        </List>

      </div>
    )
  }
}

BusinessCategories.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = ({businessCategory}) => {
  return {
    businessCategories: businessCategory.allBusinessCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBusinessCategories: () => dispatch(getAllBusinessCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BusinessCategories))
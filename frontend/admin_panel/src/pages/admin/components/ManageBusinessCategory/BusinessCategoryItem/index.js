import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles/index'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'

import {businessCategoryOperations} from 'store/businessCategory'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },

  buttons: {
    textDecoration: 'none',
    marginRight: '10px'
  }
})

class Places extends Component {
  render () {
    const {classes, category, deleteBusinessCategory} = this.props

    return (
      <ListItem>
        <Avatar>
          <ImageIcon/>
        </Avatar>
        <ListItemText primary={category.name} secondary={category.parentCategory && category.parentCategory.name}/>
        <NavLink to={`/admin/business-categories/${category.id}`} className={classes.buttons}>
          <Button variant="contained" color="primary" className={classes.button}>Edit</Button>
        </NavLink>
        <Button
          onClick={() => deleteBusinessCategory(category.id)}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Delete
        </Button>
      </ListItem>
    )
  }
}

const mapStateToProps = ({businessCategory}) => {
  return {
    businessCategories: businessCategory.allBusinessCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBusinessCategory: (categoryId) => dispatch(businessCategoryOperations.deleteBusinessCategory(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Places))

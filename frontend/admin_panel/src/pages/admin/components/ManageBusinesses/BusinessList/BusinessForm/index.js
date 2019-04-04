import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '20%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },

  buttonLink: {
    marginRight: '10px',
    textDecoration: 'none'
  },

  buttons: {
    margin: '8px'
  }

})

const emptyCategory = {
  /*name: '',
  parentCategory: {
    name: '',
    parentCategory: null
  }*/
}

class BusinessForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      editedCategory: props.category !== undefined ? props.category : emptyCategory
    }
  }
  render () {
    const {classes} = this.props
    const {editedCategory} = this.state
    return (
      <div className={classes.container}>
        <TextField
          label='Business name'
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedCategory.name}
          onChange={(e) => this.handleChange(e, 'name')}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {

  return {
    // categories: state.businessCategory.allBusinessCategories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // saveCategory: (category) => dispatch(businessCategoryOperations.saveCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BusinessForm))

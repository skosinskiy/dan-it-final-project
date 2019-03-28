import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import {getAllBusinessCategories} from '../../../actions/businessCategories'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
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
    textDecoration: 'none'
  }

})

const emptyCategory = {
  name: '',
  parentCategory: {
    name: '',
    parentCategory: null
  }
}

class PlaceForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      category: typeof props.category !== 'undefined' ? props.category : emptyCategory
    }
  }

  componentDidMount () {
    const {getAllBusinessCategories} = this.props
    getAllBusinessCategories()
  }

  // savePlace = (placeId, place) => {
  //   if (placeId) {
  //     this.props.updatePlace(placeId, place)
  //   } else {
  //     this.props.saveNewPlace(place)
  //   }
  // }

  handleChange = name => event => {
    let value
    if (name === 'parentCategory') {
      value = this.props.categories.find(category => category.id === event.target.value)
    } else {
      value = event.target.value
    }
    this.setState({
      category: {...this.state.category, [name]: value}
    })
  };

  render () {
    const { classes, categories } = this.props
    const { category } = this.state
    console.log(category.parentCategory.name)
    return (
      <div>
        <TextField
          label="Business Category Name"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true
          }}
          value={category.name}
          onChange={this.handleChange('name')}
        />

        <TextField
          select
          className={classes.textField}
          value={category.parentCategory.name}
          onChange={this.handleChange('parentCategory')}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Select parent category"
          margin="normal"
          variant="filled"
        >
          {categories.map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <div className="place-buttons">
          <NavLink to={'/admin/business-categories'} className={classes.buttonLink}>
            <Button onClick={() => this.savePlace(category)} variant="contained" color="primary" className={classes.button}>
                Save
            </Button>
          </NavLink>
          <NavLink to={'/admin/business-categories'} className={classes.buttonLink}>
            <Button variant="contained" color="secondary" className={classes.button}>
                Exit
            </Button>
          </NavLink>
        </div>
      </div>
    )
  }
}

PlaceForm.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state, props) => {
  return {
    categories: state.businessCategory.allBusinessCategories,
    category: state.businessCategory.allBusinessCategories.find(category => category.id === props.match.params.categoryId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBusinessCategories: () => dispatch(getAllBusinessCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlaceForm))

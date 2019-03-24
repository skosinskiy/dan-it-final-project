import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import {getAllBusinessCategories, handleSubmit} from '../../actions/businessCategories'
import {connect} from 'react-redux'
import Preloader from '../Preloader'
import FormControl from '@material-ui/core/es/FormControl/FormControl'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200
  },

  submit: {
    width: 'auto',
    margin: '8px'
  }
})

class ManageBusinessCategory extends React.Component {
  componentDidMount () {
    this.props.getAllBusinessCategories()
  }

  state = {
    category: ''
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  };

  render () {
    const { classes, allBusinessCategories } = this.props

    if (!allBusinessCategories) {
      return (
        <Preloader/>
      )
    }

    return (
      <form onSubmit={this.props.handleSubmit} className={classes.root}>
        <TextField
          id="outlined-simple-start-adornment"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Business Category Title"
        />
        <TextField
          select
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Select Parent Category"
          value={this.state.category}
          onChange={this.handleChange('category')}
        >
          {allBusinessCategories.map(category => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
                Save Category
        </Button>
      </form>
    )
  }
}

const mapStateToProps = ({businessCategory}) => {
  return {
    allBusinessCategories: businessCategory.allBusinessCategories
    // selectedCategory: businessCategory.selectedCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBusinessCategories: () => dispatch(getAllBusinessCategories()),
    // handleChange: () => dispatch(handleChange())
    handleSubmit: (event) => dispatch(handleSubmit(event))
  }
}

ManageBusinessCategory.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ManageBusinessCategory))
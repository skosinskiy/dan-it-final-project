import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

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

const ranges = [
  {
    value: 'None',
    label: ''
  },
  {
    value: 'Main Category 1',
    label: 'Main Category 1'
  },
  {
    value: 'Main Category 2',
    label: 'Main Category 2'
  },
  {
    value: 'Main Category 3',
    label: 'Main Category 3'
  }
]

class AddEventCategory extends React.Component {
  state = {
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
  }

  handleChange = prop => event => {
    this.setState({[prop]: event.target.value})
  }

  handleClickShowPassword = () => {
    this.setState(state => ({showPassword: !state.showPassword}))
  }

  render () {
    const {classes} = this.props

    return (
      <div className={classes.root}>
        <TextField
          id="outlined-simple-start-adornment"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Event Category Title"
        />

        <TextField
          select
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="Select Main Category"
          value={this.state.weightRange}
          onChange={this.handleChange('weightRange')}
        >
          {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
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
      </div>
    )
  }
}

AddEventCategory.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddEventCategory)

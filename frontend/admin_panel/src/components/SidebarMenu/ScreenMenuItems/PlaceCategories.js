import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200
  }
})

class PlaceCategories extends React.Component {
  state = {
    category: '',
    open: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  };

  handleClose = () => {
    this.setState({ open: false })
  };

  handleOpen = () => {
    this.setState({ open: true })
  };

  render () {
    const { classes } = this.props

    return (
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Place Category</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.category}
            onChange={this.handleChange}
            inputProps={{
              name: 'category',
              id: 'demo-controlled-open-select'
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'Category1'}>Category1</MenuItem>
            <MenuItem value={'Category2'}>Category2</MenuItem>
            <MenuItem value={'Category3'}>Category3</MenuItem>
          </Select>
        </FormControl>
      </form>
    )
  }
}

PlaceCategories.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PlaceCategories)
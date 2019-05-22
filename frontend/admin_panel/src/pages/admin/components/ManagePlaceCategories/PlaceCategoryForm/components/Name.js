import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {placesCategoriesOperations} from 'store/placeCategory'
import {connect} from 'react-redux'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class OutlinedTextFields extends Component {
  
  handleOnClick = (event) => {
    event.target.oldValue = event.target.value
    this.setState({isDisabled: false})
  }

  handleBlur = (event) => {
    if (event.target.oldValue !== event.target.value){
      this.props.updateName(event.target.value)
    }
  }

  state = {
    isDisabled: true
  };

  render() {
    const {classes, name} = this.props

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          disabled = {this.state.isDisabled}
          id="outlined-bare"
          className={classes.textField}
          defaultValue={name}
          margin="normal"
          variant="outlined"
          onClick={this.handleOnClick}
          onBlur={(event) => this.handleBlur(event)}
        />
      </form>
    )
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string,
  updateName:  PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  updateName: name => dispatch(placesCategoriesOperations.updateName(name)),
})

export default connect(null, mapDispatchToProps)(withStyles(styles)(OutlinedTextFields));
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Preloader from '../components/Preloader'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {submitForgotPasswordForm} from '../actions/forgotPassword'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  email: {
    display: 'block',
    fontSize: '12px'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  }
})

class ForgotPassword extends Component {
  render () {
    const {classes, isFormSubmitted, isLoading} = this.props

    const forgotPasswordForm = (
      <div className={classes.wrapper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Forgot Password
          <span className={classes.email}>enter your email and we send there your password</span>
        </Typography>
        <form
          className={classes.form}
          onSubmit={this.props.submitForgotPasswordForm}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Reset Password
          </Button>
        </form>
      </div>
    )

    const afterSubmitContent = (
      <div className={classes.wrapper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
              Password recovery
          <span className={classes.email}>Link to reset password was sent to your email</span>
        </Typography>
        <Button component={NavLink} to={'login'}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}>
          Back to Login
        </Button>
      </div>
    )

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          {isLoading && <Preloader/>}
          {!isLoading && !isFormSubmitted && forgotPasswordForm}
          {isFormSubmitted && afterSubmitContent}
        </Paper>
      </main>
    )
  }
}

const mapStateToProps = ({forgotPassword}) => {
  return {
    isFormSubmitted: forgotPassword.isFormSubmitted,
    isLoading: forgotPassword.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitForgotPasswordForm: (event) => dispatch(submitForgotPasswordForm(event))
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles))(ForgotPassword))
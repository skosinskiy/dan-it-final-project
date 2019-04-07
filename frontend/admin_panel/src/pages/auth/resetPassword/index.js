import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'

import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import Preloader from '../../../components/Preloader'
import {resetPasswordOperations} from 'store/resetPassword'


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
  hidden: {
    display: 'none'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  }
})

class ResetPassword extends Component {
  render () {
    const {classes, isLoading, isFormSubmitted, arePasswordsDifferent} = this.props
    const token = getToken()

    const resetPasswordForm = (
      <div className={classes.wrapper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset password
        </Typography>
        <form
          className={classes.form}
          onSubmit={this.props.submitResetPasswordForm}>
          {arePasswordsDifferent &&
          <Typography component="h2" color="error">
            Passwords do not match!
          </Typography>}
          <FormControl className={classes.hidden} required>
            <Input name="token" type="text" id="token" value={token}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password" error={arePasswordsDifferent}>Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password"/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password" error={arePasswordsDifferent}>Password Confirmation</InputLabel>
            <Input name="passwordConfirmation" type="password" id="passwordConfirmation"/>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Confirm password
          </Button>
        </form>
      </div>
    )

    const afterSubmitContent = (
      <div className={classes.wrapper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Password was changed
        </Typography>
        <Button component={NavLink} to={'/login'}
                type="submit"
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
          {!isLoading && !isFormSubmitted && resetPasswordForm}
          {isFormSubmitted && afterSubmitContent}
        </Paper>
      </main>
    )
  }
}

const getToken = () => {
  const tokenArray = window.location.href.split('/')
  return tokenArray[tokenArray.length - 1]
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isFormSubmitted: PropTypes.bool.isRequired,
  arePasswordsDifferent: PropTypes.bool.isRequired,
  submitResetPasswordForm: PropTypes.func.isRequired,
}

const mapStateToProps = ({resetPassword}) => ({
  isFormSubmitted: resetPassword.isFormSubmitted,
  isLoading: resetPassword.isLoading,
  arePasswordsDifferent: resetPassword.arePasswordsDifferent
})

const mapDispatchToProps = (dispatch) => ({
  submitResetPasswordForm: (event) => dispatch(resetPasswordOperations.submitResetPasswordForm(event))
})

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles))(ResetPassword))

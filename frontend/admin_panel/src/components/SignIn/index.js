import React, { Component } from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import {submitLoginForm} from '../../actions/users'
import {connect} from 'react-redux'
import Preloader from '../Preloader'

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
  wrapper: {
    height: '100vh',
    width: '100vw'
  }
})

class SignIn extends Component {
  render () {
    const { classes, isAuthenticated, isCurrentUserLoading } = this.props
    
    if (isCurrentUserLoading) {
      return (
        <div className={classes.wrapper}>
          <Preloader/>
        </div>
      )
    }

    if (isAuthenticated) {
      return <Redirect to={'/'}/>
    }

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Sign in
          </Typography>
          <form
            className={classes.form}
            onSubmit={this.props.submitLoginForm}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="username" autoComplete="email" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
                Sign in
            </Button>
            <Button component={NavLink} to={'/forgot-password'}
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
                Forgot Password
            </Button>
          </form>
        </Paper>
      </main>
    )
  }
}

const mapStateToProps = ({users}) => {
  return {
    isAuthenticated: users.isAuthenticated,
    isCurrentUserLoading: users.isCurrentUserLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitLoginForm: (event) => dispatch(submitLoginForm(event))
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles))(SignIn))
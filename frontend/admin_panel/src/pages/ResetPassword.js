import React, {Component} from 'react'
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
import axios from 'axios'
import Preloader from '../components/Preloader'
import {NavLink} from 'react-router-dom'

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
    alignItems: 'center'
  }
})

class ResetPassword extends Component {
  state = {
    isFormSubmitted: false,
    isLoading: false,
    arePasswordsDifferent: false
  }

  handleSubmit = event => {
    event.preventDefault()
    const formData = new FormData(event.target)
    let data = {}
    formData.forEach((value, key) => {
      data[key] = value
    })
    if (data.password === data.passwordConfirmation) {
      this.setState({
        isLoading: true
      })
      const jsonData = JSON.stringify(data)
      axios.put('/api/users/forgot-password/update', jsonData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              isFormSubmitted: true,
              isLoading: false
            })
          }
        })
    } else {
      this.setState({
        arePasswordsDifferent: true
      })
    }
  }

  render () {
    const { classes } = this.props
    const { isLoading } = this.state
    const { isFormSubmitted } = this.state
    const { arePasswordsDifferent } = this.state

    let tokenArray = window.location.href.split('/')
    let token = tokenArray[tokenArray.length - 1]

    const resetPasswordForm = (
      <div className={classes.wrapper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Reset password
        </Typography>
        <form
          className={classes.form}
          onSubmit={this.handleSubmit}>
          {arePasswordsDifferent &&
          <Typography component="h2" color="error">
            Passwords do not match!
          </Typography>}
          <FormControl className={classes.hidden} required>
            <Input name="token" type="text" id="token" value={token}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password" error={arePasswordsDifferent}>Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password" error={arePasswordsDifferent}>Password Confirmation</InputLabel>
            <Input name="passwordConfirmation" type="password" id="passwordConfirmation" />
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
              Password was set
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

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ResetPassword)
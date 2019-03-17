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
import CircularIndeterminate from '../components/CircularIndeterminateLoader'
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
  }
})

class ResetPassword extends Component {
  state = {
    formSubmitted: false,
    isLoading: false
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      isLoading: true
    })
    const formData = new FormData(event.target)
    let data = {}
    formData.forEach((value, key) => {
      data[key] = value
    })
    let jsonData = JSON.stringify(data)
    axios.put('/api/users/forgot-password/update', jsonData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({
            formSubmitted: true,
            isLoading: false
          })
        }
      })
  }

  render () {
    const { classes } = this.props

    let tokenArray = window.location.href.split('/')
    let token = tokenArray[tokenArray.length - 1]

    let form =
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
        Reset password
          </Typography>
          <form
            className={classes.form}
            onSubmit={this.handleSubmit}>
            <FormControl className={classes.hidden} required>
              <Input name="token" type="text" id="token" value={token}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password Confirmation</InputLabel>
              <Input name="passwordConfirmation" type="password" id="passwordConfirmation" />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
          Confirm password
            </Button>
          </form>
        </Paper>

    if (this.state.isLoading) {
      form =
          <Paper className={classes.paper}>
            <CircularIndeterminate/>
          </Paper>
    }

    if (this.state.formSubmitted) {
      form =
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Password was set
            </Typography>
            <NavLink to={'/login'}><Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Back to Login
            </Button></NavLink>
          </Paper>
    }

    return (
      <main className={classes.main}>
        {form}
      </main>
    )
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ResetPassword)
import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {ReactComponent as HeaderLogo} from '../../img/LoginPage/header-logo.svg'
import {ReactComponent as PeopleIcon} from '../../img/LoginPage/form-icon.svg'
import {ReactComponent as PhoneIcon} from '../../img/LoginPage/form-icon2.svg'
import {ReactComponent as FacebookIcon} from '../../img/LoginPage/facebook-icon.svg'
import {ReactComponent as GoogleIcon} from '../../img/LoginPage/google-icon.svg'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {usersOperations} from '../../store/users'
import './index.scss'

class Login extends Component {
  render () {
    const {currentUser} = this.props
  
    if (currentUser) {
      return <Redirect to={'/'}/>
    }

    return (
      <div className="login-page">
        <div className="login-page__header container">
          <div className="header__logo"><HeaderLogo /></div>
          <p className="header__title">RionUp</p>
          <p className="header__text">A window to your life</p>
        </div>
        <div className="login-page__body container">
          <form className="search-form body__form" onSubmit={this.props.submitLoginForm}>
            <div className="email__field">
              <div><PeopleIcon /></div>
              <input className="email__field-text" type="text" placeholder="Email" />
            </div>
            <div className="password__field bottom-line">
              <div><PhoneIcon /></div>
              <input className="password__field-text" type="password" placeholder="Password"/>
            </div>
          </form>
        </div>
        <div className="login-page__bottom container">
          <div className="bottom__social-media">
            <div className="facebook-link"><a href=' ' onClick={() => this.props.loginWithOAuth('facebook')}><FacebookIcon /></a></div>
            <div className="google-link"><a href=' ' onClick={() => this.props.loginWithOAuth('google')}><GoogleIcon /></a></div>
          </div>
          <div className="bottom__button"><a href=' 'className="bottom__button-link">Sign up</a></div>
          <p className="bottom__text">Already signed up?</p>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  currentUser: PropTypes.object.isRequired,
  submitLoginForm: PropTypes.func.isRequired,
  loginWithOAuth: PropTypes.func.isRequired
}

const mapStateToProps = ({users}) => ({
  currentUser: users.currentUser,
  isCurrentUserLoading: users.isCurrentUserLoading
})

const mapDispatchToProps = dispatch => ({
  submitLoginForm: event => dispatch(usersOperations.submitLoginForm(event)),
  loginWithOAuth: event => dispatch(usersOperations.loginWithOAuth(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
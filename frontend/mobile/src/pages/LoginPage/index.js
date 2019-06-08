import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {ReactComponent as HeaderLogo} from '../../img/LoginPage/header-logo.svg'
import {ReactComponent as PeopleIcon} from '../../img/LoginPage/form-icon.svg'
import {ReactComponent as LockIcon} from '../../img/LoginPage/form-icon1.svg'
import {ReactComponent as FacebookIcon} from '../../img/LoginPage/facebook-icon.svg'
import {ReactComponent as GoogleIcon} from '../../img/LoginPage/google-icon.svg'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {usersOperations} from '../../store/users'
import './index.scss'
import Preloader from '../../components/Preloader'
class Login extends Component {
  componentDidMount () {
    const {currentUser, match, pairPlaceWithUser} = this.props
    const placeId = match.params.placeId
    const isPaired = placeId ? currentUser && currentUser.currentPlace && currentUser.currentPlace.id.toString() === placeId : true
    if (currentUser && !isPaired) {
      pairPlaceWithUser(placeId)
    }
  }

  render () {
    const {currentUser, match, isCurrentUserLoading} = this.props

    const placeId = match.params.placeId

    if (isCurrentUserLoading) {
      return <Preloader withoutMenu={true}/>
    }

    const isPaired = placeId ? currentUser && currentUser.currentPlace && currentUser.currentPlace.id.toString() === placeId : true

    if (currentUser && isPaired) {
      return <Redirect to={'/mobile/home'}/>
    }

    return (
      <form className="login-page" onSubmit={(event) => this.props.submitLoginForm(event, placeId)}>
        <div className="login-page__header container">
          <div className="header-logo"><HeaderLogo /></div>
          <p className="header-title">RionUp</p>
          <p className="header-text">A window to your life</p>
        </div>
        <div className="login-page__body container">
          <div className="search-form body__form">
            <div className="email__field">
              <div className="email__field-icon"><PeopleIcon /></div>
              <input className="email__field-text" name="username" type="text" placeholder="Email" />
            </div>
            <div className="password__field bottom-line">
              <div className="password__field-icon"><LockIcon /></div>
              <input className="password__field-text" name="password" type="password" placeholder="Password"/>
            </div>
          </div>
        </div>
        <div className="login-page__bottom container">
          <div className="bottom__social-media">
            <div className="facebook-link"><div onClick={() => this.props.loginWithOAuth('facebook')}><FacebookIcon /></div></div>
            <div className="google-link"><div onClick={() => this.props.loginWithOAuth('google')}><GoogleIcon /></div></div>
          </div>
          <div className="bottom__button"><input type="submit" className="bottom__button-link" value="Log in" /></div>
        </div>
      </form>
    )
  }
}

Login.propTypes = {
  currentUser: PropTypes.object,
  submitLoginForm: PropTypes.func.isRequired,
  loginWithOAuth: PropTypes.func.isRequired
}

const mapStateToProps = ({users}) => ({
  currentUser: users.currentUser,
  isCurrentUserLoading: users.isCurrentUserLoading
})

const mapDispatchToProps = dispatch => ({
  submitLoginForm: (event, placeId) => dispatch(usersOperations.submitLoginForm(event, placeId)),
  loginWithOAuth: event => dispatch(usersOperations.loginWithOAuth(event)),
  pairPlaceWithUser: placeId => dispatch(usersOperations.pairPlaceWithUser(placeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
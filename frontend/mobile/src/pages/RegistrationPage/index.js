import React, {Component} from 'react'
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
        return (
            <form className="registration-page" onSubmit={this.props.submitRegistrationForm}>
                <div className="registration-page__header container">
                    <div className="header__logo"><HeaderLogo /></div>
                    <p className="header__title">RionUp</p>
                    <p className="header__text">A window to your life</p>
                </div>
                <div className="registration-page__body container">
                    <div className="registration-form">
                        <div className="registration-form__field">
                            <div className="field__wrapper">
                                <div className="field__icon"><PeopleIcon /></div>
                                <input className="field__input" name="email" type="text" placeholder="Email" />
                            </div>
                            <div className="field__line"/>
                        </div>
                        <div className="registration-form__field">
                            <div className="field__wrapper">
                                <div className="field__icon"><PhoneIcon /></div>
                                <input className="field__input" name="password" type="password" placeholder="Password"/>
                            </div>
                            <div className="field__line"/>
                        </div>
                        <div className="registration-form__field">
                            <div className="field__wrapper">
                                <div className="field__icon"><PhoneIcon /></div>
                                <input className="field__input" name="passwordConfirmation" type="password" placeholder="Password confirmation"/>
                            </div>
                            <div className="field__line"/>
                        </div>
                    </div>
                </div>
                <div className="registration-page__bottom container">
                    <div className="bottom__social-media">
                        <div className="facebook-link"><a href=' ' onClick={() => this.props.loginWithOAuth('facebook')}><FacebookIcon /></a></div>
                        <div className="google-link"><a href=' ' onClick={() => this.props.loginWithOAuth('google')}><GoogleIcon /></a></div>
                    </div>
                    <div className="bottom__button"><input type="submit" className="bottom__button-link" value="Sign up" /></div>
                    <p className="bottom__text">Already signed up?</p>
                </div>
            </form>
        )
    }
}

Login.propTypes = {
    currentUser: PropTypes.object.isRequired,
    submitLoginForm: PropTypes.func.isRequired,
    loginWithOAuth: PropTypes.func.isRequired
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = dispatch => ({
    submitRegistrationForm: event => dispatch(usersOperations.submitRegistrationForm(event)),
    loginWithOAuth: event => dispatch(usersOperations.loginWithOAuth(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
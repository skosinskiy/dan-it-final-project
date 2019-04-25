import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import './styles/App.scss'
import AppRoutes from './components/AppRoutes'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScreenEventList from './components/ScreenEventList/ScreenEventList'
import ScreenNewsList from './components/ScreenNewsList'
import {getCurrentPlace} from './actions/currentPlace'
import {hasLayuot} from './utils/hasLayout'
import LayoutItems from './constants/layoutItems'
import Preloader from './components/Preloader'
import QRCode from './components/QRCode/QRCode'
import MainPage from './pages/MainPage/MainPage'

class App extends Component {
  componentDidMount () {
    const {getCurrentPlace} = this.props
    getCurrentPlace(1)
  }
  render () {
    const {currentPlace, isLoaded} = this.props
    if (!isLoaded) {
      return <Preloader/>
    }
    return (
      <div className='App'>
        <Header />
        <AppRoutes/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPlace: state.currentPlace.currentPlace,
    isLoaded: state.currentPlace.isLoaded
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentPlace: (id) => dispatch(getCurrentPlace(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
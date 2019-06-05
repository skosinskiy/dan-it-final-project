import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './homePage.scss'
import AppRoutes from '../../components/AppRoutes'
import Header from '../../components/Header/Header'
import { getCurrentPlace } from '../../actions/currentPlace'
import Preloader from '../../components/Preloader'

class HomePage extends Component {
  componentDidMount () {
    const {getCurrentPlace} = this.props
    getCurrentPlace(+this.props.match.params.screenId)
  }
  render () {
    const {isLoaded} = this.props
    if (!isLoaded) {
      return <Preloader/>
    }

    return (
      <div className='home-page'>
        <Header screenId={+this.props.match.params.screenId}/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage))
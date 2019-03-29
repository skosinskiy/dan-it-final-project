import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import CssBaseline from '@material-ui/core/es/CssBaseline/CssBaseline'

import Preloader from './components/Preloader'
import {usersOperations} from 'store/users'
import {default as IndexPage} from './pages/index'
import ToastrMessage from './components/ToastrMessage'

class App extends Component {
  componentDidMount () {
    this.props.getCurrentUser()
  }

  render () {
    const {isCurrentUserLoading} = this.props

    if (isCurrentUserLoading) {
      return <div className="wrapper"><Preloader/></div>
    }

    return (
      <>
        <CssBaseline/>
        <IndexPage/>
        <ToastrMessage/>
      </>
    )
  }
}

const mapStateToProps = ({users}) => {
  return {
    currentUser: users.currentUser,
    isCurrentUserLoading: users.isCurrentUserLoading
  }
}

const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(usersOperations.getCurrentUser())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Table from './components/Table'
import './index.scss'

class ScreenMenuItems extends Component {

  render () {
    return (
      <div className='ScreenMenuWrapper'>
        <Table/>
      </div>
    )
  }
}

const mapStateToProps = ({menuItems}) => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenMenuItems))

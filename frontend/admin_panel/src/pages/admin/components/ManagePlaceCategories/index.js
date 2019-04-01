import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {menuItemsOperations} from 'store/menuItems'
import Table from './components/Table'
import './index.scss'

class ScreenMenuItems extends Component {
  componentDidMount () {
  }

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
    availableMenuItemNames: menuItems.availableMenuItemNames,
    isMenuItemNamesLoading: menuItems.isMenuItemNamesLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAvailableMenuItemNames: () => dispatch(menuItemsOperations.fetchAvailableMenuItemNames())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenMenuItems))

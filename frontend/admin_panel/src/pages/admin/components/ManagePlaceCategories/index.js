import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {menuItemsOperations} from 'store/menuItems'
import Table from './components/Table'
import SubmitButton from './components/Buttons/Submit'
import ResetButton from './components/Buttons/Reset'
import Preloader from '../../../../components/Preloader'
import './index.scss'

class ScreenMenuItems extends Component {
  componentDidMount () {
  }

  render () {
    // const {availableMenuItemNames, isMenuItemNamesLoading} = this.props
    // if (this.props.isMenuItemNamesLoading) {
    //   return (
    //     <div className='wrapper'>
    //       <Preloader />
    //     </div>
    //   )
    // }
    return (
      <div className='ScreenMenuWrapper'>
        <Table/>
        <SubmitButton />
        <ResetButton />
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

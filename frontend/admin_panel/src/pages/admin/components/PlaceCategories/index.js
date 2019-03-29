import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {menuItemsOperations} from 'store/menuItems'
import MultipleSelect from './MenuItemMultipleSelect'
import PlaceCategories from './PlaceCategories'
import './index.scss'
import SubmitButton from './SubmitButton'
import Preloader from '../../../../components/Preloader'

class ScreenMenuItems extends Component {
  componentDidMount () {
    this.props.fetchAvailableMenuItemNames()
  }

  render () {
    const {availableMenuItemNames, isMenuItemNamesLoading} = this.props
    if (this.props.isMenuItemNamesLoading) {
      return (
        <div className='wrapper'>
          <Preloader/>
        </div>
      )
    }
    return (
      <div className='ScreenMenuWrapper'>
        <PlaceCategories/>
        <MultipleSelect isMenuItemNamesLoading={isMenuItemNamesLoading} names={availableMenuItemNames}/>
        <SubmitButton/>
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

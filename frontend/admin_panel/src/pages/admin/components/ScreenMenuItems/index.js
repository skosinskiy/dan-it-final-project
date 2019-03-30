import React, {Component} from 'react'
import {connect} from 'react-redux'
import Preloader from '../../Preloader'
import {withRouter} from 'react-router'
import {fetchAvailableMenuItemNames} from '../../../actions/menuItem'
import MultipleSelect from './MenuItemMultipleSelect'
import PlaceCategories from './PlaceCategories'
import './index.scss'
import SubmitButton from './SubmitButton'

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
    fetchAvailableMenuItemNames: () => dispatch(fetchAvailableMenuItemNames())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScreenMenuItems))

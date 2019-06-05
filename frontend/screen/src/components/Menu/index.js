import React, { Component } from 'react'
import { connect } from 'react-redux'
import Menu from '../hooks/Menu/menu'
import onClickOutside from 'react-onclickoutside'

class MenuContainer extends Component {
    handleClickOutside = () => {
      if (this.props.burgerMenu.isOpen) {
        this.props.toggle()
      }
    }
    render () {
      const {screenId} = this.props
      return (
        <Menu isOpen={this.props.burgerMenu.isOpen} onClick={this.props.toggle} screenId={screenId}/>
      )
    }
}

const clickOutsideConfig = {
  handleClickOutside: (instance) => {
    return instance.handleClickOutside
  }
}

const wrappedMenuContainer = onClickOutside(MenuContainer, clickOutsideConfig)

const mapStateToProps = store => {
  return {
    burgerMenu: {...store.menuReducer.burgerMenu}
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggle: () => dispatch({type: 'MENU_TOGGLE'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(wrappedMenuContainer)
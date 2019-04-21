import React, { Component } from 'react'
import { connect } from 'react-redux'
import Menu from '../hooks/Menu/menu'
import onClickOutside from 'react-onclickoutside'
import {toggleMenu} from '../../actions/menuActions'

class MenuContainer extends Component {
    handleClickOutside = () => {
      const {isOpen, toggle} = this.props

      isOpen && toggle()
    }

    render () {
      const {isOpen, toggle} = this.props

      return (
        <Menu isOpen={isOpen} onClick={toggle}/>
      )
    }
}

const clickOutsideConfig = {
  handleClickOutside: (instance) => {
    return instance.handleClickOutside
  }
}

const wrappedMenuContainer = onClickOutside(MenuContainer, clickOutsideConfig)

const mapStateToProps = ({menu}) => {
  return {
    isOpen: menu.isOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggle: () => dispatch(toggleMenu())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(wrappedMenuContainer)
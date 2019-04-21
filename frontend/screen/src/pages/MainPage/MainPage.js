import React from 'react'
import MainVideo from '../../components/MainVideo/MainVideo'
import {connect} from 'react-redux'
import {hasLayuot} from '../../utils/hasLayout'
import LayoutItems from '../../constants/layoutItems'
import './MainPage.scss'

class MainPage extends React.Component {
  render () {
    const {currentPlace} = this.props
    return (
      <div className={'mainPage'}>
        {
          hasLayuot(currentPlace, LayoutItems.VIDEO) &&
          <MainVideo/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPlace: state.currentPlace.currentPlace
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)

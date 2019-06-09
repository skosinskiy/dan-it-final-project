import React, {Component} from 'react'
import Messages from './Messages/'
import './Footer.scss'
import LayoutItems from '../../constants/layoutItems'
import { hasLayuot } from '../../utils/hasLayout'
import { connect } from 'react-redux'

class Footer extends Component {
  render () {
    const {currentPlace} = this.props
    return (
      <div className='bottom-list'>
        {
          hasLayuot(currentPlace, LayoutItems.MESSAGES) &&
          <Messages messages={this.props.messages}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
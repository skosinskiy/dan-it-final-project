import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withStyles } from '@material-ui/core/styles/index'

class Places extends Component {
  render () {
    const {place} = this.props.place
    return (
      <li>
        <form>
          <div><input value={place.id}>{}</input>{place.title}</div>
          <div><button>Edit</button></div>
        </form>
      </li>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles()(Places))
import React, {Component} from 'react'
import './map.scss'
import Iframe from 'react-iframe'
import Preloader from '../../Preloader'
import {loadMap} from '../../../actions/mapActions'
import {MAP_URL} from '../../../helpers/constants'
import {connect} from 'react-redux'

class Map extends Component {
  componentDidMount () {
    this.props.loadMap()
  }

  render () {
    const {loading} = this.props
    
    if (loading) {
      return <Preloader/>
    }

    return (
      <div className={'map'}>
        <Iframe
          url={MAP_URL}
          className='iframe'/>
      </div>
    )
  }
}

const mapStateToProps = ({map}) => {
  return {
    loading: map.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMap: () => dispatch(loadMap())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
import React, { Component } from 'react'
import { deletePlaceMessageById } from '../../../store/places/operations'
import '../SectionItem/section-item.scss'
import {connect} from 'react-redux'

class PlaceMessage extends Component {
  render () {
    const {item, placeId, del} = this.props
    const {id} = item
    return (
      <div className="item-link">
        <div className="section-item__message-cont">
          <div className="section-item__header">
            <div className="section-item__title">
              {`${item.user.firstName} ${item.user.lastName}`}
            </div>
            {
              del
                ? (<button
                  className="section-item__del-btn"
                  type="button"
                  onClick={() => this.props.deletePlaceMessageById(id, placeId)}
                />)
                : null
            }
          </div>
          <div className="section-item__message">
            {item.message}
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deletePlaceMessageById: (placeMessageId, placeId) => dispatch(deletePlaceMessageById(placeMessageId, placeId))
  }
}

export default connect(null, mapDispatchToProps)(PlaceMessage)
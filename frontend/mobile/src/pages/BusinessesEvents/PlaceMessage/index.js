import React from 'react'
import { deletePlaceMessageById } from '../../../store/PlaceMessages/operations'
import '../SectionItem/section-item.scss'

const PlaceMessage = (props) => {
  const {item, placeId, context} = props
  const {id} = item
  return (
    <div className="section-item">
      <div className="section-item__message-cont">
        <div className="section-item__header">
          <div className="section-item__title">
            {item.user.firstName}
          </div>
          <button
            className="section-item__del-btn"
            type="button"
            onClick={() => deletePlaceMessageById(id, placeId, context)}
          />
        </div>
        <div className="section-item__message">
          {item.message}
        </div>
      </div>
    </div>
  )
}

export default PlaceMessage
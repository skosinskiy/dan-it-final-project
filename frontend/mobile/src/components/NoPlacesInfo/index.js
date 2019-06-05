import React from 'react'
import './no-places.scss'

const NoPlacesInfo = () => {
  return (
    <div className={'no_places-wrapper'}>
      <p className={'no_places-title'}>You haven't connected places yet</p>
      <p>To add new place connect with any RionUp device via QR-code</p>
    </div>)
}

export default NoPlacesInfo
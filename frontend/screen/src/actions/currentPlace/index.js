import * as TYPES from './types'
import api from '../../helpers/FetchData'

export const getCurrentPlace = (placeId) => dispatch => {
  api.get(`api/places/${placeId}`).then(res => {
    dispatch({type: TYPES.GET_CURRENT_PLACE, payload: {currentPlace: res}})
  })
}
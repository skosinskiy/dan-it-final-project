import * as TYPES from './types'
import api from '../../helpers/FetchData'

export const getEventsByPLace = (placeId) => dispatch => {
  api.get(`/api/events?placeId=${placeId}`).then(res => {
    dispatch({type: TYPES.GET_EVENTS_BY_PLACE, payload: {events: res}})
  })
}
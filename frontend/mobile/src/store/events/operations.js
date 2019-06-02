import api from '../../helpers/FetchData/index'
import * as ACTIONS from './actions'

export const getEventsByPlace = (placeId) => dispatch => {
  return api.get(`/api/events/place/${placeId}`).then(res => {
    dispatch(ACTIONS.getEventsByPlace({events: res}))
  })
}

export const getEventById = (eventId) => dispatch => {
  dispatch(ACTIONS.eventIsLoading(true))
  api.get(`/api/events/${eventId}`).then(res => {
    dispatch(ACTIONS.getEventById(res))
  }).finally(() => {
    dispatch(ACTIONS.eventIsLoading(false))
  })
}
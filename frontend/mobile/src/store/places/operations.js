import api from '../../helpers/FetchData'
import * as ACTIONS from './actions'
import {getBusinessesByCategory, getBusinessesByPlace} from '../businesses/operations'
import {getEventsByPlace} from '../events/operations'

export const fetchBusinessesEventsData = placeId => dispatch => {
  dispatch(ACTIONS.isBusinessesEventsDataLoading(true))
  Promise.all([
    dispatch(getBusinessesByPlace(placeId)),
    dispatch(getEventsByPlace(placeId)),
    dispatch(getPlaceMessagesByPlaceId(placeId))
  ]).finally(() => dispatch(ACTIONS.isBusinessesEventsDataLoading(false)))
}

export const getCurrentPlaceById = (placeId) => dispatch => {
  dispatch(ACTIONS.currentPlaceLoading())
  return api.get(`/api/places/${placeId}`).then(res => {
    dispatch(ACTIONS.currentPlaceById(res))
    dispatch(getBusinessesByCategory(res.placeCategory.businessCategories[0].id))
  })
}

export const getPlaceMessagesByPlaceId = placeId => dispatch => {
  return api.get(`/api/place-messages?placeId=${placeId}`).then(res => {
    dispatch(ACTIONS.getPlaceMessagesByPlaceId(res))
  })
}

export const postPlaceMessage = (message, placeId) => dispatch => {
  dispatch(ACTIONS.isBusinessesEventsDataLoading(true))
  return api.post(`/api/place-messages/place/${placeId}`, {
    message: message
  }).then(() => {
    dispatch(fetchBusinessesEventsData(placeId))
  }).finally(() => {
    dispatch(ACTIONS.isBusinessesEventsDataLoading(false))
  })
}

export const deletePlaceMessageById = (placeMessageId, placeId) => dispatch => {
  dispatch(ACTIONS.isBusinessesEventsDataLoading(true))
  return api.deleteApi(`/api/place-messages/${placeMessageId}`).then(() => {
    dispatch(fetchBusinessesEventsData(placeId))
  })
}

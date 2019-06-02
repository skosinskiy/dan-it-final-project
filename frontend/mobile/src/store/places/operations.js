import api from '../../helpers/FetchData'
import * as ACTIONS from './actions'
import {getBusinessesByCategory, getBusinessesByPlace} from '../businesses/operations'
import {getEventsByPlace} from '../events/operations'

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

export const fetchBusinessesEventsData = placeId => dispatch => {
  dispatch(ACTIONS.isBusinessesEventsDataLoading(true))
  Promise.all([
    dispatch(getCurrentPlaceById(placeId)),
    dispatch(getEventsByPlace(placeId)),
    dispatch(getBusinessesByPlace(placeId)),
    dispatch(getPlaceMessagesByPlaceId(placeId))
  ]).finally(() => dispatch(ACTIONS.isBusinessesEventsDataLoading(false)))
}

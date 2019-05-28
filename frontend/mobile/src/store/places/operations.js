import api from '../../helpers/FetchData'
import * as ACTIONS from './actions'
import {getBusinessesByCategory} from '../businesses/operations'
import {getEventsByPLace} from '../events/operations'

export const getCurrentPlaceById = (placeId) => dispatch => {
  dispatch(ACTIONS.currentPlaceLoading())
  return api.get(`/api/places/${placeId}`).then(res => {
    dispatch(ACTIONS.currentPlaceById(res))
    dispatch(getBusinessesByCategory(res.placeCategory.businessCategories[0].id))
  })
}

export const fetchBusinessesEventsData = placeId => dispatch => {
  dispatch(ACTIONS.isBusinessesEventsDataLoading(true))
  Promise.all([
    dispatch(getCurrentPlaceById(placeId)),
    dispatch(getEventsByPLace(placeId))
  ]).then(() => dispatch(ACTIONS.isBusinessesEventsDataLoading(false)))
}

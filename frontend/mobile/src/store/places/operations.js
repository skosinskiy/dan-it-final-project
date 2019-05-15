import api from '../../helpers/FetchData'
import * as ACTIONS from './actions'
import {getBusinessesByCategory} from '../businesses/operations'

export const getCurrentPlaceById = (placeId) => dispatch => {
  dispatch(ACTIONS.currentPlaceLoading())
  api.get(`/api/places/${placeId}`).then(res => {
    dispatch(ACTIONS.currentPlaceById(res))
    dispatch(getBusinessesByCategory(res.placeCategory.businessCategories[0].id))
  })
}

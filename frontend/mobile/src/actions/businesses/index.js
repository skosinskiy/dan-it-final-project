import * as TYPES from './types'
import api from '../../helpers/FetchData'

export const getAllBusinessesByPlace = (placeId) => dispatch => {
  api.get(`/api/businesses?placeId=${placeId}`).then(res => {
    dispatch({type: TYPES.GET_BUSINESSES_BY_PLACE, payload: {businesses: res.content}})
  })
}
import * as TYPES from './types'
import api from '../../helpers/FetchData'

export const getBusinessesByCategory = (categoryId) => dispatch => {
  api.get(`/api/businesses?categoryId=${categoryId}`).then(res => {
    dispatch({type: TYPES.GET_BUSINESSES_BY_CATEGORY, payload: {businesses: res.content}})
  })
}
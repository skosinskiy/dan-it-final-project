import * as ACTIONS from './actions'
import api from '../../helpers/FetchData/index'

export const getBusinessesByCategory = (categoryId) => dispatch => {
  api.get(`/api/businesses?categoryId=${categoryId}`).then(res => {
    dispatch(ACTIONS.getBusinessesByCategory({businesses: res.content}))
  })
}

export const getBusinessById = (businessId) => dispatch => {
  dispatch(ACTIONS.businessIsLoading(true))
  api.get(`/api/businesses/${businessId}`).then(res => {
    dispatch(ACTIONS.getBusinessById(res))
  }).finally(() => {
    dispatch(ACTIONS.businessIsLoading(false))
  })
}

export const getBusinessesByPlace = placeId => dispatch => {
  return api.get(`/api/businesses?placeId=${placeId}&size=1000`).then(res => {
    dispatch(ACTIONS.getBusinessesByPlace(res.content))
  })
}
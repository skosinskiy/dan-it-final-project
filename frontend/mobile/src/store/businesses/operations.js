import * as ACTIONS from './actions'
import api from '../../helpers/FetchData/index'

export const getBusinessesByCategory = (categoryId) => dispatch => {
  api.get(`/api/businesses?categoryId=${categoryId}`).then(res => {
    dispatch(ACTIONS.getBusinessesByCategory({businesses: res.content}))
  })
}
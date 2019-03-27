import api from '../../components/FetchData'
import Actions from '../Actions'

export const getAllBusinessCategories = () => dispatch => {
  api.get('/api/business-categories').then(
    res => dispatch({type: Actions.BusinessCategory.GET_ALL_CATEGORIES, payload: res})
  )
}

export const deleteBusinessCategory = (categoryId) => dispatch => {
  api.deleteApi(`/api/business-categories/${categoryId}`).then(res => {
    api.get(`/api/business-categories`).then(res => {
      dispatch({type: Actions.BusinessCategory.GET_ALL_CATEGORIES, payload: res})
    })
  })
}
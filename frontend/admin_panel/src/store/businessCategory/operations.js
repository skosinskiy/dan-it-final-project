import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const getAllBusinessCategories = () => dispatch => {
  api.get('/api/business-categories').then(res => {
    dispatch(ACTIONS.getAllBusinessCategories(res))
  })
}

export const deleteBusinessCategory = (categoryId) => dispatch => {
  api.deleteApi(`/api/business-categories/${categoryId}`).then(() => {
    dispatch(getAllBusinessCategories())
  })
}

export const saveCategory = category => dispatch => {
  if (category.id) {
    api.put(`/api/business-categories/${category.id}`, category).then(res => {
      dispatch(getAllBusinessCategories())
    })
  } else {
    api.post(`/api/business-categories`, category).then(res => {
      dispatch(getAllBusinessCategories())
    })
  }
}

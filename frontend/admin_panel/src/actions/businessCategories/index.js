import api from '../../components/FetchData'
import Actions from '../Actions'

export const getAllBusinessCategories = () => dispatch => {
  api.get('/api/business-categories').then(res => {
    dispatch({type: Actions.BusinessCategory.GET_ALL_CATEGORIES, payload: res})
  }
  )
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
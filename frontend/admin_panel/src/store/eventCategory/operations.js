import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const getAllEventCategories = () => dispatch => {
  api.get('/api/event-categories').then(res => {
    dispatch(ACTIONS.getAllEventCategories(res))
  })
}

export const deleteEventCategory = (categoryId) => dispatch => {
  api.deleteApi(`/api/event-categories/${categoryId}`).then(() => {
    dispatch(getAllEventCategories())
  })
}

export const saveCategory = category => dispatch => {
  if (category.id) {
    api.put(`/api/event-categories/${category.id}`, category).then(res => {
      dispatch(getAllEventCategories())
    })
  } else {
    api.post(`/api/event-categories`, category).then(res => {
      dispatch(getAllEventCategories())
    })
  }
}

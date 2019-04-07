import api from 'helpers/FetchData'
import * as ACTIONS from './actions'
import axios from 'axios'

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

export const saveCategory = (category, file) => dispatch => {
  if (category.id) {
    api.put(`/api/business-categories/${category.id}`, category).then(res => {
      dispatch(getAllBusinessCategories())
    })
  } else {
    const json = JSON.stringify(category);
    const blob = new Blob([json], {
      type: 'application/json'
    });

    const formData = new FormData();
    formData.append("json", blob)
    formData.append('file', file)

    api.post(`/api/business-categories`, formData).then(res => {
      dispatch(getAllBusinessCategories())
    })
  }
}

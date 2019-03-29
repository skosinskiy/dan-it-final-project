import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const getPlaces = () => dispatch => {
  api.get(`/api/places`).then(res => {
    dispatch(ACTIONS.getAllPlaces(res))
  })
}

export const saveNewPlace = (place) => dispatch => {
  api.post(`/api/places`, place).then(res => {
    api.get(`/api/places`).then(res => {
      dispatch(ACTIONS.getAllPlaces(res))
    })
  })
}

export const getPlacesCategories = () => dispatch => {
  api.get(`/api/place-categories`).then(res => {
    dispatch(ACTIONS.getPlacesCategories(res))
  })
}

export const deletePlace = (placeId) => dispatch => {
  api.deleteApi(`/api/places/${placeId}`).then(res => {
    api.get(`/api/places`).then(res => {
      dispatch(ACTIONS.getPlacesCategories(res))
    })
  })
}

export const updatePlace = (placeId, place) => dispatch => {
  api.put(`/api/places/${placeId}`, place).then(res => {
    api.get(`/api/places`).then(res => {
      dispatch(ACTIONS.getPlacesCategories(res))
    })
  })
}

import api from '../../components/FetchData/index'
import Actions from '../Actions'

export const getPlaces = () => dispatch => {
  api.get(`/api/places`).then(res => {
    dispatch({type: Actions.Place.GET_ALL_PLACES, payload: {places: res}})
  })
}

export const saveNewPlace = (place) => dispatch => {
  api.post(`/api/places`, place).then(res => {
    api.get(`/api/places`).then(res => {
      dispatch({type: Actions.Place.GET_ALL_PLACES, payload: {places: res}})
    })
  })
}

export const getPlacesCategories = () => dispatch => {
  api.get(`/api/place-categories`).then(res => {
    dispatch({type: Actions.Place.GET_PLACES_CATEGORIES, payload: {placeCategories: res}})
  })
}

export const deletePlace = (placeId) => dispatch => {
  api.deleteApi(`/api/places/${placeId}`).then(res => {
    api.get(`/api/places`).then(res => {
      dispatch({type: Actions.Place.GET_ALL_PLACES, payload: {places: res}})
    })
  })
}

export const updatePlace = (placeId, place) => dispatch => {
  api.put(`/api/places/${placeId}`, place).then(res => {
    api.get(`/api/places`).then(res => {
      dispatch({type: Actions.Place.GET_ALL_PLACES, payload: {places: res}})
    })
  })
}

export const getPlaceById = (placeId) => dispatch => {
  api.get(`/api/places/${placeId}`)
}

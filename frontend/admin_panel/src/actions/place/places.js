import api from '../../components/FetchData/index'
import PlaceActions from './PlaceActions'

export const getPlaces = () => dispatch => {
  api.get(`/api/places`).then(res => {
    dispatch({type: PlaceActions.GET_ALL_PLACES, payload: {places: res}})
  })
}

export const saveNewPlace = (place) => dispatch => {
  api.post(`/api/places`, place).then(api.get(`/api/places`).then(res => {
    dispatch({type: PlaceActions.GET_ALL_PLACES, payload: {places: res}})
  }))
}

export const getPlacesCategories = () => dispatch => {
  api.get(`/api/place-categories`).then(res => {
    dispatch({type: PlaceActions.GET_PLACES_CATEGORIES, payload: {placeCategories: res}})
  })
}

export const deletePlace = (placeId, placeList) => dispatch => {
  api.deleteApi(`/api/places/${placeId}`).then(api.get(`/api/places`).then(res => {
    dispatch({type: PlaceActions.GET_ALL_PLACES, payload: {places: res}})
  }))
}

export const updatePlace = (placeId, place) => dispatch => {
  api.put(`/api/places/${placeId}`, place).then(api.get(`/api/places`).then(res => {
    dispatch({type: PlaceActions.GET_ALL_PLACES, payload: {places: res}})
  }))
}

export const getPlaceById = (placeId) => dispatch => {
  api.get(`/api/places/${placeId}`).then(res => {
    dispatch({type: PlaceActions.GET_PLACE_BY_ID, payload: {placeById: {...res}}})
  })
}

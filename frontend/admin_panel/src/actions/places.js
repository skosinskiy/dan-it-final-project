import api from '../components/FetchData'
import PlaceActions from './ActionTypes/PlaceActions'

export const getPlaces = () => dispatch => {
  api.get(`/api/places`).then(res => {
    dispatch({type: PlaceActions.GET_ALL_PLACES, payload: {places: res}})
  })
}

export const saveNewPlace = (place) => dispatch => {
  api.post(`/api/places`, place).then(res => {
    dispatch({type: PlaceActions.ADD_NEW_PLACE, payload: {newPlace: res}})
  })
}

export const getPlacesCategories = () => dispatch => {
  api.get(`/api/place-categories`).then(res => {
    dispatch({type: PlaceActions.GET_PLACES_CATEGORIES, payload: {placeCategories: res}})
  })
}

export const deletePlace = (placeId, placeList) => dispatch => {
  api.deleteApi(`/api/places/${placeId}`).then(res => {
    const updatedPlaceList = []
    placeList.forEach((place) => {
      if (place.id !== placeId) {
        updatedPlaceList.push(place)
      }
    })
    dispatch({type: PlaceActions.DELETE_PLACE, payload: {places: updatedPlaceList}})
  })
}

export const updatePlace = (placeId, place) => dispatch => {
  api.put(`/api/places/${placeId}`, place).then(res => {
    dispatch({type: PlaceActions.UPDATE_PLACE, payload: {updatedPLace: res}})
  })
}

export const getPlaceById = (placeId) => dispatch => {
  api.get(`/api/places/${placeId}`).then(res => {
    dispatch({type: PlaceActions.GET_PLACE_BY_ID, payload: {placeById: {...res}}})
  })
}

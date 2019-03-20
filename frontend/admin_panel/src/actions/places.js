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

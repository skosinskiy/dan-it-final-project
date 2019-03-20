import api from '../components/FetchData'
import PlaceActions from './ActionTypes/PlaceActions'

export const getUserRoles = () => dispatch => {
  api.get(`/api/places`).then(res => {
    dispatch({type: PlaceActions.GET_ALL_PLACES, payload: {places: res}})
  })
}
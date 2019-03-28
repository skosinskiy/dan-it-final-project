import api from '../../components/FetchData/index'
import Actions from '../Actions'

export const fetchAvailableMenuItemNames = () => dispatch => {
  dispatch({type: Actions.MenuItems.IS_LOADING, payload: true})
  api.get(`/api/places/menu-items/`)
    .then(res => dispatch({type: Actions.MenuItems.FETCH_AVAILABLE, payload: res}))
    .finally(() => dispatch({type: Actions.MenuItems.IS_LOADING, payload: false}))
}
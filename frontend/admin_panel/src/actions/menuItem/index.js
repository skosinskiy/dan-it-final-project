import api from '../../components/FetchData/index'
import Actions from '../Actions'

export const fetchAvailableMenuItemNames = () => dispatch => {
  dispatch({type: Actions.MenuItems.IS_LOADING, payload: true})
  api.get(`/api/places/menu-items/`)
    .then(menuItems => dispatch({type: Actions.MenuItems.FETCH_AVAILABLE, payload: menuItems}))
    .finally(() => dispatch({type: Actions.MenuItems.IS_LOADING, payload: false}))
}
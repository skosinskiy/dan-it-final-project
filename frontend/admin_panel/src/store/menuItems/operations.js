import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const fetchNames = () => dispatch => {
  dispatch(ACTIONS.isLoading(true))
  api.get(`/api/places/menu-items/`)
    .then(menuItems => dispatch(ACTIONS.fetchAvailable(menuItems)))
    .then(() => dispatch(ACTIONS.isLoading(false)))
}

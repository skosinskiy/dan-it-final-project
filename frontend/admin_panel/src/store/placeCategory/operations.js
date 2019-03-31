import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const createData = () => dispatch => {
  const process = (multisync, name, menuItems) => {
    let counter = 0;
    return () => ({ id: counter++, multisync, name, menuItems, delete: "DELETE" })
  }
  dispatch(ACTIONS.isLoading(true))
  api.get(`/api/place-categories`)
    .then(rawData => rawData.map(placeCategory => process(...placeCategory)))
    .then(placeCategories => dispatch(ACTIONS.createData(placeCategories)))
    .finally(() => dispatch(ACTIONS.isLoading(false)))
}
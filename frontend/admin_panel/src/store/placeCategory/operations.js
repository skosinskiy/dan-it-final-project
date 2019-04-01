import api from 'helpers/FetchData'
import * as ACTIONS from './actions'
import {SORTING_ORDER} from 'constants/sortingOrder'

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

export const updateSelected = placeCategories => dispatch => {
  dispatch(ACTIONS.updateSelected(placeCategories))
}

export const toggleOrder = currentOrder => dispatch => {
  dispatch(ACTIONS.updateSelected(currentOrder === SORTING_ORDER.ASCENDING &&
    SORTING_ORDER.DESCENDING || SORTING_ORDER.ASCENDING))
}

export const updateOrderBy = orderBy => dispatch => {
  dispatch(ACTIONS.updateSelected(orderBy))
}

export const updatePage = page => dispatch => {
  dispatch(ACTIONS.updateSelected(page))
}

export const updateRowsPerPafe = rowsPerPafe => dispatch => {
  dispatch(ACTIONS.updateSelected(rowsPerPafe))
}
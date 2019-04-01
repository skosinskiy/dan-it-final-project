import api from 'helpers/FetchData'
import * as ACTIONS from './actions'
import {SORTING_ORDER} from 'constants/sortingOrder'

export const createData = () => dispatch => {
  console.log(dispatch)
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
  dispatch(ACTIONS.updateOrder(currentOrder === SORTING_ORDER.ASCENDING &&
    SORTING_ORDER.DESCENDING || SORTING_ORDER.ASCENDING))
}

export const updateOrderBy = orderBy => dispatch => {
  dispatch(ACTIONS.updateOrderBy(orderBy))
}

export const updatePage = page => dispatch => {
  dispatch(ACTIONS.updatePage(page))
}

export const updateRowsPerPage = rowsPerPage => dispatch => {
  dispatch(ACTIONS.updateRowsPerPafe(rowsPerPage))
}
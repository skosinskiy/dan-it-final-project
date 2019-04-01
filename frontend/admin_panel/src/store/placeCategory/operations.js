import api from 'helpers/FetchData'
import * as ACTIONS from './actions'
import {SORTING_ORDER} from 'constants/sortingOrder'
import DeleteButton from 'pages/admin/components/ManagePlaceCategories/components/Table/components/Buttons/Delete'
import MultiSelect from 'pages/admin/components/ManagePlaceCategories/components/Table/components/MultiSelect'
import React from 'react'

export const createData = () => dispatch => {
  const mapRawDataToTableRowClosure = mapRawDataToTableRow()
  dispatch(ACTIONS.isLoading(true))
  api.get(`/api/place-categories`)
    .then(rawData => rawData.map(placeCategory => mapRawDataToTableRowClosure(placeCategory)))
    .then(placeCategories => dispatch(ACTIONS.createData(placeCategories)))
    .finally(() => dispatch(ACTIONS.isLoading(false)))
}

const mapRawDataToTableRow = () => {
  let counter = 0
  return ({multisync, name, menuItems = "No menu items defined"} = {}) =>
  ({
    id: counter++,
    multisync,
    name,
    menuItems: <MultiSelect names={['Lorem', 'Upsum', 'Shops']}/>,
    delete: <DeleteButton/>,
    selected: false
  })
}

export const updateSelected = placeCategories => dispatch => {
  dispatch(ACTIONS.updateSelected(placeCategories))
}

export const toggleOrder = currentOrder => dispatch => {
  dispatch(ACTIONS.updateOrder((currentOrder === SORTING_ORDER.ASCENDING && SORTING_ORDER.DESCENDING) ||
  SORTING_ORDER.ASCENDING))
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
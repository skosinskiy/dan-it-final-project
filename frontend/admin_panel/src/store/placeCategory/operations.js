import api from 'helpers/FetchData'
import * as ACTIONS from './actions'
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

export const updateSelected = (id, selected) => dispatch => {
  const updated = [...selected];
  const idx = updated.indexOf(id)
  if (~idx){
    updated.splice(idx, 1)
  }else {
    updated.push(id)
  }
  dispatch(ACTIONS.updateSelected(updated))
}
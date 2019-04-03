import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const createData = () => dispatch => {
  dispatch(ACTIONS.isLoading(true))
  const mapIdsClosure = mapIds()
  api.get(`/api/place-categories`)
    .then(rawData => rawData.map(placeCategory => mapIdsClosure(placeCategory)))
    .then(placeCategories => dispatch(ACTIONS.updatePlaceCategories(placeCategories)))
    .finally(() => dispatch(ACTIONS.isLoading(false)))
}

const mapIds = () => {
  let counter = 0
  return ({multisync, name, menuItems = ['Lorem', 'Upsum', 'Shops']} = {}) =>
  ({
    id: counter++,
    multisync: multisync,
    name: name,
    menuItems: menuItems,
  })
}

export const updateChanged = (id, changed) => dispatch => {
  if (changed.indexOf(id) === -1){
    dispatch(ACTIONS.updateChanged([id].concat(changed)))
  }
}

export const toggleMultisync = (id, placeCategories) => dispatch => {
  const updated = [...placeCategories]
  const idx = updated.findIndex(category => category.id === id)
  updated[idx].multisync = !updated[idx].multisync
  dispatch(ACTIONS.updatePlaceCategories(updated))
}
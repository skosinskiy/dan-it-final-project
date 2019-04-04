import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const createData = () => dispatch => {
  dispatch(ACTIONS.isLoading(true))
  api.get(`/api/place-categories`)
    .then(rawData => rawData.map(placeCategory => addDefaultMocks(placeCategory)))
    .then(placeCategories => dispatch(ACTIONS.updatePlaceCategories(placeCategories)))
    .finally(() => dispatch(ACTIONS.isLoading(false)))
}

const addDefaultMocks = ({id, multisync, name, menuItems=[]} = {}) => ({
  id: id,
  multisync: multisync,
  name: name,
  menuItems: menuItems
})


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
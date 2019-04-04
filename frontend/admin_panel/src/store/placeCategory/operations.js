import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const createData = () => dispatch => {
  dispatch(ACTIONS.isLoading(true))
  api.get(`/api/place-categories`)
    .then(rawData => rawData.map(placeCategory => createNewOrAddDefaults(placeCategory)))
    .then(placeCategories => dispatch(ACTIONS.updatePlaceCategories(placeCategories)))
    .finally(() => dispatch(ACTIONS.isLoading(false)))
}

const createNewOrAddDefaults = ({id, multisync=true, name="EnterName", menuItems=[]} = {}) => ({
  key: Math.random() * new Date().getTime(),
  id: id,
  multisync: multisync,
  name: name,
  menuItems: menuItems
})

export const updateChanged = (key, placeCategories) => dispatch => {
  const idx = placeCategories.findIndex(placeCategory => placeCategory.key === key)
  const newPlaceCategories = [...placeCategories]
  newPlaceCategories[idx].changed = true
  dispatch(ACTIONS.updatePlaceCategories(newPlaceCategories))
}

export const toggleMultisync = (key, placeCategories) => dispatch => {
  const updated = [...placeCategories]
  const idx = updated.findIndex(category => category.key === key)
  updated[idx].multisync = !updated[idx].multisync
  dispatch(ACTIONS.updatePlaceCategories(updated))
}

export const addNew = placeCategories => dispatch => {
  const updated = [...placeCategories]
  const newCategory = createNewOrAddDefaults();
  updated.push(newCategory)
  dispatch(updateChanged(newCategory.key, updated))
}

export const deleteItem = (key, placeCategories, deletedIds) => dispatch => {
  const idx = placeCategories.findIndex(item => item.key === key)
  if (placeCategories[idx].id) {
    const newDeletedIds = new Set (deletedIds)
    newDeletedIds.add(placeCategories[idx].id)
    dispatch(ACTIONS.updateDeletedPlaceCategoryIds([...newDeletedIds]))
  }
  const updated = [...placeCategories]
  updated.splice(idx, 1)
  dispatch(ACTIONS.updatePlaceCategories(updated))
}

export const getAllNew = placeCategories => placeCategories.filter(placeCategory => !placeCategory.id)

export const getAllEdited = placeCategories =>
  placeCategories.filter(placeCategory => placeCategory.id && placeCategory.changed)
import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

const endPoint = {
  URL: '/api/place-categories',
  get: (params) => api.get(endPoint.URL, {params}),
  post: (body, params) => api.post(endPoint.URL, body, {params}),
  put: (body, params) => api.put(endPoint.URL, body, {params}),
  delete: (id) => api.deleteApi(`${endPoint.URL}/${id}`),
}

const decorateByPreloader = dispatch => request => {
  dispatch(ACTIONS.isLoading(true))
  request().finally(() => dispatch(ACTIONS.isLoading(false)))
}

const preloadDecorator = dispatch => decorateByPreloader(dispatch)

export const createData = () => dispatch => {
  const request = () => (
    endPoint.get()
      .then(rawData => rawData.map(placeCategory => createNewOrAddDefaults(placeCategory)))
      .then(placeCategories => dispatch(ACTIONS.updatePlaceCategories(placeCategories)))
  )
  preloadDecorator(dispatch)(request)
}

const createNewOrAddDefaults = ({ id, multisync = true, name = "EnterName", menuItems = [] } = {}) => ({
  key: Math.random() * new Date().getTime(),
  id: id,
  multisync: multisync,
  name: name,
  menuItems: menuItems
})

const findIndexByKey = (key, container) =>
  container.findIndex(placeCategory => placeCategory.key === key)

/**
 * sets entitie's field to value and returns new container
 * @param {number} key
 * @param {object} container
 * @param {string} field
 * @param {any} value
 * @returns {object}
 */
const setEntityField = (key, container, field, value) => {
  const idx = findIndexByKey(key, container)
  const newContainer = [...container]
  newContainer[idx][field] = value
  return newContainer
}

export const updateChanged = (key, container) => dispatch => {
  dispatch(ACTIONS.updatePlaceCategories(
    setEntityField(key, container, 'changed', true)
  ))
}

export const updateMenuItems = (key, container, menuItems) => dispatch => {
  dispatch(ACTIONS.updatePlaceCategories(
    setEntityField(key, container, 'menuITems', menuItems)
  ))
}

export const updateName = (key, container, name) => dispatch => {
  dispatch(ACTIONS.updatePlaceCategories(
    setEntityField(key, container, 'name', name)
  ))
}

export const toggleMultisync = (key, container) => dispatch => {
  const idx = findIndexByKey(key, container)
  dispatch(ACTIONS.updatePlaceCategories(
    setEntityField(key, container, 'multisync', !container[idx].multisync)
  ))
}

export const addNew = container => dispatch => {
  const newContainer = [...container]
  newContainer.push(createNewOrAddDefaults())
  dispatch(ACTIONS.updatePlaceCategories(newContainer))
}

export const deleteItem = (key, container, deletedIds) => dispatch => {
  const idx = findIndexByKey(key, container)
  if (container[idx].id) {
    const newDeletedIds = new Set(deletedIds)
    newDeletedIds.add(container[idx].id)
    dispatch(ACTIONS.updateDeletedPlaceCategoryIds([...newDeletedIds]))
  }
  const newContainer = [...container]
  newContainer.splice(idx, 1)
  dispatch(ACTIONS.updatePlaceCategories(newContainer))
}

export const getAllNew = placeCategories => placeCategories.filter(placeCategory => !placeCategory.id)

export const getAllEdited = placeCategories =>
  placeCategories.filter(placeCategory => placeCategory.id && placeCategory.changed)

export const getAllDeletedIds = placeCategories => placeCategories.deletedIds

export const saveAllChanges = placeCategories => dispatch => {
  dispatch(requestDelete(placeCategories))
}

export const requestDelete = (placeCategories) => dispatch => {
  const request = () => (
    Promise.all(
      getAllDeletedIds(placeCategories).reduce((promises, id) => (
        promises.concat([endPoint.delete(id)])
      ), [])
    )
  )
  preloadDecorator(dispatch)(request)
}
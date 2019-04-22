import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

const endPoint = {
  URL: '/api/place-categories/',
  get: (id = '', params) => api.get(endPoint.URL + id, { params }),
  post: (body, params) => api.post(endPoint.URL, body, { params }),
  put: (id, body, params) => api.put(endPoint.URL + id, body, { params }),
  delete: (id, params) => api.deleteApi(endPoint.URL + id, { params }),
}

const decorateByPreloader = dispatch => async request => {
  dispatch(ACTIONS.isLoading(true))
  request = Array.isArray(request) ? request.flat() : [request]
  const result = await Promise.all(request)
  dispatch(ACTIONS.isLoading(false))
  return result.flat()
}

const preloadDecorator = dispatch => decorateByPreloader(dispatch)

export const reloadData = () => async dispatch => {
  const businessCategories = await preloadDecorator(dispatch)(api.get(`/api/business-categories/all-parent`))
  dispatch(ACTIONS.updateBusinessCategories(businessCategories))
  dispatch(flushDeletedIds())
  const rawData = await preloadDecorator(dispatch)(endPoint.get())
  dispatch(ACTIONS.updatePlaceCategories(rawData.map(placeCategory => createOrSetKey(placeCategory))))
}

const createNewOrAddDefaults = ({ id, multisync = false, name = "Display Name",
  description = "Enter your desription here", menuItems = [], layoutItems = []} = {}) =>
({
  key: Math.random() * new Date().getTime(),
  id: id,
  multisync: multisync,
  description: description,
  name: name,
  menuItems: menuItems,
  layoutItems: layoutItems
})

const createOrSetKey = placeCategory => {
  if (!placeCategory) {
    placeCategory = {
      multisync: false,
      name: "Display Name",
      description: "Enter your desription here",
      businessCategories: []
    }
  }
  return Object.assign(placeCategory, { key: Math.random() * new Date().getTime()})
}

const findIndexByKey = (key, container) => (
  container.findIndex(placeCategory => placeCategory.key === key)
)

/**
 * sets entitie's field to value and returns new container
 * @param {number} key
 * @param {object} container
 * @param {string} field
 * @param {any} value
 * @returns {object}
 */
const setValueToEntityField = (key, container, field, value) => {
  const idx = findIndexByKey(key, container)
  const newContainer = [...container]
  newContainer[idx][field] = value
  return newContainer
}

export const updateChanged = (key, container) => dispatch => {
  dispatch(ACTIONS.updatePlaceCategories(
    setValueToEntityField(key, container, 'changed', true)
  ))
}

export const updateBusinessCategories = (key, container, selectedBusinessCategories) =>dispatch => {
  dispatch(ACTIONS.updatePlaceCategories(
    setValueToEntityField(key, container, 'businessCategories', selectedBusinessCategories)
  ))
}

export const updateLayoutItems = (key, container, layoutItems) => dispatch => {
  dispatch(ACTIONS.updatePlaceCategories(
    setValueToEntityField(key, container, 'layoutItems', layoutItems)
  ))
}

export const updateDescription = (key, container, description) => dispatch => {
  dispatch(ACTIONS.updatePlaceCategories(
    setValueToEntityField(key, container, 'description', description)
  ))
}

export const updateName = (key, container, name) => dispatch => {
  dispatch(ACTIONS.updatePlaceCategories(
    setValueToEntityField(key, container, 'name', name)
  ))
}

export const toggleMultisync = (key, container) => dispatch => {
  const idx = findIndexByKey(key, container)
  dispatch(ACTIONS.updatePlaceCategories(
    setValueToEntityField(key, container, 'multisync', !container[idx].multisync)
  ))
}

export const addNew = container => dispatch => {
  const newContainer = [...container]
  newContainer.push(createOrSetKey())
  dispatch(ACTIONS.updatePlaceCategories(newContainer))
}

const updateDeletedIds = (idx, container, deletedIds) => dispatch => {
  if (container[idx].id) {
    const newDeletedIds = new Set(deletedIds)
    newDeletedIds.add(container[idx].id)
    dispatch(ACTIONS.updateDeletedPlaceCategoryIds([...newDeletedIds]))
  }
}

const flushDeletedIds = () => dispatch => {
  dispatch(ACTIONS.updateDeletedPlaceCategoryIds([]))
}

export const deleteItem = (key, container, deletedIds) => dispatch => {
  const idx = findIndexByKey(key, container)
  const newContainer = [...container]
  dispatch(updateDeletedIds(idx, newContainer, deletedIds))
  newContainer.splice(idx, 1)
  dispatch(ACTIONS.updatePlaceCategories(newContainer))
}

const getAllNew = ({ placeCategories }) => (
  placeCategories.filter(placeCategory => !placeCategory.id)
)

const getAllEdited = ({ placeCategories }) => (
  placeCategories.filter(placeCategory => placeCategory.id && placeCategory.changed)
)

const getAllDeletedIds = ({ deletedIds }) => deletedIds

export const saveAllChanges = placeCategories => dispatch => {
  const requests = Array.of(
    requestPost(placeCategories),
    requestPut(placeCategories),
    requestDelete(placeCategories)
  )
  preloadDecorator(dispatch)(requests)
    .then(() => dispatch(reloadData()))
}

const requestDelete = placeCategories => (
  getAllDeletedIds(placeCategories).map(id => endPoint.delete(id))
)

const requestPost = placeCategories => (
  getAllNew(placeCategories).map(placeCategory => endPoint.post(placeCategory))
)

const requestPut = placeCategories => (
  getAllEdited(placeCategories).map(placeCategory => endPoint.put(placeCategory.id, placeCategory))
)

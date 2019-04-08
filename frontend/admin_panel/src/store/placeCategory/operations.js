import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

const endPoint = {
  URL: '/api/place-categories/',
  get: (id='', params) => api.get(endPoint.URL + id, {params}),
  post: (body, params) => api.post(endPoint.URL, body, {params}),
  put: (id, body, params) => api.put(endPoint.URL + id, body, {params}),
  delete: (id, params) => api.deleteApi(endPoint.URL + id, {params}),
}

const decorateByPreloader = dispatch => request => {
  dispatch(ACTIONS.isLoading(true))
  request().then(dispatch(ACTIONS.isLoading(false)))
}

const preloadDecorator = dispatch => decorateByPreloader(dispatch)

export const realoadData = () => dispatch => {
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

export const updateMenuItems = (key, container, menuItems) => dispatch => {
  dispatch(ACTIONS.updatePlaceCategories(
    setValueToEntityField(key, container, 'menuItems', menuItems)
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
  newContainer.push(createNewOrAddDefaults())
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

export const getAllNew = ({placeCategories}) => placeCategories.filter(placeCategory => !placeCategory.id)

export const getAllEdited = ({placeCategories}) =>
  placeCategories.filter(placeCategory => placeCategory.id && placeCategory.changed)

export const getAllDeletedIds = ({deletedIds}) => deletedIds

export const saveAllChanges = placeCategories => dispatch => {
  new Promise (resolve => {
    setTimeout(() => resolve(dispatch(requestPost(placeCategories))), 0)
  })
  .then(() => new Promise (resolve => {
    setTimeout(() => resolve(dispatch(requestPut(placeCategories))), 0)
  }))
  .then(() => new Promise (resolve => {
    setTimeout(() => resolve (dispatch(requestDelete(placeCategories))),0)
  }))
}

export const requestDelete = (placeCategories) => dispatch => {
  const request = () => (
    Promise.all(
      getAllDeletedIds(placeCategories).reduce((promises, id) => (
        promises.concat([endPoint.delete(id)])
      ), [])
    )
    .then(dispatch(flushDeletedIds()))
  )
  return preloadDecorator(dispatch)(request)
}

export const requestPost = (placeCategories) => dispatch => {
  const request = () => (
    Promise.all(
      getAllNew(placeCategories).reduce((promises, placeCategory) => (
        promises.concat([endPoint.post(placeCategory)])
      ), [])
    )
  )
  return preloadDecorator(dispatch)(request)
}

export const requestPut = (placeCategories) => dispatch => {
  const request = () => (
    Promise.all(
      getAllEdited(placeCategories).reduce((promises, placeCategory) => (
        promises.concat([endPoint.put(placeCategory.id, placeCategory)])
      ), [])
    )
  )
  return preloadDecorator(dispatch)(request)
}
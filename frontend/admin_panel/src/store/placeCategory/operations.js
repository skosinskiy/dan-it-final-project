import api from 'helpers/FetchData'
import * as ACTIONS from './actions'
import store from 'store'

const endPoint = {
  URL: '/api/place-categories/',
  get: (id = '', params) => api.get(endPoint.URL + id, { params }),
  post: (body, params) => api.post(endPoint.URL, body, { params }),
  put: (id, body, params) => api.put(endPoint.URL + id, body, { params }),
  delete: (id, params) => api.deleteApi(endPoint.URL + id, { params }),
}

const decorateByPreloader = dispatch => async request => {
  dispatch(ACTIONS.isHttpRequestPending(true))
  const result = await request
  dispatch(ACTIONS.isHttpRequestPending(false))
  return result
}

const preloadDecorator = dispatch => decorateByPreloader(dispatch)

export const reloadData = () => async dispatch => {
  const rawData = await preloadDecorator(dispatch)(endPoint.get())
  dispatch(ACTIONS.updatePlaceCategories(rawData.map(placeCategory => createOrSetKey(placeCategory))))
}

export const fetchBusinessCategories = () => async dispatch => {
  const businessCategories = await preloadDecorator(dispatch)(api.get(`/api/business-categories/all-parent`))
  dispatch(ACTIONS.updateBusinessCategories(businessCategories))
}

export const fetchLayoutItems = () => async dispatch => {
  const layoutItems = await preloadDecorator(dispatch)(api.get(`/api/layout-items`))
  dispatch(ACTIONS.updateLayoutItems(layoutItems.map(item => ({name: item}))))
}

export const createOrGetPlaceCategory = id => async dispatch => {
  dispatch(ACTIONS.isPlaceCategoryFormLoading(true));
  dispatch(fetchBusinessCategories())
  dispatch(fetchLayoutItems())
  if (id !== null) {
    var placeCategory = await preloadDecorator(dispatch)(endPoint.get(id))
  }
  dispatch(ACTIONS.updateEditedPlaceCategory(createOrSetKey(placeCategory)))
  dispatch(ACTIONS.isPlaceCategoryFormLoading(false));
}

const createOrSetKey = placeCategory => {
  if (!placeCategory) {
    placeCategory = {
      multisync: false,
      allowMessages: false,
      shouldAddPairedUsers: false,
      name: "Display Name",
      description: "Enter your desription here",
      businessCategories: [],
      layoutItems: [],
    }
  }
  return Object.assign(placeCategory, { key: Math.random() * new Date().getTime()})
}

const setValueToEntityField = (field, value = getInversedBoolean(field)) => (
  {
    ...store.getState().placeCategories.editedPlaceCategory,
    [field]: value
  }
)

const getInversedBoolean = (field) => !store.getState().placeCategories.editedPlaceCategory[field]

export const updateCategories = (flag, selectedCategories) => dispatch => {
  dispatch(ACTIONS.updateEditedPlaceCategory(
    setValueToEntityField(flag, selectedCategories)
  ))
}

export const updateDescription = (description) => dispatch => {
  dispatch(ACTIONS.updateEditedPlaceCategory(
    setValueToEntityField('description', description)
  ))
}

export const updateName = name => dispatch => {
  dispatch(ACTIONS.updateEditedPlaceCategory(
    setValueToEntityField('name', name)
  ))
}

export const toggleCheckBox = (checkBoxType) => dispatch => {
  dispatch(ACTIONS.updateEditedPlaceCategory(
    setValueToEntityField(checkBoxType)
  ))
}

export const processPutOrPost = () => dispatch => {
  const placeCategoryToProcess = store.getState().placeCategories.editedPlaceCategory
  const httpMethod = placeCategoryToProcess.id ? 'PUT' : 'POST'
  fireHttpRequest(dispatch, httpMethod, formatLayoutItems(placeCategoryToProcess))
}

const formatLayoutItems = (placeCategoryToProcess) => {
  placeCategoryToProcess.layoutItems = placeCategoryToProcess.layoutItems.map(item => item.name)
  return placeCategoryToProcess
}

export const processDelete = placeCategoryToProcess => dispatch => {
  fireHttpRequest(dispatch, 'DELETE', placeCategoryToProcess)
}

const fireHttpRequest = (dispatch, httpMethod, placeCategoryToProcess)=>{
  const PROCESSORS = {PUT: requestPut, POST: requestPost, DELETE: requestDelete}
  preloadDecorator(dispatch)(PROCESSORS[httpMethod](placeCategoryToProcess))
  .then(() => dispatch(reloadData()))
}

const requestDelete = placeCategory => (
  endPoint.delete(placeCategory.id)
)

const requestPost = placeCategory => (
  endPoint.post(placeCategory)
)

const requestPut = placeCategory => (
  endPoint.put(placeCategory.id, placeCategory)
)
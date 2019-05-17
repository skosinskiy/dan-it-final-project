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
  dispatch(ACTIONS.arePlaceCategoriesLoading(true))
  request = Array.isArray(request) ? request.flat() : [request]
  const result = await Promise.all(request)
  dispatch(ACTIONS.arePlaceCategoriesLoading(false))
  return result.flat()
}

const preloadDecorator = dispatch => decorateByPreloader(dispatch)

export const reloadData = () => async dispatch => {
  const rawData = await preloadDecorator(dispatch)(endPoint.get())
  dispatch(ACTIONS.updatePlaceCategories(rawData.map(placeCategory => createOrSetKey(placeCategory))))
}

export const fetchBusinessCategorires = () => async dispatch => {
  const businessCategories = await preloadDecorator(dispatch)(api.get(`/api/business-categories/all-parent`))
  dispatch(ACTIONS.updateBusinessCategories(businessCategories))
}

export const loadPlaceCategory = id => async dispatch => {
  dispatch(fetchBusinessCategorires())
  const businessCategory = await preloadDecorator(dispatch)(endPoint.get(id))
  dispatch(ACTIONS.updateEditedPlaceCategory(businessCategory))
}

export const addSinglePlaceCategory = () => dispatch => {
  dispatch(fetchBusinessCategorires())
  dispatch(ACTIONS.updateEditedPlaceCategory(createOrSetKey()))
  dispatch(ACTIONS.placeCategoryFormIsLoading(false))
}

const createOrSetKey = placeCategory => {
  if (!placeCategory) {
    placeCategory = {
      multisync: false,
      allowMessages: false,
      name: "Display Name",
      description: "Enter your desription here",
      businessCategories: []
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

export const updateBusinessCategories = (selectedBusinessCategories) =>dispatch => {
  dispatch(ACTIONS.updateEditedPlaceCategory(
    setValueToEntityField('businessCategories', selectedBusinessCategories)
  ))
}

export const updateLayoutItems = (layoutItems) => dispatch => {
  dispatch(ACTIONS.updateEditedPlaceCategory(
    setValueToEntityField('layoutItems', layoutItems)
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

export const deleteItem = (key, container, deletedIds) => dispatch => {

}

const getAllNew = ({ placeCategories }) => (
  placeCategories.filter(placeCategory => !placeCategory.id)
)

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
  //getAllDeletedIds(placeCategories).map(id => endPoint.delete(id))
  null
)

const requestPost = placeCategories => (
  getAllNew(placeCategories).map(placeCategory => endPoint.post(placeCategory))
)

const requestPut = placeCategories => (
 // getAllEdited(placeCategories).map(placeCategory => endPoint.put(placeCategory.id, placeCategory))
 null
)
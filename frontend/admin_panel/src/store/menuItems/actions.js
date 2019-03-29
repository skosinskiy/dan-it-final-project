import * as TYPES from './types'

export const fetchAvailable = (buildings) => ({
  type: TYPES.FETCH_AVAILABLE,
  payload: {buildings}
})

export const isLoading = (buildingCategories) => ({
  type: TYPES.IS_LOADING,
  payload: {buildingCategories}
})

export const setMenuItems = ({updatedUserList, changedUsersList}) => ({
  type: TYPES.SET_MENU_ITEMS,
  payload: {updatedUserList, changedUsersList}
})

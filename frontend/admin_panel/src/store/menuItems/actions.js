import * as TYPES from './types'

export const fetchAvailable = (menuItems) => ({
  type: TYPES.FETCH_AVAILABLE,
  payload: {menuItems}
})

export const isLoading = (loadingState) => ({
  type: TYPES.IS_LOADING,
  payload: loadingState
})

export const setMenuItems = ({updatedUserList, changedUsersList}) => ({
  type: TYPES.SET_MENU_ITEMS,
  payload: {updatedUserList, changedUsersList}
})

import * as TYPES from './types'

export const getAllRoles = (roles) => ({
  type: TYPES.GET_ALL_ROLES,
  payload: {roles}
})

export const isRolesLoading = (isLoading) => ({
  type: TYPES.IS_ROLES_LOADING,
  payload: isLoading
})

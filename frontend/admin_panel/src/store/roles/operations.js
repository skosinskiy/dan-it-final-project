import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const getAllRoles = () => dispatch => {
  dispatch(ACTIONS.isRolesLoading(true))
  api.get(`/api/roles`).then(res => {
    dispatch(ACTIONS.getAllRoles(res))
    dispatch(ACTIONS.isRolesLoading(false))
  })
}

export const saveNewRole = (role) => dispatch => {
  return api.post(`/api/roles`, role).then(res => {
    api.get(`/api/roles`).then(res => {
      dispatch(ACTIONS.getAllRoles(res))
    })
  })
}

export const deleteRole = roleId => dispatch => {
  dispatch(ACTIONS.isRolesLoading(true))
  api.deleteApi(`/api/roles/${roleId}`).then(res => {
    dispatch(getAllRoles())
  })
}

export const updateRole = (roleId, role) => dispatch => {
  return api.put(`/api/roles/${roleId}`, role).then(res => {
    api.get(`/api/roles`).then(res => {
      dispatch(ACTIONS.getAllRoles(res))
    })
  })
}



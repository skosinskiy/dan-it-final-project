import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const getRoles = () => dispatch => {
  api.get(`/api/roles`).then(res => {
    dispatch(ACTIONS.getAllRoles(res))
  })
}

export const saveNewRole = (role) => dispatch => {
  api.post(`/api/roles`, role).then(res => {
    api.get(`/api/roles`).then(res => {
      dispatch(ACTIONS.getAllRoles(res))
    })
  })
}

export const deleteRole = (roleId) => dispatch => {
  api.deleteApi(`/api/roles/${roleId}`).then(res => {
    api.get(`/api/roles`).then(res => {
      dispatch(ACTIONS.getAllRoles(res))
    })
  })
}

export const updateRole = (roleId, role) => dispatch => {
  api.put(`/api/roles/${roleId}`, role).then(res => {
    api.get(`/api/roles`).then(res => {
      dispatch(ACTIONS.getAllRoles(res))
    })
  })
}



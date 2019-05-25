import api from '../../helpers/FetchData'
import * as ACTIONS from './actions'
import {getAllRoles} from '../roles/operations'
import {toastr} from 'react-redux-toastr'

export const fetchUserFormData = (email, page, size) => dispatch => {
  dispatch(ACTIONS.isUserFormDataLoading(true))
  Promise.all([
    dispatch(getAllRoles()),
    dispatch(getUsersByEmail(email, page, size))
  ]).then(() => dispatch(ACTIONS.isUserFormDataLoading(false)))
}

export const saveUserRoles = (userId, roles) => dispatch => {
  dispatch(ACTIONS.isUserFormDataLoading(true))
  return api.put(`/api/users/${userId}/roles`, roles).then()
}

export const getUsersByEmail = (email, page, size) => dispatch => {
  dispatch(ACTIONS.isUsersLoading(true))
  dispatch(ACTIONS.setSearchParam(email))
  return api.get(`/api/users?email=${email}&page=${page}&size=${size}`).then(res => {
    dispatch(ACTIONS.getUsersByEmail(res))
    dispatch(ACTIONS.isUsersLoading(false))
  })
}

export const submitLoginForm = (event) => dispatch => {
  event.preventDefault()
  dispatch(ACTIONS.currentUserLoading(true))

  const data = new FormData(event.target)
  api.post('/auth', data).then(res => {
    if (res.status === 200) {
      dispatch(getCurrentUser())
    }
  })
    .catch(() => {
      dispatch(ACTIONS.currentUserLoading(false))
      toastr.error('Error', 'Wrong password or email!')
    })
}

export const getCurrentUser = () => dispatch => {
  dispatch(ACTIONS.currentUserLoading(true))
  api.get('/api/users/current')
    .then(user => {
      if (user !== '') {
        dispatch(ACTIONS.currentUserFetched(user))
      }
    })
    .finally(() => {
      dispatch(ACTIONS.currentUserLoading(false))
    })
}

export const logOutUser = () => dispatch => {
  dispatch(ACTIONS.currentUserLoading(true))
  api.post('/logout')
    .then(() => window.location.reload())
}

export const loginWithOAuth = (client) => dispatch => {
  window.location.replace(`/oauth2/authorization/${client}`)
}

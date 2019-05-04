import api from '../../helpers/FetchData'
import * as ACTIONS from './actions'

export const getUserRoles = () => dispatch => {
  api.get(`/api/roles`).then(res => {
    dispatch(ACTIONS.getRolesList(res))
  })
}

export const saveUserRoles = (userId, roles) => dispatch => {
  api.put(`api/users/${userId}/roles`, roles)
}

// getAllUsers
export const getUsersByEmail = (email, page, size) => dispatch => {
  dispatch(ACTIONS.getUsersRequest())

  api.get(`/api/users?email=${email}&page=${page}&size=${size}`).then(res => {
    dispatch(ACTIONS.getUsersByEmail({
      users: res.content,
      page: res.pageable.pageNumber,
      totalElements: res.totalElements,
      email: email
    }))
  }).catch(err => {
    dispatch(ACTIONS.getUsersError(err))
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
    .catch(() => dispatch(ACTIONS.currentUserLoading(false)))
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

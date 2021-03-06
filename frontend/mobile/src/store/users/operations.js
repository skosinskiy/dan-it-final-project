import api from '../../helpers/FetchData'
import * as ACTIONS from './actions'

export const submitLoginForm = (event, placeId) => dispatch => {
  event.preventDefault()
  dispatch(ACTIONS.currentUserLoading(true))
  const data = new FormData(event.target)
  api.post('/auth', data).then(res => {
    if (res.status === 200) {
      if (placeId) {
        dispatch(pairPlaceWithUser(placeId))
      } else {
        dispatch(getCurrentUser())
      }
    }
  })
    .catch(() => dispatch(ACTIONS.currentUserLoading(false)))
}

export const pairPlaceWithUser = placeId => dispatch => {
  dispatch(ACTIONS.currentUserLoading(true))
  return api.put(`/api/users/pair/${placeId}`).then(res => {
    dispatch(getCurrentUser())
  })
}

export const unpairPlaceFromUser = placeId => dispatch => {
  dispatch(ACTIONS.currentUserLoading(true))
  return api.put(`/api/users/unpair/${placeId}`).then(res => {
    dispatch(getCurrentUser())
  })
}

export const submitRegistrationForm = (event) => dispatch => {
  event.preventDefault()
  const data = new FormData(event.target)
  const json = {email: data.get('email'), password: data.get('password')}
  api.post('/api/users/register', json).then(res => {

  })
    .catch(() => dispatch(ACTIONS.currentUserLoading(false)))
}

export const getCurrentUser = () => dispatch => {
  dispatch(ACTIONS.currentUserLoading(true))
  return api.get('/api/users/current')
    .then(user => {
      if (user !== '') {
        dispatch(ACTIONS.currentUserFetched(user))
      }
    })
    .finally(() => {
      dispatch(ACTIONS.currentUserLoading(false))
    })
}

export const loginWithOAuth = (client) => dispatch => {
  window.location.replace(`/oauth2/authorization/${client}`)
}

export const getUsersByPlace = (placeId) => dispatch => {
  dispatch(ACTIONS.usersListByPlaceLoading(true))
  api.get(`/api/users/place/${placeId}`).then(res => {
    dispatch(ACTIONS.getUsersByPlace(res.content))
  }).finally(() => {
    dispatch(ACTIONS.usersListByPlaceLoading(false))
  })
}

export const updateCurrentPlace = placeId => dispatch => {
  dispatch(ACTIONS.isUpdateCurrentPlaceLoading(true))
  return api.put(`/api/users/current/place/${placeId}`)
    .then(res => {
      dispatch(ACTIONS.currentUserFetched(res))
    }).finally(() => {
      dispatch(ACTIONS.isUpdateCurrentPlaceLoading(false))
    })
}
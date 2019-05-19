import api from '../../helpers/FetchData'
import * as ACTIONS from './actions'

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
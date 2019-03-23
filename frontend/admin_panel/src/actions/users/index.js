import api from '../../components/FetchData'
import Actions from '../Actions'

export const getUserRoles = () => dispatch => {
  api.get(`/api/roles`).then(res => {
    dispatch({type: Actions.Users.GET_ROLES_LIST, payload: {userRoles: res}})
  })
}

export const getUsersByEmail = (params) => dispatch => {
  api.get(`/api/users?email=${params}`).then(res => {
    dispatch({type: Actions.Users.GET_USERS_BY_EMAIL, payload: {users: res}})
  })
}

export const saveUserRoles = (userId, roles) => dispatch => {
  api.put(`api/users/${userId}/roles`, roles)
}

export const submitLoginForm = (event) => dispatch => {
  event.preventDefault()
  dispatch({type: Actions.Users.CURRENT_USER_LOADING, payload: {isCurrentUserLoading: true}})
  const data = new FormData(event.target)
  api.post('/auth', data).then(res => {
    if (res.status === 200) {
      fetchCurrentUser(dispatch)
    }
    dispatch({type: Actions.Users.CURRENT_USER_LOADING, payload: {isCurrentUserLoading: false}})
  })
    .catch(() => dispatch({type: Actions.Users.CURRENT_USER_LOADING, payload: {isCurrentUserLoading: false}}))
}

export const getCurrentUser = () => dispatch => {
  dispatch({type: Actions.Users.CURRENT_USER_LOADING, payload: {isCurrentUserLoading: true}})
  fetchCurrentUser(dispatch)
}

const fetchCurrentUser = (dispatch) => {
  api.get('/api/users/current')
    .then(user => {
      if (user !== '') {
        dispatch({type: Actions.Users.CURRENT_USER_FETCHED, payload: {currentUser: user}})
        dispatch({type: Actions.Users.AUTHENTICATE_USER, payload: {isAuthenticated: true}})
      }
      dispatch({type: Actions.Users.CURRENT_USER_LOADING, payload: {isCurrentUserLoading: false}})
    })
    .catch(() => dispatch({type: Actions.Users.CURRENT_USER_LOADING, payload: {isCurrentUserLoading: false}}))
}

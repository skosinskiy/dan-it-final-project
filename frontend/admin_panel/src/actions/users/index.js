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

export const getCurrentUser = () => dispatch => {
  dispatch({type: Actions.Users.CURRENT_USER_LOADING, payload: {loading: true}})
  api.get('/api/users/current')
    .then(user => {
      dispatch({type: Actions.Users.CURRENT_USER_FETCHED, payload: {currentUser: user}})
      dispatch({type: Actions.Users.CURRENT_USER_LOADING, payload: {loading: false}})
    })
    .catch(err => console.error(err))
}

export const logOutUser = () => dispatch =>{
  api.post('/logout')
      .then(()=> window.location.reload())
}

import api from '../../components/FetchData'
import Actions from '../Actions'

export const getUserRoles = () => dispatch => {
  api.get(`/api/roles`).then(res => {
    dispatch({type: Actions.Users.GET_ROLES_LIST, payload: {userRoles: res}})
  })
}

export const getUsersByEmail = (email, page, size) => dispatch => {
  api.get(`/api/users?email=${email}&page=${page}&size=${size}`).then(res => {
    dispatch({type: Actions.Users.GET_USERS_BY_EMAIL,
      payload:
        {users: res.content, page: res.pageable.pageNumber, totalElements: res.totalElements, email: email}})
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

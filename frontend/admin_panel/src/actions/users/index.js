import api from '../components/FetchData'
import UserActions from './UserActions'

export const getUserRoles = () => dispatch => {
  api.get(`/api/rolesa`).then(res => {
    dispatch({type: UserActions.GET_ROLES_LIST, payload: {userRoles: res}})
  })
}

export const getUsersByEmail = (params) => dispatch => {
  api.get(`/api/users?email=${params}`).then(res => {
    dispatch({type: UserActions.GET_USERS_BY_EMAIL, payload: {users: res}})
  })
}

export const saveUserRoles = (userId, roles) => dispatch => {
  api.put(`api/users/${userId}/roles`, roles)
}

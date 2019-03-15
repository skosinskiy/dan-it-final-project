import { GET_ROLES_LIST, GET_USERS_BY_EMAIL, SET_USER_ROLES } from '../../actions/users'

const initialState = {
  usersListByEmail: [],
  userRoles: [],
  changedUsersList: new Set()
}

function users (state = initialState, action) {
  switch (action.type) {
    case GET_ROLES_LIST:
      return {...state, userRoles: action.payload.userRoles}
    case GET_USERS_BY_EMAIL:
      return {...state, usersListByEmail: action.payload.users}
    case SET_USER_ROLES:
      return {...state, usersListByEmail: action.payload.updatedUserList, changedUsersList: action.payload.changedUsersList}
    default:
      return {...state}
  }
}

export default users
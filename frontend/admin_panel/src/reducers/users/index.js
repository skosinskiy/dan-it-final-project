import UserActions from '../../actions/user/UserActions'

const initialState = {
  usersListByEmail: [],
  userRoles: [],
  changedUsersList: new Set(),
  isAuthenticated: true
}

function users (state = initialState, action) {
  switch (action.type) {
    case UserActions.GET_ROLES_LIST:
      return {...state, userRoles: action.payload.userRoles}
    case UserActions.GET_USERS_BY_EMAIL:
      return {...state, usersListByEmail: action.payload.users}
    case UserActions.SET_USER_ROLES:
      return {...state, usersListByEmail: action.payload.updatedUserList, changedUsersList: action.payload.changedUsersList}
    default:
      return {...state}
  }
}

export default users
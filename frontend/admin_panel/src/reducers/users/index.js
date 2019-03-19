import { AUTHENTICATE_USER, GET_ROLES_LIST, GET_USERS_BY_EMAIL, SET_USER_ROLES, UserActions } from '../../actions/Users'

const initialState = {
  usersListByEmail: [],
  userRoles: [],
  changedUsersList: new Set(),
  isAuthenticated: true,
  currentUser: null,
  currentUserLoading: true
}

function users (state = initialState, action) {
  switch (action.type) {
    case GET_ROLES_LIST:
      return {...state, userRoles: action.payload.userRoles}
    case GET_USERS_BY_EMAIL:
      return {...state, usersListByEmail: action.payload.users}
    case SET_USER_ROLES:
      return {...state, usersListByEmail: action.payload.updatedUserList, changedUsersList: action.payload.changedUsersList}
    case AUTHENTICATE_USER:
      return {...state, isAuthenticated: true}
    case UserActions.CURRENT_USER_FETCHED:
      return {...state, currentUser: action.payload.currentUser}
    case UserActions.CURRENT_USER_LOADING:
      return {...state, currentUserLoading: action.payload.currentUserLoading}
    default:
      return {...state}
  }
}

export default users
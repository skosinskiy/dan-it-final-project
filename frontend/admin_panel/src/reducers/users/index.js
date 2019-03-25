import Actions from '../../actions/Actions'

const initialState = {
  usersListByEmail: [],
  email: '',
  page: 0,
  totalElements: 0,
  userRoles: [],
  changedUsersList: [],
  isAuthenticated: true,
  currentUser: null,
  currentUserLoading: true
}

function users (state = initialState, action) {
  switch (action.type) {
    case Actions.Users.GET_ROLES_LIST:
      return {...state, userRoles: action.payload.userRoles}
    case Actions.Users.GET_USERS_BY_EMAIL:
      const {users, page, totalElements, email} = action.payload
      return {...state, usersListByEmail: users, page: page, totalElements: totalElements, email: email}
    case Actions.Users.CHANGE_PAGINATION_PAGE:
      return {...state, page: action.payload.page}
    case Actions.Users.SET_USER_ROLES:
      return {...state, usersListByEmail: action.payload.updatedUserList, changedUsersList: action.payload.changedUsersList}
    case Actions.Users.AUTHENTICATE_USER:
      return {...state, isAuthenticated: true}
    case Actions.Users.CURRENT_USER_FETCHED:
      return {...state, currentUser: action.payload.currentUser}
    case Actions.Users.CURRENT_USER_LOADING:
      return {...state, currentUserLoading: action.payload.loading}
    default:
      return {...state}
  }
}

export default users
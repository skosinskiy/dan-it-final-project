import { AUTHENTICATE_BUILDING, GET_TYPES_LIST, GET_BUILDINGS_BY_NAME, SET_BUILDING_TYPES } from '../../actions/buildings'

const initialState = {
  buildingsListByName: [],
  buildingTypes: [],
  changedBuildingsList: new Set(),
  isAuthenticated: true
}

function users (state = initialState, action) {
  switch (action.type) {
    case GET_TYPES_LIST:
      return {...state, userRoles: action.payload.userRoles}
    case GET_BUILDINGS_BY_NAME:
      return {...state, usersListByEmail: action.payload.users}
    case SET_BUILDING_TYPES:
      return {...state, usersListByEmail: action.payload.updatedUserList, changedUsersList: action.payload.changedUsersList}
    case AUTHENTICATE_BUILDING:
      return {...state, isAuthenticated: true}
    default:
      return {...state}
  }
}

export default users
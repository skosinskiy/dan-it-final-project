import * as TYPES from './types'

const initialState = {
  roles: [],
  isRolesLoading: false
}

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_ALL_ROLES:
      return {
        ...state,
        roles: [...action.payload.roles]
      }
    case TYPES.IS_ROLES_LOADING:
      return {
        ...state,
        isRolesLoading: action.payload
      }
    default:
      return {...state}
  }
}

export default rolesReducer

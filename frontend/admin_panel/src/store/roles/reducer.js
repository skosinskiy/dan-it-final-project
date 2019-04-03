import * as TYPES from './types'

const initialState = {
  roles: [],
}

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_ALL_ROLES:
      return {
        ...state,
        roles: [...action.payload.roles]
      }
    default:
      return {...state}
  }
}

export default rolesReducer

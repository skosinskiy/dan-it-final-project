import * as TYPES from './types'

const initialState = {
  buildings: [],
  buildingCategories: []
}

function buildings (state = initialState, action) {
  switch (action.type) {
    case TYPES.GET_ALL_BUILDINGS:
      return {
        ...state,
        buildings: [...action.payload.buildings]
      }
    case TYPES.GET_BUILDINGS_CATEGORIES:
      return {
        ...state,
        buildingCategories: [...action.payload.buildingCategories]
      }
    default:
      return {...state}
  }
}

export default buildings

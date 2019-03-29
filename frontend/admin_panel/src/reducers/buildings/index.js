import Actions from '../../actions/Actions'

const initialState = {
  buildings: [],
  buildingCategories: []
}

function buildings (state = initialState, action) {
  switch (action.type) {
    case Actions.Building.GET_ALL_BUILDINGS:
      return {...state, buildings: [...action.payload.buildings]}
    case Actions.Building.GET_BUILDINGS_CATEGORIES:
      return {...state, buildingCategories: [...action.payload.buildingCategories]}
    default:
      return {...state}
  }
}

export default buildings
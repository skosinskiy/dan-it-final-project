import Actions from '../../actions/Actions'

const initialState = {
  allBusinessCategories: []
}

export const businessCategory = (state = initialState, action) => {
  switch (action.type) {
    case Actions.BusinessCategory.GET_ALL_CATEGORIES:
      return {...state, allBusinessCategories: action.payload}
    default:
      return {...state}
  }
}
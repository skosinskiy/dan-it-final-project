import Actions from '../../actions/Actions'

const initialState = {
  allBusinessCategories: null,
  selectedCategory: ''
}

export const businessCategory = (state = initialState, action) => {
  switch (action.type) {
    case Actions.BusinessCategory.GET_ALL_CATEGORIES:
      return {...state, allBusinessCategories: action.payload}
    case Actions.BusinessCategory.CHANGE_CATEGORY:
      return {...state, selectedCategory: action.payload}
    default:
      return {...state}
  }
}
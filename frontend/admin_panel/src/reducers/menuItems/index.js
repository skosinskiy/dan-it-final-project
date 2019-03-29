import Actions from '../../actions/Actions'

const initialState = {
  availableMenuItemNames: [],
  isMenuItemNamesLoading: true
}

function menuItems (state = initialState, action) {
  switch (action.type) {
    case Actions.MenuItems.FETCH_AVAILABLE:
      return {...state, availableMenuItemNames: [...action.payload]}
    case Actions.MenuItems.IS_LOADING:
      return {...state, isMenuItemNamesLoading: action.payload}
    default:
      return {...state}
  }
}

export default menuItems

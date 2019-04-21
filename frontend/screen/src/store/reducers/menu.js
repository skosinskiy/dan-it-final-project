import Actions from '../../actions/actionTypes'

const initialState = {
  isOpen: false
}

export const menu = (state = initialState, action) => {
  switch (action.type) {
    case Actions.MENU_TOGGLE:
      return {isOpen: !state.isOpen}
    default:
      return state
  }
}
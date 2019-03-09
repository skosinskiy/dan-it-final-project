const initialState = {
  burgerMenu: {
    isOpen: false
  }
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MENU_TOGGLE': return {
      burgerMenu: {
        isOpen: !state.burgerMenu.isOpen
      }
    }
    default: return state
  }
}
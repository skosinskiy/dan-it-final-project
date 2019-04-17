const initialState = {
  selectedKey: ''
}
    
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_KEY': return {
      ...state,
      selectedKey: action.payload
    }
    default: return state
  }
}
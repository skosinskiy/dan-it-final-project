import Actions from '../../actions/actionTypes'

const initialState = {
  loading: false
}

export const map = (state = initialState, action) => {
  switch (action.type) {
    case Actions.MAP_LOADING:
      return {...state, loading: action.payload}
    default:
      return state
  }
}
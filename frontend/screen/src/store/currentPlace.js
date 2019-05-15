import * as TYPES from '../actions/currentPlace/types'

const initialState = {
  currentPlace: {},
  isLoaded: false
}

export const currentPlace = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_CURRENT_PLACE:
      return {...state, currentPlace: action.payload.currentPlace, isLoaded: true}
    default: return state
  }
}
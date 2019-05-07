import * as TYPES from './types'

const initialState = {
  currentChat: {},
  isLoaded: false
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_CHAT_BY_ID:
      return {...state, currentChat: action.payload.chat, isLoaded: true}
    default:
      return {...state}
  }
}

export default chatReducer
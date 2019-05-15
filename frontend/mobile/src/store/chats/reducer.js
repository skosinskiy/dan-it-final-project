import * as TYPES from './types'

const initialState = {
  currentChat: {},
  isLoaded: false,
  curentUserChats: [],
  isChatsLoaded: false
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_CHAT_BY_ID:
      return {...state, currentChat: action.payload.chat}
    case TYPES.CHAT_IS_LOADED:
      return {...state, isLoaded: action.payload}
    case TYPES.GET_CHATS_FOR_USER:
      return {...state, curentUserChats: action.payload.curentUserChats}
    case TYPES.USER_CHATS_IS_LOADED:
      return {...state, isChatsLoaded: action.payload}
    default:
      return {...state}
  }
}

export default chatReducer
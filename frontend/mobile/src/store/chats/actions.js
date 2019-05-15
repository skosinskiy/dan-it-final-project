import * as TYPES from './types'

export const getChatById = (chat) => ({
  type: TYPES.GET_CHAT_BY_ID,
  payload: chat
})

export const chatIsLoaded = (isLoaded) => ({
  type: TYPES.CHAT_IS_LOADED,
  payload: isLoaded
})

export const chatsForCurrentUser = (curentUserChats) => ({
  type: TYPES.GET_CHATS_FOR_USER,
  payload: {curentUserChats: curentUserChats}
})

export const userChatIsLoaded = (isChatsLoaded) => ({
  type: TYPES.USER_CHATS_IS_LOADED,
  payload: isChatsLoaded
})
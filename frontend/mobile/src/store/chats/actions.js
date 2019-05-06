import * as TYPES from './types'

export const getChatById = (chat) => ({
  type: TYPES.GET_CHAT_BY_ID,
  payload: chat
})
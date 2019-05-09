import * as ACTIONS from './actions'
import api from '../../helpers/FetchData/index'

export const getChatById = (chatId) => dispatch => {
  api.get(`/api/chats/${chatId}`).then(res => {
    dispatch(ACTIONS.getChatById({chat: res}))
  })
}

export const createNewMessage = (chatId, message) => dispatch => {
  api.post(`/api/chats/${chatId}/messages`, message).then(res => {
    dispatch(ACTIONS.getChatById({chat: res}))
  })
}

export const deleteMessage = (chatId, messageId) => dispatch => {
  api.deleteApi(`/api/chats/${chatId}/messages/${messageId}`).then(res => {
    dispatch(ACTIONS.getChatById({chat: res}))
  })
}

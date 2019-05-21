import * as ACTIONS from './actions'
import api from '../../helpers/FetchData/index'

export const getChatById = (chatId) => dispatch => {
  dispatch(ACTIONS.chatIsLoaded(false))
  api.get(`/api/chats/${chatId}`).then(res => {
    dispatch(ACTIONS.getChatById({chat: res}))
  }).finally(() => {
    dispatch(ACTIONS.chatIsLoaded(true))
  })
}

export const createNewMessage = (chatId, message) => dispatch => {
  dispatch(ACTIONS.chatIsLoaded(false))
  api.post(`/api/chats/${chatId}/messages`, message).then(res => {
    dispatch(ACTIONS.getChatById({chat: res}))
  }).finally(() => {
    dispatch(ACTIONS.chatIsLoaded(true))
  })
}

export const deleteMessage = (chatId, messageId) => dispatch => {
  dispatch(ACTIONS.chatIsLoaded(false))
  api.deleteApi(`/api/chats/${chatId}/messages/${messageId}`).then(res => {
    dispatch(ACTIONS.getChatById({chat: res}))
  }).finally(() => {
    dispatch(ACTIONS.chatIsLoaded(true))
  })
}

export const getAllChatsForCurrentUser = (userId) => dispatch => {
  dispatch(ACTIONS.userChatIsLoaded(false))
  api.get('/api/users/current').then(user => {
    const id = userId || user.id
    api.get(`/api/chats/user/${id}`).then(res => {
      dispatch(ACTIONS.chatsForCurrentUser(res))
    }).finally(() => {
      dispatch(ACTIONS.userChatIsLoaded(true))
    })
  })
}

export const createNewChat = (chat) => dispatch => {
  dispatch(ACTIONS.chatIsLoaded(false))
  api.post('/api/chats', chat).then(chat => {
    dispatch(ACTIONS.getChatById({chat: chat}))
  }).finally(() => {
    dispatch(ACTIONS.chatIsLoaded(true))
  })
}
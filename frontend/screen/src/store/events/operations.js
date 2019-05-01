import api from '../../helpers/FetchData/'
import * as ACTIONS from './actions'

export const getAllEvents = () => dispatch => {
  api.get(`/api/events`).then(res => {
    dispatch(ACTIONS.getAllEvents({eventList: res}))
  }).catch(err => {
    dispatch(ACTIONS.getEventError(err))
  })
}

export const getEventById = (id) => dispatch => {
  api.get(`/api/events/${id}`).then(res => {
    dispatch(ACTIONS.getEventByID({eventItem: res}))
  }).catch(err => {
    dispatch(ACTIONS.getEventError(err))
  })
}

export const deleteEvent = (eventId) => dispatch => {
  api.deleteApi(`/api/events/${eventId}`).then(res => {
    api.get(`/api/businesses`).then(res => {
      dispatch(ACTIONS.getAllEvents({eventList: res}))
    }).catch(err => {
      dispatch(ACTIONS.getEventError(err))
    })
  })
}

export const saveNewEvent = (business) => dispatch => {
  api.post(`/api/events`, business).then(res => {
    api.get(`/api/events`).then(res => {
      dispatch(ACTIONS.getAllEvents({eventList: res}))
    })
  })
}

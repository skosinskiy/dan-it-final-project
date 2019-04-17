import * as TYPES from './types'

const initialState = {
  eventList: [],

  eventListByTitle: [],
  changedBusinessList: [],
  page: 0,
  totalElements: 0,

  isLoaded: false,
  isLoading: false,
  error: null
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_EVENTS_BY_PLACE_ID:
      return {
        ...state,
        eventList: action.payload.eventList,
        totalElements: action.payload.eventList.length
      }
    case TYPES.GET_ALL_EVENTS:
      return {
        ...state,
        eventList: action.payload.eventList,
        totalElements: action.payload.eventList.length
      }
    default:
      return state
  }
}

export default eventReducer

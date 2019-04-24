import * as TYPES from './types'

const initialState = {
  eventsItem: {},

  isLoaded: false,
  isLoading: false,
  error: null
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_ALL_EVENTS:
      return {
        ...state,
        eventsList: action.payload.eventList
      }
    case TYPES.GET_ALL_EVENT_BY_ID:
      return {
        ...state,
        eventItem: action.payload.eventItem
      }
    default:
      return state
  }
}

export default eventReducer

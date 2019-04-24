import * as TYPES from './types'

const initialState = {
  eventsList: [],

  isLoaded: false,
  isLoading: false,
  error: null
}

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_ALL_EVENTS:
      return {
        ...state,
        eventsList: action.payload.eventsList
      }
    case TYPES.GET_ALL_EVENT_BY_ID:
      return {
        ...state,
        eventsItem: action.payload.eventsItem
      }
    default:
      return state
  }
}

export default businessReducer

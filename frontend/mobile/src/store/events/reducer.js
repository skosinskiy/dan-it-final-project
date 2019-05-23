import * as TYPES from './types'

const initialState = {
  events: [],
  currentEvent: {},
  currentEventIsLoading: true
}

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_EVENTS_BY_PLACE:
      return {...state, events: action.payload.events}
    case TYPES.GET_EVENT_BY_ID:
      return {...state, currentEvent: action.payload.currentEvent}
    case TYPES.EVENT_IS_LOADING:
      return {...state, currentEventIsLoading: action.payload}
    default:
      return {...state}
  }
}

export default eventsReducer
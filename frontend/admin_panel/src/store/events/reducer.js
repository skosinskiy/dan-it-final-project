import * as TYPES from './types'

const initialState = {
  eventList: [],
  totalElements: 0,
  isEventDataLoading: false,
  isEventFormDataLoading: false,
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_EVENTS_BY_PLACE_ID:
    case TYPES.GET_ALL_EVENTS:
      return {
        ...state,
        eventList: action.payload.eventList,
        totalElements: action.payload.eventList.length
      }
    case TYPES.EVENT_FORM_DATA_IS_LOADING:
      return {
        ...state,
        isEventFormDataLoading: action.payload.isLoading
      }
    case TYPES.EVENT_DATA_IS_LOADING:
      return {
        ...state,
        isEventDataLoading: action.payload.isLoading
      }
    default:
      return state
  }
}

export default eventReducer

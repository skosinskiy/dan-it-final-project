import * as TYPES from './types'

const initialState = {
  eventList: [],
  totalElements: 0,
  isEventDataLoading: false,
  isEventFormDataLoading: false,
  page: 0,
  size: 5,
  searchParam: ''
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_ALL_EVENTS:
      return {
        ...state,
        eventList: action.payload.content,
        totalElements: action.payload.totalElements,
        page: action.payload.pageable.pageNumber,
        size: action.payload.pageable.pageSize
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
    case TYPES.SET_EVENT_SEARCH_PARAM:
      return {
        ...state,
        searchParam: action.payload
      }
    default:
      return state
  }
}

export default eventReducer

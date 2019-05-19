import * as TYPES from './types'

export const isEventFormDataLoading = (isLoading) => ({
  type: TYPES.EVENT_FORM_DATA_IS_LOADING,
    payload: {isLoading}
})

export const isEventDataLoading = (isLoading) => ({
  type: TYPES.EVENT_DATA_IS_LOADING,
  payload: {isLoading}
})

export const getAllEvents = (res) => ({
  type: TYPES.GET_ALL_EVENTS,
  payload: res
})

export const setSearchParam = (param) => ({
  type: TYPES.SET_EVENT_SEARCH_PARAM,
  payload: param
})

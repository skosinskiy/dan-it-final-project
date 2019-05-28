import * as TYPES from './types'

export const getAllPlaces = (res) => ({
  type: TYPES.GET_ALL_PLACES,
  payload: res
})

export const isPlacesLoading = isLoading => ({
  type: TYPES.IS_PLACES_LOADING,
  payload: isLoading
})

export const isPlaceFormDataLoading = isLoading => ({
  type: TYPES.IS_PLACE_FORM_DATA_LOADING,
  payload: isLoading
})

export const setSearchParam = (param) => ({
  type: TYPES.SET_PLACE_SEARCH_PARAM,
  payload: param
})



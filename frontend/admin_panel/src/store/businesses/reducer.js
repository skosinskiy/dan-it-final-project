import * as TYPES from './types'

const initialState = {
  businessList: [],

  businessListByTitle: [],
  changedBusinessList: [],
  page: 0,
  size: 5,
  totalElements: 0,

  isBusinessesLoading: false,
  isBusinessFormDataLoading: false,
  error: null,
  searchParam: ''
}

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_BUSINESSES_BY_PLACE_ID:
      return {
        ...state,
        businessList: action.payload.businessList,
        totalElements: action.payload.businessList.length
      }
    case TYPES.GET_ALL_BUSINESSES:
      return {
        ...state,
        businessList: action.payload.content,
        totalElements: action.payload.totalElements,
        page: action.payload.pageable.pageNumber,
        size: action.payload.pageable.pageSize
      }
    case TYPES.IS_BUSINESSES_LOADING:
      return {
        ...state,
        isBusinessesLoading: action.payload

      }
    case TYPES.IS_BUSINESS_FORM_DATA_LOADING:
      return {
        ...state,
        isBusinessFormDataLoading: action.payload
      }
    case TYPES.SET_SEARCH_PARAM:
      console.log(action.payload)
      return {
        ...state,
        searchParam: action.payload
      }
    default:
      return state
  }
}

export default businessReducer

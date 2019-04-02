import * as TYPES from './types'

const initialState = {
  businesses: null,
  title: '',

  businessListByTitle: [],
  changedBusinessList: [],
  page: 0,
  totalElements: 0,

  isLoaded: false,
  isLoading: false,
  error: null
}

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case '':
      return
    default:
      return 'hey'
  }
}

export default businessReducer

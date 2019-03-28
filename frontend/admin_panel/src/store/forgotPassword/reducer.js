import * as TYPES from './types'

const initialState = {
  isFormSubmitted: false,
  isLoading: false,
  error: null
}

const forgotPassword = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SUBMIT_FORM_REQUEST:
      return {
        ...state,
        isLoading: initialState.isLoading,
        isFormSubmitted: initialState.isFormSubmitted,
        error: initialState.error
      }
    case TYPES.SUBMIT_FORM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isFormSubmitted: true
      }
    case TYPES.SUBMIT_FORM_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    default:
      return {...state}
  }
}

export default forgotPassword

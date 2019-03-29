import * as TYPES from './types'

const initialState = {
  isFormSubmitted: false,
  isLoading: false,
  error: null,
  arePasswordsDifferent: false
}

const resetPassword = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SUBMIT_FORM_REQUEST:
      return {
        ...state,
        isFormSubmitted: initialState.isFormSubmitted,
        isLoading: initialState.isLoading,
        error: initialState.error,
        arePasswordsDifferent: initialState.arePasswordsDifferent
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
    case TYPES.PASSWORDS_ARE_DIFFERENT:
      return {
        ...state,
        arePasswordsDifferent: true
      }
    default:
      return {...state}
  }
}

export default resetPassword

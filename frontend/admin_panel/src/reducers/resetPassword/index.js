import Actions from '../../actions/Actions'

const initialState = {
  isFormSubmitted: false,
  isLoading: false,
  arePasswordsDifferent: false
}

export const resetPassword = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ResetPassword.SUBMIT_FORM:
      return {...state, isFormSubmitted: action.payload.isFormSubmitted, isLoading: action.payload.isLoading}
    case Actions.ResetPassword.SUBMIT_FORM_STARTED:
      return {...state, isLoading: action.payload.isLoading}
    case Actions.ResetPassword.PASSWORDS_ARE_DIFFERENT:
      return {...state, arePasswordsDifferent: action.payload.arePasswordsDifferent}
    default:
      return {...state}
  }
}

import Actions from '../../actions/Actions'

const initialState = {
  isFormSubmitted: false,
  isLoading: false
}

export const forgotPassword = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ForgotPassword.SUBMIT_FORM:
      return {...state, isFormSubmitted: action.payload.isFormSubmitted, isLoading: action.payload.isLoading}
    case Actions.ForgotPassword.SUBMIT_FORM_STARTED:
      return {...state, isLoading: action.payload.isLoading}
    default:
      return {...state}
  }
}

import api from '../../components/FetchData'
import Actions from '../Actions'

export const submitForgotPasswordForm = (event) => dispatch => {
  event.preventDefault()
  dispatch({type: Actions.ForgotPassword.SUBMIT_FORM_STARTED, payload: {isLoading: true}})
  const data = new FormData(event.target)
  api.put('/api/users/forgot-password/token', data).then(() => {
    dispatch({type: Actions.ForgotPassword.SUBMIT_FORM,
      payload: {
        isFormSubmitted: true,
        isLoading: false
      }})
  })
}
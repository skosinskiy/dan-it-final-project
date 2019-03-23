import api from '../../components/FetchData'
import Actions from '../Actions'

export const submitResetPasswordForm = (event) => dispatch => {
  event.preventDefault()
  const data = getFormDataAsObject(new FormData(event.target))

  if (data.password === data.passwordConfirmation) {
    dispatch({type: Actions.ResetPassword.SUBMIT_FORM_STARTED, payload: {isLoading: true}})
    api.put('/api/users/forgot-password/update', JSON.stringify(data)).then(() => {
      dispatch({
        type: Actions.ResetPassword.SUBMIT_FORM,
        payload: {
          isFormSubmitted: true,
          isLoading: false
        }
      })
    })
  } else {
    dispatch({type: Actions.ResetPassword.PASSWORDS_ARE_DIFFERENT, payload: {arePasswordsDifferent: true}})
  }
}

const getFormDataAsObject = formData => {
  const data = {}
  formData.forEach((value, key) => {
    data[key] = value
  })
  return data
}

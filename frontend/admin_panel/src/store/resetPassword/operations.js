import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const submitResetPasswordForm = (event) => dispatch => {
  event.preventDefault()
  const data = getFormDataAsObject(new FormData(event.target))

  if (data.password === data.passwordConfirmation) {
    dispatch(ACTIONS.submitFormRequest())

    api.put('/api/users/forgot-password/update', JSON.stringify(data)).then(() => {
      dispatch(ACTIONS.submitFormSuccess())
    }).catch(err => {
      dispatch(ACTIONS.submitFormError(err))
    })

  } else {
    dispatch(ACTIONS.passwordsAreDifferent())
  }
}

const getFormDataAsObject = formData => {
  const data = {}
  formData.forEach((value, key) => {
    data[key] = value
  })
  return data
}

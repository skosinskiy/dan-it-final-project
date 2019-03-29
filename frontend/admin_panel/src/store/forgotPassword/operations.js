import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const submitForgotPasswordForm = (event) => dispatch => {
  event.preventDefault()
  dispatch(ACTIONS.submitFormRequest())
  const data = new FormData(event.target)
  api.put('/api/users/forgot-password/token', data).then(() => {
    dispatch(ACTIONS.submitFormSuccess())
  }).catch(err => {
    dispatch(ACTIONS.submitFormError(err))
  })
}

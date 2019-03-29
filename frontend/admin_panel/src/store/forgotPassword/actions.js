import * as TYPES from './types'

export const submitFormRequest = () => ({
  type: TYPES.SUBMIT_FORM_REQUEST
})

export const submitFormSuccess = () => ({
  type: TYPES.SUBMIT_FORM_SUCCESS
})

export const submitFormError = (err) => ({
  type: TYPES.SUBMIT_FORM_ERROR,
  payload: err
})

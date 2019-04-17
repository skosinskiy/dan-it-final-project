import * as TYPES from './types'

export const updateSelectedKey = selectedKey => ({
  type: TYPES.UPDATE_SELECTED_KEY,
  payload: selectedKey
})
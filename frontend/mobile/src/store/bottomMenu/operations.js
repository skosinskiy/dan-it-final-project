import * as ACTIONS from './actions'

export const updateSelectedKey = (selectedKey) => dispatch => {
  dispatch(ACTIONS.updateSelectedKey(selectedKey))
}
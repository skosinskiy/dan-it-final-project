import axios from 'axios'
import {UserActions} from './index'

export const getCurrentUser = () => dispatch => {
  dispatch({type: UserActions.CURRENT_USER_LOADED, payload: true})
  axios('/api/users/current')
    .then(res => res.data)
    .then(user => {
      dispatch({type: UserActions.CURRENT_USER_FETCHED, user})
      dispatch({type: UserActions.CURRENT_USER_LOADED, payload: false})
    })
}
import axios from 'axios'
import {UserActions} from './index'

const getCurrentUser = () => dispatch => {
  dispatch({type: UserActions.CURRENT_USER_LOADING, payload: {loading: true}})
  axios('/api/users/current')
    .then(res => res.data)
    .then(user => {
      dispatch({type: UserActions.CURRENT_USER_FETCHED, payload: {currentUser: user}})
      dispatch({type: UserActions.CURRENT_USER_LOADING, payload: {loading: false}})
    })
    .catch(err => console.error(err))
}

export default getCurrentUser
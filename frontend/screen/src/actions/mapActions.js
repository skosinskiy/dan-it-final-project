import Actions from './actionTypes'
import api from '../helpers/api'
import {MAP_URL} from '../helpers/constants'

export const loadMap = () => dispatch => {
  dispatch({type: Actions.MAP_LOADING, payload: true})
  api.get(MAP_URL)
    .finally(() => dispatch({type: Actions.MAP_LOADING, payload: false}))
}
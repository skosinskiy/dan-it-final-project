import api from '../../helpers/FetchData/index'
import * as ACTIONS from './actions'

export const getEventsByPLace = (placeId) => dispatch => {
  api.get(`/api/events?placeId=${placeId}`).then(res => {
    dispatch(ACTIONS.getEventsByPlace({events: res.content}))
  })
}
import api from '../../helpers/FetchData'
import * as ACTIONS from './actions'

export const getBusinessesByPlaceID = (placeId, page, size) => dispatch => {
  //dispatch(ACTIONS.getBusinessesRequest())

  api.get(`/api/businesses?placeId=${placeId}&page=${page}&size=${size}`).then(res => {
    console.log(res)
    dispatch(ACTIONS.getBusinessesByPlaceID({businesses: res}))
  }).catch(err => {
    dispatch(ACTIONS.getBusinessesError(err))
  })
}

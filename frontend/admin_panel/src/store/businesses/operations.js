import api from '../../helpers/FetchData'
import * as ACTIONS from './actions'

export const getAllBusinesses = () => dispatch => {
  // dispatch(ACTIONS.getBusinessesRequest())
  api.get(`/api/businesses`).then(res => {
    console.log(res)
    dispatch(ACTIONS.getAllBusinesses({businessList: res}))
  }).catch(err => {
    dispatch(ACTIONS.getBusinessesError(err))
  })
}

export const getBusinessesByPlaceID = (placeId) => dispatch => {
  // dispatch(ACTIONS.getBusinessesRequest())
  api.get(`/api/businesses?placeId=${placeId}`).then(res => {
    dispatch(ACTIONS.getBusinessesByPlaceID({businessList: res}))
  }).catch(err => {
    dispatch(ACTIONS.getBusinessesError(err))
  })
}

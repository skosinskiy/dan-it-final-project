import api from '../../helpers/FetchData'
import * as ACTIONS from './actions'

export const getBusinessesByTitle = (placeId, page, size) => dispatch => {
  //dispatch(ACTIONS.getBusinessesRequest())

  api.get(`/api/businesses?placeId=${placeId}&page=${page}&size=${size}`).then(res => {
    console.log(res)
    dispatch(ACTIONS.getBusinessesByTitle({
      businesses: res
      /*business: res.content,
      page: res.pageable.pageNumber,
      totalElements: res.totalElements,
      title: placeId*/
    }))
  }).catch(err => {
    dispatch(ACTIONS.getBusinessesError(err))
  })
}

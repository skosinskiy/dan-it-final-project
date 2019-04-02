import api from '../../helpers/FetchData'
import * as ACTIONS from './actions'

export const getUsersByEmail = (title, page, size) => dispatch => {
  dispatch(ACTIONS.getBusinessesRequest())

  api.get(`/api/businesses?title=${title}&page=${page}&size=${size}`).then(res => {
    dispatch(ACTIONS.getBusinessesByTitle({
      business: res.content,
      page: res.pageable.pageNumber,
      totalElements: res.totalElements,
      title: title
    }))
  }).catch(err => {
    dispatch(ACTIONS.getBusinessesError(err))
  })
}

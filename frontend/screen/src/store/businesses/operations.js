import api from '../../helpers/FetchData/'
import * as ACTIONS from './actions'
import { businessesLoading } from './actions'

export const getAllBusinesses = () => dispatch => {
  api.get(`/api/businesses`).then(res => {
    dispatch(ACTIONS.getAllBusinesses({businessList: res}))
  }).catch(err => {
    dispatch(ACTIONS.getBusinessesError(err))
  })
}
export const getBusinessByAmount = (amount) => dispatch => {
  dispatch(businessesLoading(true))
  api.get(`/api/businesses`).then(res => {
    dispatch(ACTIONS.getBusinessByAmount({
      businessList: res.content.filter((item, index) => index <= amount - 1),
      totalItems: res.totalElements,
      currentItems: amount
    }))
  }).catch(err => {
    dispatch(ACTIONS.getBusinessesError(err))
  })
    .finally(() => dispatch(businessesLoading(false)))
}

export const getBusinessById = (id) => dispatch => {
  api.get(`/api/businesses/${id}`).then(res => {
    dispatch(ACTIONS.getBusinessesByID({businessItem: res}))
  }).catch(err => {
    dispatch(ACTIONS.getBusinessesError(err))
  })
}

export const getBusinessesByPlaceID = (placeId) => dispatch => {
  api.get(`/api/businesses?placeId=${placeId}`).then(res => {
    dispatch(ACTIONS.getBusinessesByPlaceID({businessList: res}))
  }).catch(err => {
    dispatch(ACTIONS.getBusinessesError(err))
  })
}

export const getBusinessesByTitle = (title) => dispatch => {
  api.get(`/api/businesses?title=${title}`).then(res => {
    dispatch(ACTIONS.getAllBusinesses({businessList: res}))
  }).catch(err => {
    dispatch(ACTIONS.getBusinessesError(err))
  })
}

export const deleteBusiness = (businessId) => dispatch => {
  api.deleteApi(`/api/businesses/${businessId}`).then(res => {
    api.get(`/api/businesses`).then(res => {
      dispatch(ACTIONS.getAllBusinesses({businessList: res}))
    }).catch(err => {
      dispatch(ACTIONS.getBusinessesError(err))
    })
  })
}

export const saveNewBusiness = (business) => dispatch => {
  api.post(`/api/businesses`, business).then(res => {
    api.get(`/api/businesses`).then(res => {
      dispatch(ACTIONS.getAllBusinesses({businessList: res}))
    })
  })
}

export const getAllBusinessesByCategory = (categoryId) => dispatch => {
  api.get(`/api/businesses`).then(res => {
    let businesses = []
    res.content.forEach(business => {
      business.categories.forEach(category => {
        if (category.id === categoryId) {
          businesses.push(business)
        }
      })
    })
    dispatch(ACTIONS.getAllBusinessesByCategory({businesses}))
  }).catch(err => {
    dispatch(ACTIONS.getBusinessesError(err))
  })
}

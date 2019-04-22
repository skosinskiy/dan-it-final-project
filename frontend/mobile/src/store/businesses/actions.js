import * as TYPES from './types'

export const getBusinessesByCategory = (business) => ({
    type: TYPES.GET_BUSINESSES_BY_CATEGORY,
    payload: business
})
import * as TYPES from './types'

export const isLoading = isLoading => ({
  type: TYPES.IS_LOADING,
  payload: isLoading
})

export const createData = placePategories => ({
  type: TYPES.CREATE_DATA,
  payload: placePategories
})

export const updateSelected = placePategories => ({
  type: TYPES.UPDATE_SELECTED,
  payload: placePategories
})

export const updateOrder = order => ({
  type: TYPES.UPDATE_ORDER,
  payload: order
})

export const updateOrderBy = orderBy => ({
  type: TYPES.UPDATE_ORDER_BY,
  payload: orderBy
})

export const updatePage = page => ({
  type: TYPES.UPDATE_PAGE,
  payload: page
})

export const updateRowsPerPafe = rowsPerPage => ({
  type: TYPES.UPDATE_ROWS_PER_PAGE,
  payload: rowsPerPage
})
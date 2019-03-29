import * as TYPES from './types'

export const getAllBuildings = (buildings) => ({
  type: TYPES.GET_ALL_BUILDINGS,
  payload: {buildings}
})

export const getBuildingsCategories = (buildingCategories) => ({
  type: TYPES.GET_BUILDINGS_CATEGORIES,
  payload: {buildingCategories}
})

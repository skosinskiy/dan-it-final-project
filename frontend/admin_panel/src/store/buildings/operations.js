import api from 'helpers/FetchData'
import * as ACTIONS from './actions'

export const getBuildings = () => dispatch => {
  api.get(`/api/buildings`).then(res => {
    dispatch(ACTIONS.getAllBuildings(res))
  })
}

export const saveNewBuilding = (building) => dispatch => {
  api.post(`/api/buildings`, building).then(res => {
    api.get(`/api/buildings`).then(res => {
      dispatch(ACTIONS.getAllBuildings(res))
    })
  })
}

export const deleteBuilding = (buildingId) => dispatch => {
  api.deleteApi(`/api/buildings/${buildingId}`).then(res => {
    api.get(`/api/buildings`).then(res => {
      dispatch(ACTIONS.getAllBuildings(res))
    })
  })
}

export const updateBuilding = (buildingId, building) => dispatch => {
  api.put(`/api/buildings/${buildingId}`, building).then(res => {
    api.get(`/api/buildings`).then(res => {
      dispatch(ACTIONS.getAllBuildings(res))
    })
  })
}

export const getBuildingsCategories = () => dispatch => {
  api.get(`/api/building-categories`).then(res => {
    dispatch(ACTIONS.getBuildingsCategories(res))
  })
}

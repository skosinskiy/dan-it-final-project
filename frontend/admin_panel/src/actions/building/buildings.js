import api from '../../components/FetchData/index'
import Actions from '../Actions'

export const getBuildings = () => dispatch => {
  api.get(`/api/buildings`).then(res => {
    dispatch({type: Actions.Building.GET_ALL_BUILDINGS, payload: {buildings: res}})
  })
}

export const saveNewBuilding = (building) => dispatch => {
  api.post(`/api/buildings`, building).then(res => {
    api.get(`/api/buildings`).then(res => {
      dispatch({type: Actions.Building.GET_ALL_BUILDINGS, payload: {buildings: res}})
    })
  })
}

export const getBuildingsCategories = () => dispatch => {
  api.get(`/api/building-categories`).then(res => {
    dispatch({type: Actions.Building.GET_BUILDINGS_CATEGORIES, payload: {buildingCategories: res}})
  })
}

export const deleteBuilding = (buildingId) => dispatch => {
  api.deleteApi(`/api/buildings/${buildingId}`).then(res => {
    api.get(`/api/buildings`).then(res => {
      dispatch({type: Actions.Building.GET_ALL_BUILDINGS, payload: {buildings: res}})
    })
  })
}

export const updateBuilding = (buildingId, building) => dispatch => {
  api.put(`/api/buildings/${buildingId}`, building).then(res => {
    api.get(`/api/buildings`).then(res => {
      dispatch({type: Actions.Building.GET_ALL_BUILDINGS, payload: {buildings: res}})
    })
  })
}

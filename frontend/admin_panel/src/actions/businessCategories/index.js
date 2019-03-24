import api from '../../components/FetchData'
import Actions from '../Actions'

export const getAllBusinessCategories = () => dispatch => {
  api.get('/api/business-categories').then(
    res => dispatch({type: Actions.BusinessCategory.GET_ALL_CATEGORIES, payload: res})
  )
}

export const handleChange = event => dispatch => {
  dispatch({type: Actions.BusinessCategory.GET_ALL_CATEGORIES, payload: event.target.value})
}

export const handleSubmit = event => dispatch => {
  api.post('/api/business-categories', data)
}

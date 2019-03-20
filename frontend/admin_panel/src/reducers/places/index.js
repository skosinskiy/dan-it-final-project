import PlaceActions from '../../actions/ActionTypes/PlaceActions'

const initialState = {
  places: []
}

function index (state = initialState, action) {
  switch (action.type) {
    case PlaceActions.GET_ALL_PLACES:
      return {...state, places: action.payload.places}
    default:
      return {...state}
  }
}

export default index
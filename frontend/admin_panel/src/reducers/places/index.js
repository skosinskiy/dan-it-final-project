import PlaceActions from '../../actions/ActionTypes/PlaceActions'

const initialState = {
  places: [],
  placeCategories: []
}

function places (state = initialState, action) {
  switch (action.type) {
    case PlaceActions.GET_ALL_PLACES:
      return {...state, places: action.payload.places}
    case PlaceActions.GET_PLACES_CATEGORIES:
      return {...state, placeCategories: action.payload.placeCategories}
    case PlaceActions.ADD_NEW_PLACE:
      const updatedPlaces = state.places.push(action.payload.newPlace)
      return {...state, places: [...updatedPlaces]}
    default:
      return {...state}
  }
}

export default places
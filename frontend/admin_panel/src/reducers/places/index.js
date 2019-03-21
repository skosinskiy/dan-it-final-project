import Actions from '../../actions/Actions'

const initialState = {
  places: [],
  placeCategories: []
}

function places (state = initialState, action) {
  switch (action.type) {
    case Actions.Place.GET_ALL_PLACES:
      return {...state, places: [...action.payload.places]}
    case Actions.Place.GET_PLACES_CATEGORIES:
      return {...state, placeCategories: [...action.payload.placeCategories]}
    case Actions.Place.GET_PLACE_BY_ID:
      return {...state, currentPlaceById: {...action.payload.placeById}}
    default:
      return {...state}
  }
}

export default places
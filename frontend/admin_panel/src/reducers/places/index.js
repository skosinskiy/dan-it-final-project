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
    default:
      return {...state}
  }
}

export default places
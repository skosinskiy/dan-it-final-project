import * as TYPES from '../../actions/events/types'

const initialState = {
  events: []
}

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GET_EVENTS_BY_PLACE:
      return {...state, events: action.payload.events}
    default:
      return {...state}
  }
}

export default eventsReducer
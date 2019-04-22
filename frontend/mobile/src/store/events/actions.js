import * as TYPES from './types'

export const getEventsByPlace = (events) => ({
    type: TYPES.GET_EVENTS_BY_PLACE,
    payload: events
})
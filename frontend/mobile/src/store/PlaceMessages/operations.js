import api from '../../helpers/FetchData'

export function postPlaceMessage (message, placeId, context) {
  api.post(`/api/place-messages/place/${placeId}`, { message: message }).then(() => {
    getPlaceMessagesByPlaceId.call(context, placeId)
  })
}

export function getPlaceMessagesByPlaceId (placeId) {
  return api.get(`/api/place-messages?placeId=${placeId}`).then(res => {
    this.setState({placeMessages: res.reverse()})
  })
}

export function deletePlaceMessageById (id, placeId, context) {
  api.deleteApi(`/api/place-messages/${id}`).then(() => {
    getPlaceMessagesByPlaceId.call(context, placeId)
  })
}

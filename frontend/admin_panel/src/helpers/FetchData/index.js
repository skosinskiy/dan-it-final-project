import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'

const METHOD_GET = 'get'
const METHOD_POST = 'post'
const METHOD_PUT = 'put'
const METHOD_DELETE = 'delete'

export class FetchData {
  get (url, requestParams) {
    return this.makeRequest(url, METHOD_GET, null, requestParams)
  }

  post (url, body, requestParams) {
    return this.makeRequest(url, METHOD_POST, body, requestParams)
  }

  put (url, body, requestParams) {
    return this.makeRequest(url, METHOD_PUT, body, requestParams)
  }

  deleteApi (url, requestParams) {
    return this.makeRequest(url, METHOD_DELETE, null, requestParams)
  }

  makeRequest (url, method, body, reqParams) {
    const requestParams = {
      method: method || METHOD_GET,
      data: body,
      params: {
        ...(reqParams || {})
      }
    }

    if (method === METHOD_POST || method === METHOD_PUT) {
      requestParams.headers = {
        'Content-Type': 'application/json'
      }
    }

    return this.sendRequest(url, requestParams)
  }

  sendRequest (url, requestParams) {
    return new Promise((resolve, reject) => {
      axios(url, requestParams)
        .then(result => resolve(result.data))
        .catch(reason => {
          this.requestFailed(reason)
          reject(reason)
        })
    })
  }

  requestFailed (reason) {
    if (reason.message) {
      toastr.error(reason.message, reason.response && reason.response.data && reason.response.data.message)
    } else {
      toastr.error('Error', 'An error has occurred')
    }
  }
}

const api = new FetchData()

export default api

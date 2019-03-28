const Actions = {
  Users: {
    GET_USERS_BY_EMAIL: 'GET_USERS_BY_EMAIL',
    SET_USER_ROLES: 'SET_USER_ROLES',
    GET_ROLES_LIST: 'GET_ROLES_LIST',
    AUTHENTICATE_USER: 'AUTHENTICATE_USER',
    CURRENT_USER_FETCHED: 'CURRENT_USER_FETCHED',
    CURRENT_USER_LOADING: 'CURRENT_USER_LOADING',
    CHANGE_PAGINATION_PAGE: 'CHANGE_PAGINATION_PAGE'
  },

  ForgotPassword: {
    SUBMIT_FORM: 'SUBMIT_FORM',
    SUBMIT_FORM_STARTED: 'SUBMIT_FORM_STARTED'
  },

  ResetPassword: {
    SUBMIT_FORM: 'SUBMIT_FORM',
    SUBMIT_FORM_STARTED: 'SUBMIT_FORM_STARTED',
    PASSWORDS_ARE_DIFFERENT: 'PASSWORDS_ARE_DIFFERENT'
  },

  Place: {
    GET_ALL_PLACES: 'GET_ALL_PLACES',
    GET_PLACES_CATEGORIES: 'GET_PLACES_CATEGORIES,',
    GET_PLACE_BY_ID: 'GET_PLACE_BY_ID'
  },

  BusinessCategory: {
    GET_ALL_CATEGORIES: 'GET_ALL_CATEGORIES'
  }
}

export default Actions
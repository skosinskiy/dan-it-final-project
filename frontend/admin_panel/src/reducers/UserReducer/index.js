const initialState = {
  currentUser: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER': return {
      currentUser: action.fetchCurrentUser()
    }
    default: return state
  }
}

export default reducer
import Actions from './actionTypes'

export const toggleMenu = () => dispatch => {
  dispatch({type: Actions.MENU_TOGGLE})
}
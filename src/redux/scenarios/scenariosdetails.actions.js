import { SET_OPENED_SCENARIOS_DATA } from './scenariosdetails.types'

export function scenariosDetails(data) {
    return dispatch => {
      return dispatch({
        type: SET_OPENED_SCENARIOS_DATA,
        payload: data
      });
    };
  }
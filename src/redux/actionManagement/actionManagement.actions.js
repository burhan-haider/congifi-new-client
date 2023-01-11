import {
    SET_SELECTED_ACTIONCODE_DATA,
} from './actionManagement.types';

export function getCWFCases(data) {
    return dispatch => {
      //console.log("data in action payload = ", data);
      return dispatch({
        type: SET_SELECTED_ACTIONCODE_DATA,
        payload: data
      });
    };
  }
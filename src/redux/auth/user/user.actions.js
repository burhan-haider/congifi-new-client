import AuthService from "services/auth/authService";
import authService from "services/auth/authService";
import history from "services/history";

import {
  SET_GUEST_USER_DATA,
  SET_USER_DATA,
  USER_LOGGED_OUT,
  RESET_STATE_AFTER_LOGOUT,
  FETCH_ALL_LABELS
} from "./user.types";

export function setUserData(user) {
  return (dispatch) => {
    dispatch({
      type: SET_USER_DATA,
      payload: user,
    });
  };
}

export function setGuestUserRole() {
  return (dispatch) => {
    dispatch({
      type: SET_GUEST_USER_DATA,
    });
  };
}

export function logoutUser() {
  return (dispatch) => {
    AuthService.logout();
    dispatch(resetStoreAfterLogOut());
    document.title = "Cognifi";
    history.push({
      pathname: "/login",
    });

    dispatch({
      type: USER_LOGGED_OUT,
    });
  };
}

export function getDesiredLabels(lang, direction) {
  //console.log("user auth = ",lang+"---"+direction);
  return (dispatch) => {
    AuthService.fetchAllLabels(lang, direction).then((data) => {
      //Here user data also must be updated
      authService.signInWithToken().then((data) => {
        dispatch(setUserData(data));
      });
      return dispatch({
        type: FETCH_ALL_LABELS,
        payload: data,
      });
    });
  };
}

export const resetStoreAfterLogOut = () => {
  return {
    type: RESET_STATE_AFTER_LOGOUT,
  };
};

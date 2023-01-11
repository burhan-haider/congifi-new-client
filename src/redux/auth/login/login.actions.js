import authService from "services/auth/authService";
// import login from "../reducer/loginReducer";
import { setUserData } from "redux/auth/user/user.actions";

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from './login.types'

export function submitLogin({ userName, userPassword }, loadingHandler) {
  return (dispatch) =>
    authService
      .signIn(userName, userPassword)
      .then((response) => {
        if (loadingHandler === null) {
          authService
            .signInWithToken()
            .then((user) => {
              dispatch(setUserData(user));
              return dispatch({
                type: LOGIN_SUCCESS,
              });
            })
            .catch((error) => {
              return dispatch({
                type: LOGIN_ERROR,
                payload: error,
              });
            });
        } else {
          loadingHandler(true);
        }
      })
      .catch((error) => {
        return dispatch({
          type: LOGIN_ERROR,
          payload: error,
        });
      });
}

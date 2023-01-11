import { RESET_STATE_AFTER_LOGOUT } from "../user/user.types";
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
} from "./login.types";

const initialState = {
  success: false
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        success: true
      };
    }
    case LOGIN_ERROR: {
      return {
        success: false,
        error: action.payload
      };
    }
    case RESET_STATE_AFTER_LOGOUT:{
      return {
        success: false
      }
    }
    default: {
      return state;
    }
  }
};

export default login;

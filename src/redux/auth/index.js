import { combineReducers } from "redux";
import login from "./login/login.reducer";
import user from "./user/user.reducer";

const authReducers = combineReducers({
  login,
  user
});

export default authReducers;

import { combineReducers } from "redux";
import actionManagementData from "./actionManagement.reducer";

const commonReducers = combineReducers({
  actionManagementData
});
export default commonReducers;

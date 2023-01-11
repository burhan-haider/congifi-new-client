import { combineReducers } from "redux";
import scenarios from "./scenariosdetails.reducer";

const commonReducers = combineReducers({ scenarios });
export default commonReducers;
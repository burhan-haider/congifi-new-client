import { combineReducers } from "redux";
import reports from "./reportsdetails.reducer";

const commonReducers = combineReducers({ reports });
export default commonReducers;
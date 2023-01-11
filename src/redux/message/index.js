import { combineReducers } from "redux";
import genericMessage from "./message.reducer";

const commonReducers = combineReducers({ genericMessage });
export default commonReducers;
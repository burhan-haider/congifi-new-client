import { combineReducers } from "redux";
import featuresReducer from 'redux/features';
import authReducer from "./auth";
import message from "./message";
import caseWorkflow from "./caseWorkflow";
import actionMaster from './actionManagement';
import scenarios from './scenarios'
import reports from "./reports";


const rootReducer = combineReducers({
    features: featuresReducer,
    auth: authReducer,
    message: message,
    caseWorkflow: caseWorkflow,
    actionMaster: actionMaster,
    scenarios: scenarios,
    reports: reports,
});

export default rootReducer;
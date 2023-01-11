import { combineReducers } from "redux";
import features from './features.reducer';

const featuresReducer = combineReducers({
    features
});

export default featuresReducer;
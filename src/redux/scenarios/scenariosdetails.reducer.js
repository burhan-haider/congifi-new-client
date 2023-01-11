import { SET_OPENED_SCENARIOS_DATA } from "redux/scenarios/scenariosdetails.types";
import { RESET_STATE_AFTER_LOGOUT } from "redux/auth/user/user.types";
const initialState = {
  openedScenarioDetails: {}
  // openedScenarioId: "",
  // openedScenarioName: ""
};
const scenariosDetails = function(state = initialState, action) {
  switch (action.type) {
    case SET_OPENED_SCENARIOS_DATA: {
      return {
        ...state,
        openedScenarioDetails: {
          openedModule: action.payload.moduleName,
          openedScenarioId: action.payload.row[0],
          openedScenarioName: action.payload.row[1]
        }
      };
    }
    case RESET_STATE_AFTER_LOGOUT: {
      return {
        openedScenarioDetails: {}
      };
    }
    default: {
      return state;
    }
  }
};
export default scenariosDetails;
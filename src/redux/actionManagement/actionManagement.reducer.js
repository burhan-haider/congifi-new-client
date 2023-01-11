import {
    SET_SELECTED_ACTIONCODE_DATA
} from './actionManagement.types'

const initialState = {
  selectedActionCode: {}
};

const actionManagementData = function(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_ACTIONCODE_DATA: {
      return {
        ...state,
        selectedActionCode: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default actionManagementData;

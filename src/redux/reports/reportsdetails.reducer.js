import { RESET_STATE_AFTER_LOGOUT } from 'redux/auth/user/user.types';
import { SET_OPENED_REPORTS_DATA } from './reportsdetails.types'


const initialState = {
  openedReportDetails: {}
  // openedReportId: "",
  // openedReportName: ""
};

const reportsDetails = function(state = initialState, action) {
  switch (action.type) {
    case SET_OPENED_REPORTS_DATA: {
      return {
        ...state,
        openedReportDetails: {
          openedModule: action.payload.moduleName,
          openedReportId: action.payload.row[0],
          openedReportName: action.payload.row[1]
        }
      };
    }
    case RESET_STATE_AFTER_LOGOUT:{
      return {
        openedReportDetails: {}
      };
    }
    default: {
      return state;
    }
  }
};

export default reportsDetails;

import { SET_CWF_SEARCH_DATA, SET_CWF_FILE_UPLOAD_RESPONSE } from './cwfbottomframedata.types';

import { RESET_STATE_AFTER_LOGOUT } from 'redux/auth/user/user.types';

const initialState = {
    data: {},
    fileResponse: {},
  };
  
  const cwfBottomFrameData = function(state = initialState, action) {
    switch (action.type) {
      case SET_CWF_SEARCH_DATA: {
        return {
          ...state,
          data: action.payload
        };
      }
      case SET_CWF_FILE_UPLOAD_RESPONSE: {
        return {
          ...state,
          fileResponse: action.payload
        }
      }
      // add all initial states here
      case RESET_STATE_AFTER_LOGOUT: {
        return {
          data: {}
        };
      }
      default: {
        return state;
      }
    }
  };
  
  
  export default cwfBottomFrameData;
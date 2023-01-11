import { SET_CWF_SEARCH_DATA } from './cwfbottomframedata.types';

import { RESET_STATE_AFTER_LOGOUT } from 'redux/auth/user/user.types';

const initialState = {
    data: {}
  };
  
  const cwfBottomFrameData = function(state = initialState, action) {
    switch (action.type) {
      case SET_CWF_SEARCH_DATA: {
        return {
          ...state,
          data: action.payload
        };
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
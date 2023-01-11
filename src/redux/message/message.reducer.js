import {
    HIDE_MESSAGE,
    SHOW_MESSAGE,
} from './message.types';

import {RESET_STATE_AFTER_LOGOUT} from 'redux/auth/user/user.types';

const initialState = {
    state: null,
    options: {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center"
      },
      autoHideDuration: 6000,
      message: "Cognifi",
      variant: null
    }
  };
  
  const genericMessage = function(state = initialState, action) {
    switch (action.type) {
      case SHOW_MESSAGE: {
        return {
          state: true,
          options: {
            ...initialState.options,
            ...action.options
          }
        };
      }
      case HIDE_MESSAGE: {
        return {
          ...state,
          state: null
        };
      }
      case RESET_STATE_AFTER_LOGOUT: {
        return {
          state: null,
          options: {
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center"
            },
            autoHideDuration: 6000,
            message: "Cognifi",
            variant: null
          }
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default genericMessage;
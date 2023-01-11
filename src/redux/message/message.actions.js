import {
    HIDE_MESSAGE,
    SHOW_MESSAGE
} from './message.types'

export const hideMessage = () => {
    return {
        type: HIDE_MESSAGE
    };
};
  
export const showMessage = options => {
    return {
        type: SHOW_MESSAGE,
        options
    };
};
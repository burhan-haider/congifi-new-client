import { SET_OPENED_REPORTS_DATA } from './reportsdetails.types'

export function reportsDetails(data) {
    return dispatch => {
        return dispatch({
            type: SET_OPENED_REPORTS_DATA,
            payload: data
        });
    };
}
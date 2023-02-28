import caseWorkflowWService from "services/caseWorkflow/caseWorkflowService";
import { SET_CWF_SEARCH_DATA, SET_CWF_FILE_UPLOAD_RESPONSE } from './cwfbottomframedata.types';

export function getCWFCases(data) {
    //const moduleType = data.moduleType;
    return dispatch =>
        caseWorkflowWService.fetchCWFCases(data).then(response => {
        //console.log("module = ", data.moduleType);
        return dispatch({
            type: SET_CWF_SEARCH_DATA,
            payload: response
        });
    });
}

export function setCWFFileResponse(response) {
    return dispatch => {
        return dispatch({
            type: SET_CWF_FILE_UPLOAD_RESPONSE,
            payload: response
        })
    }
}
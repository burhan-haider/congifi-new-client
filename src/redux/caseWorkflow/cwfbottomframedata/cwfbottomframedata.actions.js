import caseWorkflowWService from "services/caseWorkflow/caseWorkflowService";
import { SET_CWF_SEARCH_DATA } from './cwfbottomframedata.types';

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
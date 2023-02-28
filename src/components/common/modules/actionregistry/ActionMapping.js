import {
   //approveCasesByLEVEL3,
 //  bonafideOkayByLEVEL1,
   escalateCasesByBranchManager1,
   referToBranchManager1ByLevel2,
   approveCaseByLEVEL1,
   rejectCaseByLEVEL1,
   getCWFCaseAndCommentsDetails,
   getFileUploadConfig,
   fileUploadConfig
} from "./CWFActions";

export const actionMapping = {
  //  approveCasesByLEVEL3: (data) => approveCasesByLEVEL3(data),
    escalateCasesByBranchManager1: (action, data, caseNo, userActionType) => escalateCasesByBranchManager1(action, data, caseNo, userActionType),
    referToBranchManager1ByLevel2: (action, data, caseNo, userActionType) => referToBranchManager1ByLevel2(action, data, caseNo, userActionType),
    approveCaseByLEVEL1: (action, data, caseNo, userActionType) => approveCaseByLEVEL1(action, data, caseNo, userActionType),
    rejectCaseByLEVEL1: (action, data, caseNo, userActionType) => rejectCaseByLEVEL1(action, data, caseNo, userActionType),
    getCWFCaseAndCommentsDetails: (action,caseNo, userActionType) => getCWFCaseAndCommentsDetails(action, caseNo, userActionType),
    getFileUploadConfig: (action,caseNo, userActionType) => getFileUploadConfig(action,caseNo, userActionType), 
    fileUploadConfig: (filesContent,caseNo) => fileUploadConfig(filesContent,caseNo) 
}
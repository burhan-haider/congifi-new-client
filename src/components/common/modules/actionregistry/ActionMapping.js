import {
  escalateCasesByBranchManager1,
  referToBranchManager1ByLevel2,
  approveCaseByLEVEL1,
  rejectCaseByLEVEL1,
  uploadPromise,
  getCWFCaseAndCommentsDetails,
  escalateCaseByLEVEL2,
  parkedCasesByLEVEL1,
  getFileUploadConfig,
  fileUploadConfig,
  closeCasesBYLEVEL1,
  sendEmailByLEVEL2,
  closeCaseByLevel3
} from "./CWFActions";

export const actionMapping = {
  escalateCasesByBranchManager1: (action, data, caseNo, userActionType) =>
  escalateCasesByBranchManager1(action, data, caseNo, userActionType),

  referToBranchManager1ByLevel2: (action, data, caseNo, userActionType) =>
  referToBranchManager1ByLevel2 (action, data, caseNo, userActionType),

  approveCaseByLEVEL1: (action, data, caseNo, userActionType) => 
  approveCaseByLEVEL1(action, data, caseNo, userActionType),

  rejectCaseByLEVEL1: (action, data, caseNo, userActionType) => 
  rejectCaseByLEVEL1(action, data, caseNo, userActionType),

  uploadPromise: (action, data, caseNo, userActionType) => 
  uploadPromise(action, data, caseNo, userActionType),

  getCWFCaseAndCommentsDetails: (action,caseNo, userActionType) => 
  getCWFCaseAndCommentsDetails(action, caseNo, userActionType),

  escalateCaseByLEVEL2: (action,data,caseNo,userActionType) =>
  escalateCaseByLEVEL2(action,data,caseNo,userActionType),

  parkedCasesByLEVEL1: (action,data,caseNo,userActionType) =>
  parkedCasesByLEVEL1(action,data,caseNo,userActionType),

  getFileUploadConfig: (action,caseNo, userActionType) => 
  getFileUploadConfig(action,caseNo, userActionType), 
  
  fileUploadConfig: (filesContent,caseNo) => 
  fileUploadConfig(filesContent,caseNo), 

  closeCasesBYLEVEL1: (action,data,caseNo,userActionType) =>
  closeCasesBYLEVEL1(action,data,caseNo,userActionType),

  sendEmailByLEVEL2: (formData) => 
  sendEmailByLEVEL2(formData),
  
  closeCaseByLevel3: (action, data, caseNo, userActionType) => 
  closeCaseByLevel3(action, data, caseNo, userActionType)
};

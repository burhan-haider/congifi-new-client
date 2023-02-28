import {
  escalateCasesByBranchManager1,
  referToBranchManager1ByLevel2,
  approveCaseByLEVEL1,
  rejectCaseByLEVEL1,
  uploadPromise,
  getCWFCaseAndCommentsDetails,
  escalateCaseByLEVEL2,
  parkedCasesByLEVEL1

} from "./CWFActions";

export const actionMapping = {
  escalateCasesByBranchManager1: (action, data, caseNo, userActionType) =>
  escalateCasesByBranchManager1(action, data, caseNo, userActionType),

  referToBranchManager1ByLevel2: (action, data, caseNo, userActionType) =>
  referToBranchManager1ByLevel2 (action, data, caseNo, userActionType),

  approveCaseByLEVEL1: (action, data, caseNo, userActionType) => approveCaseByLEVEL1(action, data, caseNo, userActionType),
  rejectCaseByLEVEL1: (action, data, caseNo, userActionType) => rejectCaseByLEVEL1(action, data, caseNo, userActionType),

  uploadPromise: (action, data, caseNo, userActionType) => uploadPromise(action, data, caseNo, userActionType),
  getCWFCaseAndCommentsDetails: (action,caseNo, userActionType) => getCWFCaseAndCommentsDetails(action, caseNo, userActionType),

  escalateCaseByLEVEL2: (action,data,caseNo,userActionType) =>
  escalateCaseByLEVEL2(action,data,caseNo,userActionType),

  parkedCasesByLEVEL1: (action,data,caseNo,userActionType) =>
  parkedCasesByLEVEL1(action,data,caseNo,userActionType)
};

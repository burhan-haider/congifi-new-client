import {
   approveCasesByLEVEL3,
   bonafideOkayByLEVEL1
} from "./CWFActions";

export const actionMapping = {
    approveCasesByLEVEL3: (data) => approveCasesByLEVEL3(data),
    bonafideOkayByLEVEL1: (action, data, caseNo) => bonafideOkayByLEVEL1(action, data, caseNo)
}
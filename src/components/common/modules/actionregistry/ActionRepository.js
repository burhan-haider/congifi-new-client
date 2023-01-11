// import CWFApproveCase from "./components/CWFApproveCase";
// import CWFRejectCase from "./components/CWFRejectCase";
// import CWFBonafideCase from "./components/CWFBonafideCase";
// import CWFParkCase from "./components/CWFParkCase";
// import CWFAllocateCase from "./components/CWFAllocateCase";
import CWFViewEvidence from "./components/CWFViewEvidence";
import CWFViewComments from "./components/CWFViewComments";
//import CWFInitiateCommunication from "./components/CWFInitiateCommunication";
import CWFFileCase from "./components/CWFFileCase";
import CWFActionComments from "./components/CWFActionComments";

const actionRepository = {
  // LEVEL 1

  defaultAction: CWFActionComments,

  approveCasesByLEVEL1: CWFActionComments,
  rejectCaseSByLEVEL1: CWFActionComments,
  bonafideOkayByLEVEL1: CWFActionComments,
  parkCasesByLEVEL1: CWFActionComments,
  reAllocateCasesByLEVEL1: CWFActionComments,

  approveParkedCasesByLEVEL1: CWFActionComments,
  rejectParkedCasesByLEVEL1: CWFActionComments,
  bonafideOkayParkedCasesByLEVEL1: CWFActionComments,
  reAllocateParkedCasesByLEVEL1: CWFActionComments,

  //reAllocateParkedCasesByLEVEL7: CWFActionComments,

  viewEvidenceLEVEL1: CWFViewEvidence,
  viewCommentsLEVEL1: CWFViewComments,

  //LEVEL 2
  initiateCommunicationByLEVEL2: CWFActionComments,
  approveCasesByLEVEL2: CWFActionComments,
  rejectCaseSByLEVEL2: CWFActionComments,

  viewEvidenceLEVEL2: CWFViewEvidence,
  viewCommentsLEVEL2: CWFViewComments,

  //LEVEL 3
  approveCasesByLEVEL3: CWFActionComments,
  rejectCaseSByLEVEL3: CWFActionComments,
  fileCasesByLEVEL3: CWFActionComments,

  viewCommentsLEVEL3: CWFViewComments,
  viewEvidenceLEVEL3: CWFViewEvidence
};

export default actionRepository;

import httpService from "services/httpservice/httpService";

export const downloadExcel = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for downloadExcel action button");
    }

}

export const uploadFeedBack = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for uploadFeedback action button");
    }

}

export const allocateCases = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for allocateCases action button");
    }

}

export const approveCasesByAMLO = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for approveCasesByAMLO action button");
    }

}

export const bonafideOkay = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for bonafideOkay action button");
    }

}

export const approveCasesByAMLO1 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for approveCasesByAMLO1 action button");
    }

}

export const approveCasesByAMLO3 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for approveCasesByAMLO3 action button");
    }

}

export const viewCommentsLEVEL2 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for viewCommentsLEVEL2 action button");
    }

}

export const initiateCommunicationByLEVEL2 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for initiateCommunicationByLEVEL2 action button");
    }

}

export const parkCasesByLEVEL2 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for parkCasesByLEVEL2 action button");
    }

}

export const viewEvidenceLEVEL2 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for viewEvidenceLEVEL2 action button");
    }

}

export const fileCasesByLEVEL3 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for fileCasesByLEVEL3 action button");
    }

}

export const rejectCaseSByLEVEL3 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for rejectCaseSByLEVEL3 action button");
    }

}

export const approveCasesByLEVEL3 = (action) =>{

    return new Promise((resolve, reject)=>{
        if(action.actionCode === "approveCasesByLEVEL3"){
            resolve(action)
        }
        else{
            reject(action)
        }
    })

}

export const viewCommentsLEVEL3 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for viewCommentsLEVEL3 action button");
    }

}

export const viewEvidenceLEVEL3 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for viewEvidenceLEVEL3 action button");
    }

}

export const rejectCase = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for rejectCase action button");
    }

}

export const approveCasesByLEVEL2 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for approveCasesByLEVEL2 action button");
    }

}

export const searchParkedCasesLEVEL3 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for searchParkedCasesLEVEL3 action button");
    }

}

export const approveCasesByLEVEL1 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for approveCasesByLEVEL1 action button");
    }

}

export const searchParkedCasesLEVEL2 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for searchParkedCasesLEVEL2 action button");
    }

}

export const approveParkedCasesByLEVEL1 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for approveParkedCasesByLEVEL1 action button");
    }

}

export const rejectParkedCasesByLEVEL1 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for rejectParkedCasesByLEVEL1 action button");
    }

}

export const bonafideOkayParkedCasesByLEVEL1 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for bonafideOkayParkedCasesByLEVEL1 action button");
    }

}

export const rejectCaseSByLEVEL1 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for rejectCaseSByLEVEL1 action button");
    }

}

export const bonafideOkayByLEVEL1 = (action, data, caseNo) =>{

    return new Promise((resolve, reject)=>{
        httpService
        .post(
          "/api/caseworkflow/saveCWFCaseAndCommentsDetails",
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "cognifi_token"
              )}`
            }
          },
          { params: {
            caseNo: caseNo,
            ActionCode: action.actionCode,
            comments: data.comments,
            subAction: data.subAction,
          } }
        )
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.data.err);
          }
        });
    })

}

export const searchPendingCasesLEVEL3 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for searchPendingCasesLEVEL3 action button");
    }

}

export const parkCasesByLEVEL1 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for parkCasesByLEVEL1 action button");
    }

}

export const reAllocateCasesByLEVEL1 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for reAllocateCasesByLEVEL1 action button");
    }

}

export const viewCommentsLEVEL1 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for viewCommentsLEVEL1 action button");
    }

}

export const viewEvidenceLEVEL1 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for viewEvidenceLEVEL1 action button");
    }

}

export const searchPendingCasesLEVEL2 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for searchPendingCasesLEVEL2 action button");
    }

}

export const searchPendingCasesLEVEL1 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for searchPendingCasesLEVEL1 action button");
    }

}

export const searchParkedCasesLEVEL1 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for searchParkedCasesLEVEL1 action button");
    }

}

export const search = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for search action button");
    }

}

export const searchAccountsMaster = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for searchAccountsMaster action button");
    }

}

export const select = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for select action button");
    }

}

export const emailExchange = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for emailExchange action button");
    }

}

export const uploadFile = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for uploadFile action button");
    }

}

export const searchWorkflowMaster = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for searchWorkflowMaster action button");
    }

}

export const searchCurrencyMaster = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for searchCurrencyMaster action button");
    }

}

export const allocateCasesLEVEL3 = (moduleCode) =>{

    if(moduleCode === 'pendingCases'){
        console.log("In pending Cases Module for allocateCasesLEVEL3 action button");
    }

}


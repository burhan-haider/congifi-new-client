import httpService from "services/httpservice/httpService";
import { setCWFFileResponse } from "redux/caseWorkflow/cwfbottomframedata/cwfbottomframedata.actions";
import { store } from 'redux/store'

const reduxStore = store.getState();



export const escalateCasesByBranchManager1 = (action, data, caseNo, userActionType) =>{
    return new Promise((resolve, reject)=>{
        const caseStatus = {
            Post: '1',
            PostAndClose: '2' 
        }
        const reassignTo={
            Post: 'BRANCHMANAGER1',
            PostAndClose: 'LEVEL2'
        }
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
            userActionType: userActionType||"defaultAction",
            reassignToUserCode: reassignTo[userActionType],
            caseStatus: caseStatus[userActionType],

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

export const referToBranchManager1ByLevel2 = (action, data, caseNo, userActionType) =>{
    return new Promise((resolve, reject)=>{
        const caseStatus = {
            Legal: '7',
            CRIB: '8',
            SKIP: '9'
        }
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
            userActionType: userActionType||"defaultAction",
            caseStatus: caseStatus[data.referTo], 
            reassignToUserCode: data.reassignTo,
            observation: data.observation
           // reassignToUserCode: 'BRANCHMANAGER1',
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

export const approveCaseByLEVEL1 = (action, data, caseNo, userActionType) =>{
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
            userActionType: userActionType||"defaultAction",
            caseStatus: '13',
            reassignToUserCode: 'LEVEL3'
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

export const rejectCaseByLEVEL1 = (action, data, caseNo, userActionType) =>{
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
            userActionType: userActionType||"defaultAction",
            caseStatus: '14',
            reassignToUserCode: 'BRANCHMANAGER1'
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


export const getCWFCaseAndCommentsDetails = (action, caseNo, userActionType) =>{
    return new Promise((resolve, reject)=>{
        httpService
        .post(
          "/api/caseworkflow/getCWFCommentsDetails",
          {
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                "cognifi_token"
              )}`
            }
          },
          { params: {
            caseNo: caseNo,
            actionCode: action.actionCode
            
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

export const getFileUploadConfig = (action, caseNo, userActionType) =>{
  return new Promise((resolve, reject)=>{
      httpService
      .post(
        "/api/fileOperation/fileConfig",
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "cognifi_token"
            )}`
          }
        },
        { params: {
          // caseNo: caseNo,
          // actionCode: action.actionCode
          moduleRefId: 'excelFileUpload',
          moduleUnqNo: caseNo
          
      } }
      )
      .then(response => {
        if (response.status === 200) {
          store.dispatch(setCWFFileResponse(response.data))
          resolve(response.data);
        } else {
          reject(response.data.err);
        }
      });
  })
}

export const fileUploadConfig = (filesContent,caseNo) =>{

  console.log("File Response Data:-", store.getState().caseWorkflow.cwfBottomFrameData.fileResponse)
  console.log("Form Data For File",filesContent)
  filesContent.append("uploadRefId","excelFileUpload")
  filesContent.append("unqId", store.getState().caseWorkflow.cwfBottomFrameData.fileResponse.UNQID)
  filesContent.append("seqNo",0)
  filesContent.append("moduleUnqNo",caseNo)
  filesContent.append("isExcel",store.getState().caseWorkflow.cwfBottomFrameData.fileResponse.ISEXCEL)
  
  return new Promise((resolve, reject)=>{
      httpService
      .post(
        "/api/fileOperation/genericFileUpload", 
        filesContent, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${window.localStorage.getItem(
              "cognifi_token"
            )}`
          }
        },
      )
      .then(response => {
        if (response.status === 200) {

           if(store.getState().caseWorkflow.cwfBottomFrameData.fileResponse.ISEXCEL === 'N' && store.getState().caseWorkflow.cwfBottomFrameData.fileResponse.READFLAG === 'Y'){
             console.log("I am where I am supposed to be .....................")
             genericFileProcess(caseNo)
           }
           //else{
          //   excelFileProcess()
          // }

          resolve(response.data);
        } else {
          reject(response.data.err);
        }
      });
  })
}

const genericFileProcess = (caseNo) => {

  return new Promise((resolve, reject)=>{
    httpService
    .post(
      "/api/fileOperation/genericFileProcess",
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem(
            "cognifi_token"
          )}`
        }
      },
      { params: {
        uploadRefNo: store.getState().caseWorkflow.cwfBottomFrameData.fileResponse.UNQID,
        moduleRefId: 'genericFileUpload'
        
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

// const excelFileProcess = (caseNo) => {

//   return new Promise((resolve, reject)=>{
//     httpService
//     .post(
//       "/api/fileOperation/genericFileProcess",
//       {
//         headers: {
//           Authorization: `Bearer ${window.localStorage.getItem(
//             "cognifi_token"
//           )}`
//         }
//       },
//       { params: {
//         uploadRefNo: store.getState().caseWorkflow.cwfBottomFrameData.fileResponse.UNQID,
//         moduleRefId: 'excelFileUpload'
        
//     } }
//     )
//     .then(response => {
//       if (response.status === 200) {
//         resolve(response.data);
//       } else {
//         reject(response.data.err);
//       }
//     });
// })


// }

export const closeCaseByLevel3 = (action, data, caseNo, userActionType) =>{
  return new Promise((resolve, reject)=>{
      // const caseStatus = {
      //     Post: '1',
      //     PostAndClose: '2' 
      // }
      // const reassignTo={
      //     Post: 'BRANCHMANAGER1',
      //     PostAndClose: 'LEVEL2'
      // }
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
          userActionType: userActionType||"defaultAction",
          reassignToUserCode: 'LEVEL3',
          caseStatus: '100',

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
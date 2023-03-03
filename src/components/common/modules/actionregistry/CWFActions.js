import httpService from "services/httpservice/httpService";
import { setCWFFileResponse } from "redux/caseWorkflow/cwfbottomframedata/cwfbottomframedata.actions";
import { store } from 'redux/store'

const reduxStore = store.getState();


/* ----------- Taha's escalateCasesByBranchManager1 ----------- */
// export const escalateCasesByBranchManager1 = (action, data, caseNo, userActionType) =>{
//     return new Promise((resolve, reject)=>{
//         httpService
//         .post(
//           "/api/caseworkflow/saveCWFCaseAndCommentsDetails",
//           {
//             headers: {
//               Authorization: `Bearer ${window.localStorage.getItem(
//                 "cognifi_token"
//               )}`
//             }
//           },
//           { params: {
//             caseNo: caseNo,
//             ActionCode: action.actionCode,
//             comments: data.comments,
//             userActionType: userActionType||"defaultAction",
//             reassignToUserCode: 'LEVEL2',
//             caseStatus: '2',
//           } }
//         )
//         .then(response => {
//           if (response.status === 200) {
//             resolve(response.data);
//           } else {
//             reject(response.data.err);
//           }
//         });
//     })
// }

export const escalateCaseByLEVEL2 = (action, data, caseNo, userActionType) =>{
  return new Promise((resolve, reject)=>{
      const caseStatus = {
          Post: '27',
          PostAndClose: '51' 
      }

      const promiseStatus = {
        INIT: '27',
        RSLVD: '28',
        STAB: '29',
        PARTP: '30', 
        
    }
      
      const reassignTo={
          Post: 'LEVEL2',
          PostAndClose: 'BRANCHMANAGER1'
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
            caseStatus: promiseStatus[data.status],
          //  promiseStatus: promiseStatus[data.status],
            observation: data.status
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


export const escalateCasesByBranchManager1 = (action, data, caseNo, userActionType) =>{
    return new Promise((resolve, reject)=>{
        const caseStatus = {
            Post: '27',
            PostAndClose: '2' 
        }
        const reassignTo={
            Post: 'LEVEL1',
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
    
export const approveCaseByLEVEL1 = (action, data, caseNo, userActionType) =>{
  return new Promise((resolve, reject)=>{
    const caseStatus = {
      Post: '27',
      PostAndClose: '13' ,
      Legal: '7',
      CRIB: '8',
      SKIP: '9'
    }
    const reassignTo={
      Post: 'LEVEL1',
      PostAndClose: 'LEVEL3'
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
        caseStatus: caseStatus[userActionType],
        reassignToUserCode: reassignTo[userActionType]
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
        Post: '27',      
        Legal: '7',
        CRIB: '8',
        SKIP: '9'
    }

    const reassignTo={
      Post: 'LEVEL2',
      PostAndClose: 'LEVEL1'
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
        caseStatus: caseStatus[userActionType] || caseStatus[data.referTo], 
        reassignToUserCode: reassignTo[userActionType],
        observation: data.observation
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
  console.log("Form Data:-", data)
    return new Promise((resolve, reject)=>{
      const caseStatus = {
        Post: '27',
        PostAndClose: '14' 
      }

      const reassignTo={
        Post: 'LEVEL1',
        PostAndClose: 'LEVEL3'
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
            caseStatus: '14',
            reassignToUserCode: 'LEVEL2'
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

/* ----------- Prerna's approveCaseByLevel1 ----------- */

// export const approveCaseByLEVEL1 = (action, data, caseNo, userActionType) =>{
//     return new Promise((resolve, reject)=>{
//         httpService
//         .post(
//           "/api/caseworkflow/saveCWFCaseAndCommentsDetails",
//           {
//             headers: {
//               Authorization: `Bearer ${window.localStorage.getItem(
//                 "cognifi_token"
//               )}`
//             }
//           },
//           { params: {
//             caseNo: caseNo,
//             ActionCode: action.actionCode,
//             comments: data.comments,
//             userActionType: userActionType||"defaultAction",
//             caseStatus: '13',
//             reassignToUserCode: 'LEVEL3'
//           } }
//         )
//         .then(response => {
//           if (response.status === 200) {
//             resolve(response.data);
//           } else {
//             reject(response.data.err);
//           }
//         });
//     })
// }


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

export const uploadPromise = (action, data, caseNo, userActionType) =>{
  console.log("User Action Type In Upload Promise:-", userActionType)
  console.log("Form Data:-", data)
  return new Promise((resolve, reject)=>{
      const caseStatus = {
          INIT: '27',
          RSLVD: '28',
          STAB: '29',
          PARTP: '30', 
          
      }
      // const actionType = {
      //   Post: 'LEVEL2',
      //   PostAndClose: 'BRANCHMANAGER1'
      // }
      
     const reassignTo = {
      Post: 'LEVEL2',
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
        //  caseStatus: caseStatus[data.uploadPromise] || "27",
         caseStatus: userActionType === 'Post' ? '27' : '50',
        // caseStatus: userActionType === 'POST' ? '1' : caseStatus[data.uploadPromise] || '1',
        //  reassignToUserCode:actionType[userActionType],
        reassignToUserCode: reassignTo[userActionType],
          fromDate: data.promiseFromDate,
          toDate: data.promiseToDate
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

  export const parkedCasesByLEVEL1 = (action, data, caseNo, userActionType) =>{
    return new Promise((resolve, reject)=>{
      const caseStatus = {
        Post: '27',
        PostAndClose: '41' 
      }
      const reassignTo={
        Post: 'LEVEL1',
        PostAndClose: 'LEVEL1'
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
          userActionType:  userActionType||"defaultAction",
          caseStatus:  userActionType === 'Post' ? '27' : '41',
          reassignToUserCode: reassignTo[userActionType]
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

export const closeCasesBYLEVEL1 = (action, data, caseNo, userActionType) =>{
    return new Promise((resolve, reject)=>{
      // const caseStatus = {
      //   Post: '27',
      //   PostAndClose: '100' 
      // }

      // const reassignTo={
      //   Post: 'BRANCHMANAGER1',
      //   PostAndClose: 'BRANCHMANAGER1'
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
            caseStatus:userActionType === 'Post' ? '27' : '100',
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
